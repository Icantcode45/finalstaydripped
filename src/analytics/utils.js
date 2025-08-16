import { getSanitizedValue, isFunction, clone, mergeDeepRight } from './common.js';
import {
  DEVICE_MODE_DESTINATIONS_PLUGIN,
  READY_CHECK_INTERVAL_MS,
  READY_CHECK_TIMEOUT_MS,
} from './constants.js';
import {
  DESTINATION_INIT_ERROR,
  DESTINATION_INTEGRATIONS_DATA_ERROR,
  DESTINATION_READY_TIMEOUT_ERROR,
} from './logMessages.js';
import {
  aliasArgumentsToCallOptions,
  groupArgumentsToCallOptions,
  identifyArgumentsToCallOptions,
  isHybridModeDestination,
  pageArgumentsToCallOptions,
  trackArgumentsToCallOptions,
} from './deviceModeDestinations.js';

/**
 * Determines if the destination SDK code is evaluated
 * @param {string} destSDKIdentifier The name of the global object that contains the destination SDK
 * @param {string} sdkTypeName The name of the destination SDK type
 * @param {object} logger Logger instance
 * @returns {boolean} true if the destination SDK code is evaluated, false otherwise
 */
const isDestinationSDKMounted = (destSDKIdentifier, sdkTypeName, logger) => {
  return Boolean(
    window[destSDKIdentifier]?.[sdkTypeName]?.prototype &&
      typeof window[destSDKIdentifier][sdkTypeName].prototype.constructor !== 'undefined',
  );
};

const wait = (time) =>
  new Promise(resolve => {
    window.setTimeout(resolve, time);
  });

const createDestinationInstance = (destSDKIdentifier, sdkTypeName, dest, state) => {
  const rAnalytics = window.rudderanalytics;
  const analytics = rAnalytics?.getAnalyticsInstance(state.lifecycle.writeKey.value);

  const analyticsInstance = {
    loadIntegration: state.nativeDestinations.loadIntegration.value,
    logLevel: state.lifecycle.logLevel.value,
    loadOnlyIntegrations:
      state.consents.postConsent.value?.integrations ??
      state.nativeDestinations.loadOnlyIntegrations.value,
    page: (category, name, properties, options, callback) =>
      analytics?.page(
        pageArgumentsToCallOptions(
          getSanitizedValue(category),
          getSanitizedValue(name),
          getSanitizedValue(properties),
          getSanitizedValue(options),
          getSanitizedValue(callback),
        ),
      ),
    track: (event, properties, options, callback) =>
      analytics?.track(
        trackArgumentsToCallOptions(
          getSanitizedValue(event),
          getSanitizedValue(properties),
          getSanitizedValue(options),
          getSanitizedValue(callback),
        ),
      ),
    identify: (userId, traits, options, callback) =>
      analytics?.identify(
        identifyArgumentsToCallOptions(
          getSanitizedValue(userId),
          getSanitizedValue(traits),
          getSanitizedValue(options),
          getSanitizedValue(callback),
        ),
      ),
    alias: (to, from, options, callback) =>
      analytics?.alias(
        aliasArgumentsToCallOptions(
          getSanitizedValue(to),
          getSanitizedValue(from),
          getSanitizedValue(options),
          getSanitizedValue(callback),
        ),
      ),
    group: (groupId, traits, options, callback) =>
      analytics?.group(
        groupArgumentsToCallOptions(
          getSanitizedValue(groupId),
          getSanitizedValue(traits),
          getSanitizedValue(options),
          getSanitizedValue(callback),
        ),
      ),
    getAnonymousId: (options) => analytics?.getAnonymousId(getSanitizedValue(options)),
    getUserId: () => analytics?.getUserId(),
    getUserTraits: () => analytics?.getUserTraits(),
    getGroupId: () => analytics?.getGroupId(),
    getGroupTraits: () => analytics?.getGroupTraits(),
    getSessionId: () => analytics?.getSessionId(),
  };

  const deviceModeDestination = new window[destSDKIdentifier][sdkTypeName](
    clone(dest.config),
    analyticsInstance,
    {
      shouldApplyDeviceModeTransformation: dest.shouldApplyDeviceModeTransformation,
      propagateEventsUntransformedOnError: dest.propagateEventsUntransformedOnError,
      destinationId: dest.id,
    }
  );

  return deviceModeDestination;
};

