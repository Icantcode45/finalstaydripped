import { getSanitizedValue } from './common.js';

/**
 * Destination display names to file names mapping
 */
const destDisplayNamesToFileNamesMap = {
  'Google Analytics': 'GA',
  'Facebook Pixel': 'FacebookPixel',
  'Google Tag Manager': 'GTM',
  'Hotjar': 'Hotjar',
  'Intercom': 'Intercom',
  'Mixpanel': 'Mixpanel',
  'Amplitude': 'Amplitude',
  'Segment': 'Segment',
};

/**
 * Filter destinations based on load options
 * @param {object} loadIntegrations Integration load options
 * @param {Array} configuredDestinations Array of configured destinations
 * @returns {Array} Filtered destinations
 */
const filterDestinations = (loadIntegrations, configuredDestinations) => {
  if (!loadIntegrations) {
    return configuredDestinations;
  }

  // If loadIntegrations is an object with specific integrations
  if (typeof loadIntegrations === 'object') {
    return configuredDestinations.filter(dest => {
      const integrationName = dest.displayName || dest.userFriendlyId;
      return loadIntegrations[integrationName] !== false;
    });
  }

  // If loadIntegrations is a boolean
  return loadIntegrations ? configuredDestinations : [];
};

/**
 * Check if destination is hybrid mode
 * @param {object} destination Destination object
 * @returns {boolean} True if hybrid mode
 */
const isHybridModeDestination = (destination) => {
  return destination.config?.hybridMode === true;
};

/**
 * Convert page arguments to call options
 * @param {string|object} category Page category
 * @param {string|object} name Page name
 * @param {object} properties Page properties
 * @param {object} options Page options
 * @param {function} callback Callback function
 * @returns {object} Call options object
 */
const pageArgumentsToCallOptions = (category, name, properties, options, callback) => {
  let finalCategory = null;
  let finalName = null;
  let finalProperties = {};
  let finalOptions = {};
  let finalCallback = null;

  // Handle different argument patterns
  if (typeof category === 'string') {
    finalCategory = category;
    if (typeof name === 'string') {
      finalName = name;
      if (typeof properties === 'object') finalProperties = properties || {};
      if (typeof options === 'object') finalOptions = options || {};
      if (typeof callback === 'function') finalCallback = callback;
    } else if (typeof name === 'object') {
      finalProperties = name || {};
      if (typeof properties === 'object') finalOptions = properties || {};
      if (typeof options === 'function') finalCallback = options;
    } else if (typeof name === 'function') {
      finalCallback = name;
    }
  } else if (typeof category === 'object') {
    finalProperties = category || {};
    if (typeof name === 'object') finalOptions = name || {};
    if (typeof properties === 'function') finalCallback = properties;
  } else if (typeof category === 'function') {
    finalCallback = category;
  }

  return {
    category: finalCategory,
    name: finalName,
    properties: finalProperties,
    options: finalOptions,
    callback: finalCallback,
  };
};

/**
 * Convert track arguments to call options
 * @param {string} event Event name
 * @param {object} properties Event properties
 * @param {object} options Event options
 * @param {function} callback Callback function
 * @returns {object} Call options object
 */
const trackArgumentsToCallOptions = (event, properties, options, callback) => {
  return {
    event: getSanitizedValue(event),
    properties: getSanitizedValue(properties) || {},
    options: getSanitizedValue(options) || {},
    callback: getSanitizedValue(callback),
  };
};

/**
 * Convert identify arguments to call options
 * @param {string|number|object} userId User ID or traits
 * @param {object} traits User traits
 * @param {object} options Identify options
 * @param {function} callback Callback function
 * @returns {object} Call options object
 */
const identifyArgumentsToCallOptions = (userId, traits, options, callback) => {
  let finalUserId = null;
  let finalTraits = {};
  let finalOptions = {};
  let finalCallback = null;

  // Handle different argument patterns
  if (typeof userId === 'string' || typeof userId === 'number') {
    finalUserId = userId;
    if (typeof traits === 'object') finalTraits = traits || {};
    if (typeof options === 'object') finalOptions = options || {};
    if (typeof callback === 'function') finalCallback = callback;
  } else if (typeof userId === 'object') {
    finalTraits = userId || {};
    if (typeof traits === 'object') finalOptions = traits || {};
    if (typeof options === 'function') finalCallback = options;
  }

  return {
    userId: finalUserId,
    traits: finalTraits,
    options: finalOptions,
    callback: finalCallback,
  };
};

/**
 * Convert alias arguments to call options
 * @param {string} to New user ID
 * @param {string|object} from Previous user ID or options
 * @param {object} options Alias options
 * @param {function} callback Callback function
 * @returns {object} Call options object
 */
const aliasArgumentsToCallOptions = (to, from, options, callback) => {
  let finalFrom = null;
  let finalOptions = {};
  let finalCallback = null;

  if (typeof from === 'string') {
    finalFrom = from;
    if (typeof options === 'object') finalOptions = options || {};
    if (typeof callback === 'function') finalCallback = callback;
  } else if (typeof from === 'object') {
    finalOptions = from || {};
    if (typeof options === 'function') finalCallback = options;
  } else if (typeof from === 'function') {
    finalCallback = from;
  }

  return {
    to: getSanitizedValue(to),
    from: finalFrom,
    options: finalOptions,
    callback: finalCallback,
  };
};

/**
 * Convert group arguments to call options
 * @param {string|number|object} groupId Group ID or traits
 * @param {object} traits Group traits
 * @param {object} options Group options
 * @param {function} callback Callback function
 * @returns {object} Call options object
 */
const groupArgumentsToCallOptions = (groupId, traits, options, callback) => {
  let finalGroupId = null;
  let finalTraits = {};
  let finalOptions = {};
  let finalCallback = null;

  if (typeof groupId === 'string' || typeof groupId === 'number') {
    finalGroupId = groupId;
    if (typeof traits === 'object') finalTraits = traits || {};
    if (typeof options === 'object') finalOptions = options || {};
    if (typeof callback === 'function') finalCallback = callback;
  } else if (typeof groupId === 'object') {
    finalTraits = groupId || {};
    if (typeof traits === 'object') finalOptions = traits || {};
    if (typeof options === 'function') finalCallback = options;
  }

  return {
    groupId: finalGroupId,
    traits: finalTraits,
    options: finalOptions,
    callback: finalCallback,
  };
};

export {
  destDisplayNamesToFileNamesMap,
  filterDestinations,
  isHybridModeDestination,
  pageArgumentsToCallOptions,
  trackArgumentsToCallOptions,
  identifyArgumentsToCallOptions,
  aliasArgumentsToCallOptions,
  groupArgumentsToCallOptions,
};
