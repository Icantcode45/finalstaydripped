/* ========= StayDripped Utils (browser ES module) ========= */
/* onPageLeave (JS version of your TS) */
function onPageLeave(callback) {
  let pageLeft = false;
  let isAccessible = false;

  function handleOnLeave() {
    if (pageLeft) return;
    pageLeft = true;
    callback(isAccessible);
    setTimeout(() => { pageLeft = false; }, 0);
  }

  // unload / nav away
  window.addEventListener('beforeunload', () => {
    isAccessible = false;
    handleOnLeave();
  });

  // user leaves the window but page may still be accessible
  window.addEventListener('blur', () => {
    isAccessible = true;
    handleOnLeave();
  });

  // focus resets guard
  window.addEventListener('focus', () => {
    pageLeft = false;
  });

  // pagehide covers tab close + bfcache
  document.addEventListener('pagehide', () => {
    isAccessible = document.visibilityState === 'hidden';
    handleOnLeave();
  });

  // visibility change (tab switch / minimize)
  document.addEventListener('visibilitychange', () => {
    isAccessible = true;
    if (document.visibilityState === 'hidden') {
      handleOnLeave();
    } else {
      pageLeft = false;
    }
  });
}

/* ---------- string utils ---------- */
const trim = (value) => value.replace(/^\s+|\s+$/gm, '');
const removeDoubleSpaces = (value) => value.replace(/ {2,}/g, ' ');
const removeLeadingPeriod = (value) => value.replace(/^\.+/, '');

const isString = (v) => typeof v === 'string';
const isNullOrUndefined = (v) => v === null || typeof v === 'undefined';

const tryStringify = (val) => {
  let retVal = val;
  if (!isString(val) && !isNullOrUndefined(val)) {
    try { retVal = JSON.stringify(val); } catch { retVal = null; }
  }
  return retVal;
};

/* base64 helpers (unicode‑safe) */
const base64ToBytes = (base64Str) => {
  const binString = window.atob(base64Str);
  const bytes = binString.split('').map(c => c.charCodeAt(0));
  return new Uint8Array(bytes);
};
const bytesToBase64 = (bytes) => {
  const binString = Array.from(bytes, x => String.fromCodePoint(x)).join('');
  return window.btoa(binString);
};
const toBase64 = (value) => bytesToBase64(new TextEncoder().encode(value));
const fromBase64 = (value) => new TextDecoder().decode(base64ToBytes(value));

/* ---------- time utils ---------- */
const getFormattedTimestamp = (date) => date.toISOString();
const getCurrentTimeFormatted = () => getFormattedTimestamp(new Date());

/* ---------- url utils ---------- */
const removeDuplicateSlashes = (str) => str.replace(/\/{2,}/g, '/');
const isValidURL = (url) => {
  if (!isString(url)) return false;
  try { new URL(url); return true; } catch { return false; }
};

/* ---------- uuid v4 (secure if available) ---------- */
const hasCrypto = () => typeof crypto !== 'undefined' && !!crypto.getRandomValues;
const generateUUID = () => {
  // RFC4122 v4
  if (hasCrypto()) {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    const b = [...buf].map((x,i) => (i===4||i===6||i===8||i===10?'-':'') + x.toString(16).padStart(2,'0')).join('');
    // the join above inserts extra dashes; fix formatting:
    return `${b.slice(0,8)}-${b.slice(9,13)}-${b.slice(14,18)}-${b.slice(19,23)}-${b.slice(24,36)}`;
  }
  // Fallback (not cryptographically strong)
  const rnd = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(-4);
  return `${rnd()}${rnd()}-${rnd()}-${rnd()}-${rnd()}-${rnd()}${rnd()}${rnd()}`;
};

/* ---------- logging (minimal) ---------- */
const LOG_LEVEL = { INFO:1, DEBUG:2, WARN:3, ERROR:4 };
let _level = LOG_LEVEL.WARN;
const logger = {
  setLogLevel(lvl='WARN'){ _level = LOG_LEVEL[(lvl||'').toUpperCase()] || LOG_LEVEL.WARN; },
  info(...a){ if(_level<=LOG_LEVEL.INFO) console.info(...a); },
  debug(...a){ if(_level<=LOG_LEVEL.DEBUG) console.log(...a); },
  warn(...a){ if(_level<=LOG_LEVEL.WARN) console.warn(...a); },
  error(...a){ if(_level<=LOG_LEVEL.ERROR) console.error(...a); },
};

/* ---------- stringifyWithoutCircular (v1) ---------- */
const getCircularReplacer = (excludeNull) => {
  const ancestors = [];
  return function (key, value) {
    if (excludeNull && (value === null || value === undefined)) return undefined;
    if (typeof value !== 'object' || value === null) return value;
    while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) ancestors.pop();
    if (ancestors.includes(value)) { logger.debug(`Circular Reference detected for key: ${key}`); return '[Circular Reference]'; }
    ancestors.push(value); return value;
  };
};
const stringifyWithoutCircularV1 = (obj, excludeNull) => {
  try { return JSON.stringify(obj, getCircularReplacer(excludeNull)); }
  catch { logger.warn('Failed to convert the value to a JSON string.'); return null; }
};
const isInstanceOfEvent = (value) => typeof value === 'object' && value !== null && 'target' in value;
const isEmptyObject = (obj) => {
  if (!obj) { logger.warn('input is undefined or null'); return true; }
  return Object.keys(obj).length === 0;
};

