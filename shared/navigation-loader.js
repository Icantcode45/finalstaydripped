// Navigation Loader - Handles loading navigation with correct paths
(function() {
    'use strict';
    
    function loadNavigation() {
        // Determine the correct path to navigation.html based on current page location
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const navPath = isInPagesFolder ? '../shared/navigation.html' : 'shared/navigation.html';
        
        // Find navigation placeholder
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Load navigation HTML
        fetch(navPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Fix relative paths in the navigation HTML based on current location
                let fixedHtml = html;
                
                if (isInPagesFolder) {
                    // We're in a pages subfolder, paths in navigation.html are already correct (../)
                    fixedHtml = html;
                } else {
                    // We're in root, need to add pages/ prefix to page links
                    fixedHtml = html.replace(/href="\.\.\/pages\//g, 'href="pages/');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/index\.html/g, 'href="index.html');
                }
                
                placeholder.innerHTML = fixedHtml;
                
                // Load navigation JavaScript after HTML is inserted
                loadNavigationScript();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                placeholder.innerHTML = '<div style="background: #f00; color: #fff; padding: 10px;">Navigation failed to load</div>';
            });
    }
    
    function loadNavigationScript() {
        // Check if navigation script is already loaded
        if (window.navigationLoaded) {
            return;
        }
        
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const scriptPath = isInPagesFolder ? '../shared/navigation.js' : 'shared/navigation.js';
        
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = function() {
            window.navigationLoaded = true;
            console.log('Navigation script loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load navigation script');
        };
        document.head.appendChild(script);
    }
    
    // Auto-load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavigation);
    } else {
        loadNavigation();
    }
    
    // Expose function globally in case manual loading is needed
    window.loadNavigation = loadNavigation;
})();
