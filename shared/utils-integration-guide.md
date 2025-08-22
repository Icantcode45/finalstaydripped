# StayDripped Utils Integration Guide

## Overview
The StayDripped Utils module provides comprehensive utilities for page tracking, error handling, analytics enhancement, and various helper functions for the Stay Dripped IV & Wellness Co. website.

## Features

### Core Utilities
- **Page Leave Tracking**: Monitors when users leave pages for analytics
- **String Utilities**: Text processing and validation functions
- **Base64 Encoding**: Unicode-safe encoding/decoding
- **Time Utilities**: Formatted timestamps and time helpers
- **URL Utilities**: URL validation and processing
- **UUID Generation**: Secure UUID v4 generation
- **Logging**: Configurable logging system
- **Error Handling**: Comprehensive error tracking and reporting

### Analytics Enhancements
- **User Engagement Tracking**: Measures scroll depth and time on page
- **Enhanced Event Tracking**: Adds timestamps and session IDs to analytics events
- **Error Analytics**: Automatic error reporting to analytics

## Integration

### Automatic Loading
The utilities are automatically loaded on all pages through the navigation loader system. No manual integration required for basic functionality.

### Manual Initialization
If you need to manually initialize the utilities:

```javascript
// Initialize all tracking features
window.StayDrippedUtils.init();

// Or initialize individual features
window.StayDrippedUtils.trackPageLeave();
window.StayDrippedUtils.trackUserEngagement();
window.StayDrippedUtils.initializeErrorTracking();
```

### Debug Mode
Enable debug mode to see detailed logging:

```javascript
// Enable debug mode
window.StayDrippedUtils.setDebugMode(true);

// Disable debug mode (default)
window.StayDrippedUtils.setDebugMode(false);
```

## Usage Examples

### Error Handling
```javascript
try {
    // Your code here
} catch (error) {
    window.StayDrippedUtils.handleError(error, 'Custom error context');
}
```

### Enhanced Analytics
```javascript
// Track custom events with enhanced data
if (typeof gtag !== 'undefined') {
    gtag('event', 'custom_event', {
        'custom_parameter': 'value',
        'timestamp': window.StayDrippedUtils.getCurrentTimeFormatted(),
        'session_id': window.StayDrippedUtils.generateUUID()
    });
}
```

### String Utilities
```javascript
// Clean and format strings
const cleanText = window.StayDrippedUtils.trim(userInput);
const singleSpaced = window.StayDrippedUtils.removeDoubleSpaces(cleanText);

// Base64 encoding/decoding
const encoded = window.StayDrippedUtils.toBase64('Hello World');
const decoded = window.StayDrippedUtils.fromBase64(encoded);
```

### URL Validation
```javascript
// Validate URLs
const isValid = window.StayDrippedUtils.isValidURL('https://example.com');

// Clean URLs
const cleanUrl = window.StayDrippedUtils.removeDuplicateSlashes(url);
```

### Dynamic Script Loading
```javascript
// Safely load external scripts
window.StayDrippedUtils.ScriptLoader(
    'my-script-id',
    'https://example.com/script.js',
    { async: true }
);
```

## Current Integrations

### Homepage (index.html)
- Enhanced location finder tracking
- Debug mode initialization
- Element visibility tracking

### Supplements Page
- Add to cart tracking with session IDs
- Enhanced page view analytics
- Error handling for cart operations

### Unified Booking Page
- Service selection tracking
- IntakeQ portal error handling
- Enhanced contact method tracking

## Configuration

### Log Levels
- `INFO`: General information messages
- `DEBUG`: Detailed debugging information
- `WARN`: Warning messages (default)
- `ERROR`: Error messages only

### Analytics Integration
The utilities automatically enhance Google Analytics events with:
- Timestamps in ISO format
- Session IDs for user session tracking
- Enhanced error context
- Page engagement metrics

## Best Practices

1. **Error Handling**: Always wrap risky operations with error handling
2. **Debug Mode**: Enable only during development
3. **Analytics**: Use enhanced tracking for key user actions
4. **Performance**: The utilities are lightweight and non-blocking
5. **Privacy**: No personal data is collected or transmitted

## Browser Support
- Modern browsers with ES6+ support
- Graceful degradation for older browsers
- Crypto API used when available for secure UUIDs

## Troubleshooting

### Utils Not Available
If `window.StayDrippedUtils` is undefined:
1. Check if the navigation-loader.js is properly included
2. Verify the staydripped-utils.js file is accessible
3. Check browser console for loading errors

### Debug Information
Enable debug mode to see detailed information:
```javascript
window.StayDrippedUtils.setDebugMode(true);
```

### Error Reporting
Errors are automatically reported to:
- Browser console
- Google Analytics (if configured)
- RudderStack (if available)

## Future Enhancements
- A/B testing utilities
- Advanced user behavior tracking
- Performance monitoring
- Custom analytics dimensions