/* ---------- ScriptLoader (safe) ---------- */
const LOAD_ORIGIN = 'RS_JS_SDK';
function ScriptLoader(id, src, options = {}) {
  try {
    if (document.getElementById(id)) return;
    const js = document.createElement('script');
    js.src = src;
    js.async = options.async === undefined ? true : options.async;
    js.type = 'text/javascript';
    js.id = id;
    if (options.skipDatasetAttributes !== true) {
      js.setAttribute('data-loader', LOAD_ORIGIN);
      if (options.isNonNativeSDK !== undefined) {
        js.setAttribute('data-isNonNativeSDK', String(options.isNonNativeSDK));
      }
    }
    const head = document.getElementsByTagName('head')[0];
    if (head) head.insertBefore(js, head.firstChild);
    else {
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(js, firstScript);
    }
  } catch (e) {
    handleError(e);
  }
}

/* ---------- error handler ---------- */
const ERROR_MESSAGES_TO_BE_FILTERED = ['Request failed with status:'];
const notifyError = (error) => {
  const client = window.RudderStackGlobals?.errorReporting;
  if (client && error instanceof Error) client.notify(error);
};
const normalizeError = (error, customMessage, analyticsInstance) => {
  let errorMessage = '';
  try {
    if (typeof error === 'string') errorMessage = error;
    else if (error instanceof Error) errorMessage = error.message;
    else errorMessage = error?.message ? error.message : stringifyWithoutCircularV1(error);
  } catch { errorMessage = ''; }

  if (isInstanceOfEvent(error)) {
    if (error.target && error.target.localName !== 'script') return '';
    if (error.target.dataset &&
        (error.target.dataset.loader !== LOAD_ORIGIN ||
         error.target.dataset.isnonnativesdk !== 'true')) return '';
    errorMessage = `error in script loading:: src::  ${error.target.src} id:: ${error.target.id}`;
    if (error.target.id === 'ad-block') {
      const g = window.rudderanalytics?.getAnalyticsInstance?.();
      g?.page('RudderJS-Initiated', 'ad-block page request', { path:'/ad-blocked', title:errorMessage }, g?.sendAdblockPageOptions);
      return '';
    }
  }
  return `[handleError]::${customMessage || ''} "${errorMessage}"`;
};
const isAllowedToBeNotified = (error) => {
  if (error?.message) return !ERROR_MESSAGES_TO_BE_FILTERED.some(m => error.message.includes(m));
  return true;
};
function handleError(error, customMessage, analyticsInstance){
  let msg;
  try { msg = normalizeError(error, customMessage, analyticsInstance); }
  catch (e) { logger.error('[handleError] Exception:: ', e); logger.error('[handleError] Original error:: ', stringifyWithoutCircularV1(error)); notifyError(e); }
  if (!msg) return;
  logger.error(msg);
  if (isAllowedToBeNotified(error)) notifyError(error);
}

/* ---------- StayDripped specific enhancements ---------- */
const trackPageLeave = () => {
  onPageLeave((isAccessible) => {
    // Track page leave for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_leave', {
        'is_accessible': isAccessible,
        'page_location': window.location.href,
        'page_title': document.title
      });
    }
    logger.debug('Page leave tracked:', { isAccessible, url: window.location.href });
  });
};

const trackUserEngagement = () => {
  let engagementStartTime = Date.now();
  let scrollDepth = 0;
  let maxScrollDepth = 0;

  // Track scroll depth
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    scrollDepth = Math.round((scrollTop + windowHeight) / docHeight * 100);
    maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
  });

  // Track engagement time on page leave
  onPageLeave(() => {
    const engagementTime = Math.round((Date.now() - engagementStartTime) / 1000);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'user_engagement', {
        'engagement_time_msec': engagementTime * 1000,
        'scroll_depth': maxScrollDepth,
        'page_location': window.location.href
      });
    }
    
    logger.debug('User engagement tracked:', { 
      engagementTime, 
      maxScrollDepth, 
      url: window.location.href 
    });
  });
};

const initializeErrorTracking = () => {
  // Global error handler
  window.addEventListener('error', (event) => {
    handleError(event.error || event, 'Global error handler');
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Unhandled promise rejection');
  });
};

/* ---------- export on window ---------- */
window.StayDrippedUtils = {
  // Core utilities
  onPageLeave,
  trim, removeDoubleSpaces, removeLeadingPeriod,
  tryStringify, toBase64, fromBase64, base64ToBytes, bytesToBase64,
  getFormattedTimestamp, getCurrentTimeFormatted,
  removeDuplicateSlashes, isValidURL,
  generateUUID,
  logger,
  stringifyWithoutCircularV1, isInstanceOfEvent, isEmptyObject,
  ScriptLoader, handleError, normalizeError, notifyError,
  
  // StayDripped specific enhancements
  trackPageLeave,
  trackUserEngagement,
  initializeErrorTracking,
  
  // Convenience methods
  init: () => {
    logger.info('StayDripped Utils initialized');
    trackPageLeave();
    trackUserEngagement();
    initializeErrorTracking();
  },
  
  setDebugMode: (enabled = true) => {
    logger.setLogLevel(enabled ? 'DEBUG' : 'WARN');
    logger.info('Debug mode:', enabled ? 'enabled' : 'disabled');
  }
};

// Auto-initialize if not in a module environment
if (typeof module === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.StayDrippedUtils.init();
  });
}
