// Fix navigation duplication by removing hardcoded navigation content
(function() {
    'use strict';
    
    function removeHardcodedNavigation() {
        // Remove any hardcoded top-bar that's not inside navigation-placeholder
        const navigationPlaceholder = document.getElementById('navigation-placeholder');
        if (!navigationPlaceholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Find and remove any top-bar or header elements that are siblings of the placeholder
        const allTopBars = document.querySelectorAll('.top-bar');
        const allHeaders = document.querySelectorAll('header.header');
        
        allTopBars.forEach(topBar => {
            // Only remove if it's NOT inside the navigation placeholder
            if (!navigationPlaceholder.contains(topBar)) {
                console.log('Removing duplicate top-bar');
                topBar.remove();
            }
        });
        
        allHeaders.forEach(header => {
            // Only remove if it's NOT inside the navigation placeholder
            if (!navigationPlaceholder.contains(header)) {
                console.log('Removing duplicate header');
                header.remove();
            }
        });
        
        console.log('Navigation duplication cleanup completed');
    }
    
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeHardcodedNavigation);
    } else {
        removeHardcodedNavigation();
    }
    
    // Also run after a short delay to catch any dynamically added content
    setTimeout(removeHardcodedNavigation, 100);
})();