const isDestinationReady = (dest, time = 0) =>
  new Promise((resolve, reject) => {
    const instance = dest.instance;
    if (instance.isLoaded() && (!instance.isReady || instance.isReady())) {
      resolve(true);
    } else if (time >= READY_CHECK_TIMEOUT_MS) {
      reject(
        new Error(DESTINATION_READY_TIMEOUT_ERROR(READY_CHECK_TIMEOUT_MS, dest.userFriendlyId)),
      );
    } else {
      const curTime = Date.now();
      wait(READY_CHECK_INTERVAL_MS)
        .then(() => {
          const elapsedTime = Date.now() - curTime;
          isDestinationReady(dest, time + elapsedTime)
            .then(resolve)
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    }
  });

/**
 * Extracts the integration config, if any, from the given destination
 * and merges it with the current integrations config
 * @param {object} dest Destination object
 * @param {object} curDestIntgConfig Current destinations integration config
 * @param {object} errorHandler Error handler object
 * @returns {object} Combined destinations integrations config
 */
const getCumulativeIntegrationsConfig = (dest, curDestIntgConfig, errorHandler) => {
  let integrationsConfig = curDestIntgConfig;
  if (isFunction(dest.instance?.getDataForIntegrationsObject)) {
    try {
      integrationsConfig = mergeDeepRight(
        curDestIntgConfig,
        getSanitizedValue(dest.instance?.getDataForIntegrationsObject()),
      );
    } catch (err) {
      errorHandler?.onError(
        err,
        DEVICE_MODE_DESTINATIONS_PLUGIN,
        DESTINATION_INTEGRATIONS_DATA_ERROR(dest.userFriendlyId),
      );
    }
  }
  return integrationsConfig;
};

const initializeDestination = (
  dest,
  state,
  destSDKIdentifier,
  sdkTypeName,
  errorHandler,
  logger,
) => {
  try {
    const initializedDestination = clone(dest);
    const destInstance = createDestinationInstance(destSDKIdentifier, sdkTypeName, dest, state);
    initializedDestination.instance = destInstance;

    destInstance.init();

    isDestinationReady(initializedDestination)
      .then(() => {
        // Collect the integrations data for the hybrid mode destinations
        if (isHybridModeDestination(initializedDestination)) {
          state.nativeDestinations.integrationsConfig.value = getCumulativeIntegrationsConfig(
            initializedDestination,
            state.nativeDestinations.integrationsConfig.value,
            errorHandler,
          );
        }

        state.nativeDestinations.initializedDestinations.value = [
          ...state.nativeDestinations.initializedDestinations.value,
          initializedDestination,
        ];
      })
      .catch(err => {
        state.nativeDestinations.failedDestinations.value = [
          ...state.nativeDestinations.failedDestinations.value,
          dest,
        ];

        // The error message is already formatted in the isDestinationReady function
        logger?.error(err);
      });
  } catch (err) {
    state.nativeDestinations.failedDestinations.value = [
      ...state.nativeDestinations.failedDestinations.value,
      dest,
    ];

    errorHandler?.onError(
      err,
      DEVICE_MODE_DESTINATIONS_PLUGIN,
      DESTINATION_INIT_ERROR(dest.userFriendlyId),
    );
  }
};

export {
  isDestinationSDKMounted,
  wait,
  createDestinationInstance,
  isDestinationReady,
  getCumulativeIntegrationsConfig,
  initializeDestination,
};
