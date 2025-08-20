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
                console.log('Navigation fetch response:', response.status, response.ok);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log('Navigation HTML loaded, length:', html.length);

                // Fix relative paths in the navigation HTML based on current location
                let fixedHtml = html;

                if (isInPagesFolder) {
                    // We're in a pages subfolder, paths in navigation.html are already correct (../)
                    fixedHtml = html;
                    console.log('Using paths for pages folder');
                } else {
                    // We're in root, need to fix paths for root-level access
                    fixedHtml = html.replace(/href="\.\.\/pages\//g, 'href="pages/');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/index\.html/g, 'href="index.html');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/"/g, 'href="/"');
                    // Fix any remaining ../ references that should be root-relative
                    fixedHtml = fixedHtml.replace(/href="\.\.\/([^"]+)"/g, 'href="$1"');
                    console.log('Fixed paths for root access');
                }

                placeholder.innerHTML = fixedHtml;
                console.log('Navigation HTML inserted into placeholder');

                // Load navigation JavaScript after HTML is inserted
                loadNavigationScript();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                placeholder.innerHTML = '<div style="background: #f00; color: #fff; padding: 10px;">Navigation failed to load: ' + error.message + '</div>';
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
        const utilsPath = isInPagesFolder ? '../shared/staydripped-utils.js' : 'shared/staydripped-utils.js';

        console.log('Loading scripts:', { utilsPath, scriptPath });

        // Load utilities first
        const utilsScript = document.createElement('script');
        utilsScript.src = utilsPath;
        utilsScript.type = 'module';
        utilsScript.onload = function() {
            console.log('StayDripped utilities loaded successfully');
        };
        utilsScript.onerror = function(e) {
            console.error('Failed to load StayDripped utilities:', e);
        };
        document.head.appendChild(utilsScript);

        // Then load navigation script
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = function() {
            window.navigationLoaded = true;
            console.log('Navigation script loaded successfully');

            // Verify navigation functions are available
            if (typeof window.toggleMobileNav === 'function') {
                console.log('Mobile navigation function is available');
            } else {
                console.warn('Mobile navigation function not found');
            }
        };
        script.onerror = function(e) {
            console.error('Failed to load navigation script:', e);
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
