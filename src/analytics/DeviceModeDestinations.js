import { isDestinationSDKMounted, initializeDestination } from './utils.js';
import { DEVICE_MODE_DESTINATIONS_PLUGIN, SCRIPT_LOAD_TIMEOUT_MS } from './constants.js';
import { DESTINATION_NOT_SUPPORTED_ERROR, DESTINATION_SDK_LOAD_ERROR } from './logMessages.js';
import {
  destDisplayNamesToFileNamesMap,
  filterDestinations,
} from './deviceModeDestinations.js';

const pluginName = 'DeviceModeDestinations';

const DeviceModeDestinations = () => ({
  name: pluginName,
  initialize: (state) => {
    state.plugins.loadedPlugins.value = [...state.plugins.loadedPlugins.value, pluginName];
  },
  nativeDestinations: {
    setActiveDestinations(state, pluginsManager, errorHandler, logger) {
      state.nativeDestinations.loadIntegration.value = state.loadOptions.value
        .loadIntegration;

      // Filter destination that doesn't have mapping config->Integration names
      const configSupportedDestinations =
        state.nativeDestinations.configuredDestinations.value.filter((configDest) => {
          if (destDisplayNamesToFileNamesMap[configDest.displayName]) {
            return true;
          }

          errorHandler?.onError(
            new Error(DESTINATION_NOT_SUPPORTED_ERROR(configDest.userFriendlyId)),
            DEVICE_MODE_DESTINATIONS_PLUGIN,
          );
          return false;
        });

      // Filter destinations that are disabled through load or consent API options
      const destinationsToLoad = filterDestinations(
        state.consents.postConsent.value?.integrations ??
          state.nativeDestinations.loadOnlyIntegrations.value,
        configSupportedDestinations,
      );

      const consentedDestinations = destinationsToLoad.filter(
        dest =>
          // if consent manager is not configured, then default to load the destination
          pluginsManager.invokeSingle(
            `consentManager.isDestinationConsented`,
            state,
            dest.config,
            errorHandler,
            logger,
          ) ?? true,
      );

      state.nativeDestinations.activeDestinations.value = consentedDestinations;
    },

    load(state, externalSrcLoader, errorHandler, logger, externalScriptOnLoad) {
      const integrationsCDNPath = state.lifecycle.integrationsCDNPath.value;
      const activeDestinations = state.nativeDestinations.activeDestinations.value;

      activeDestinations.forEach((dest) => {
        const sdkName = destDisplayNamesToFileNamesMap[dest.displayName];
        const destSDKIdentifier = `${sdkName}_RS`; // this is the name of the object loaded on the window

        const sdkTypeName = sdkName;
        if (sdkTypeName && !isDestinationSDKMounted(destSDKIdentifier, sdkTypeName, logger)) {
          const destSdkURL = `${integrationsCDNPath}/${sdkName}.min.js`;
          externalSrcLoader.loadJSFile({
            url: destSdkURL,
            id: dest.userFriendlyId,
            callback:
              externalScriptOnLoad ??
              ((id) => {
                if (!id) {
                  logger?.error(
                    DESTINATION_SDK_LOAD_ERROR(
                      DEVICE_MODE_DESTINATIONS_PLUGIN,
                      dest.userFriendlyId,
                    ),
                  );
                  state.nativeDestinations.failedDestinations.value = [
                    ...state.nativeDestinations.failedDestinations.value,
                    dest,
                  ];
                } else {
                  initializeDestination(
                    dest,
                    state,
                    destSDKIdentifier,
                    sdkTypeName,
                    errorHandler,
                    logger,
                  );
                }
              }),
            timeout: SCRIPT_LOAD_TIMEOUT_MS,
          });
        } else if (sdkTypeName) {
          initializeDestination(dest, state, destSDKIdentifier, sdkTypeName, errorHandler, logger);
        } else {
          logger?.error(
            DESTINATION_SDK_LOAD_ERROR(DEVICE_MODE_DESTINATIONS_PLUGIN, dest.displayName),
          );
        }
      });
    },
  },
});

export { DeviceModeDestinations };
export default DeviceModeDestinations;
