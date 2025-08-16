const LOG_CONTEXT_SEPARATOR = ' :: ';

/**
 * Gets a sanitized value for safe processing
 * @param {any} value The value to sanitize
 * @returns {any} Sanitized value
 */
const getSanitizedValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  return value;
};

/**
 * Checks if a value is a function
 * @param {any} value The value to check
 * @returns {boolean} True if value is a function
 */
const isFunction = (value) => typeof value === 'function';

/**
 * Deep clone utility using JSON methods
 * @param {any} obj Object to clone
 * @returns {any} Cloned object
 */
const clone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Deep merge two objects
 * @param {object} target Target object
 * @param {object} source Source object
 * @returns {object} Merged object
 */
const mergeDeepRight = (target, source) => {
  const result = clone(target);
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = mergeDeepRight(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
};

export {
  LOG_CONTEXT_SEPARATOR,
  getSanitizedValue,
  isFunction,
  clone,
  mergeDeepRight,
};
