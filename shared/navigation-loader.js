// Navigation Loader - Handles loading navigation with correct paths
(function() {
    'use strict';

    function loadNavigationCSS() {
        // Check if navigation CSS is already loaded
        const existingLink = document.querySelector('link[href*="navigation.css"]');
        if (existingLink) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const currentPath = window.location.pathname;
            const isInPagesFolder = currentPath.includes('/pages/');
            const cssPath = isInPagesFolder ? '../shared/navigation.css' : 'shared/navigation.css';

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    function loadNavigation() {
        // Find navigation placeholder
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            console.warn('Navigation placeholder not found - skipping navigation load');
            return Promise.resolve();
        }

        // Determine the correct path to navigation.html based on current page location
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const navPath = isInPagesFolder ? '../shared/navigation.html' : 'shared/navigation.html';

<<<<<<< HEAD
        // Find navigation placeholder
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Load navigation HTML
        fetch(navPath)
=======
        // Load CSS first, then HTML
        return loadNavigationCSS()
            .then(() => {
                // Load navigation HTML
                return fetch(navPath);
            })
>>>>>>> refs/remotes/origin/main
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
                    // We're in root, need to fix paths for root-level access
                    fixedHtml = html.replace(/href="\.\.\/pages\//g, 'href="pages/');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/index\.html/g, 'href="index.html');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/"/g, 'href="/"');
                    // Fix any remaining ../ references that should be root-relative
                    fixedHtml = fixedHtml.replace(/href="\.\.\/([^"]+)"/g, 'href="$1"');
                }

                placeholder.innerHTML = fixedHtml;

                // Load navigation JavaScript after HTML is inserted
                return loadNavigationScript();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                if (placeholder) {
                    placeholder.innerHTML = '<div style="background: #f8f9fa; padding: 10px; text-align: center; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px;">Navigation temporarily unavailable</div>';
                }
            });
    }

    function loadNavigationScript() {
        // Check if navigation script is already loaded
        if (window.navigationLoaded) {
            return Promise.resolve();
        }

<<<<<<< HEAD
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const scriptPath = isInPagesFolder ? '../shared/navigation.js' : 'shared/navigation.js';
        const utilsPath = isInPagesFolder ? '../shared/staydripped-utils.js' : 'shared/staydripped-utils.js';

        // Load utilities first
        const utilsScript = document.createElement('script');
        utilsScript.src = utilsPath;
        utilsScript.type = 'module';
        utilsScript.onload = function() {
            console.log('StayDripped utilities loaded successfully');
        };
        utilsScript.onerror = function() {
            console.error('Failed to load StayDripped utilities');
        };
        document.head.appendChild(utilsScript);

        // Then load navigation script
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
=======
        return new Promise((resolve, reject) => {
            const currentPath = window.location.pathname;
            const isInPagesFolder = currentPath.includes('/pages/');
            const scriptPath = isInPagesFolder ? '../shared/navigation.js' : 'shared/navigation.js';

            const script = document.createElement('script');
            script.src = scriptPath;
            script.onload = function() {
                window.navigationLoaded = true;
                console.log('Navigation script loaded successfully');
                resolve();
            };
            script.onerror = function() {
                console.error('Failed to load navigation script');
                reject(new Error('Failed to load navigation script'));
            };
            document.head.appendChild(script);
        });
>>>>>>> refs/remotes/origin/main
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
