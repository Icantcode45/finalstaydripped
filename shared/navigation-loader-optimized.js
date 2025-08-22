// Optimized Navigation Loader - Faster loading with async strategies
(function() {
    'use strict';
    
    // Cache for loaded resources
    const cache = {
        navigationHtml: null,
        scriptsLoaded: new Set()
    };
    
    function preloadResources() {
        // Preload navigation HTML
        if (!cache.navigationHtml) {
            const currentPath = window.location.pathname;
            const isInPagesFolder = currentPath.includes('/pages/');
            const navPath = isInPagesFolder ? '../shared/navigation.html' : 'shared/navigation.html';
            
            fetch(navPath)
                .then(response => response.text())
                .then(html => {
                    cache.navigationHtml = html;
                })
                .catch(error => console.warn('Navigation preload failed:', error));
        }
    }
    
    function loadNavigationFast() {
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const navPath = isInPagesFolder ? '../shared/navigation.html' : 'shared/navigation.html';

        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            console.warn('Navigation placeholder not found');
            return;
        }

        // Show loading skeleton
        placeholder.innerHTML = `
            <div style="height: 80px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center;">
                <div style="width: 200px; height: 40px; background: #e2e8f0; border-radius: 4px; animation: pulse 2s infinite;"></div>
            </div>
            <style>
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            </style>
        `;

        // Use cached HTML if available, otherwise fetch
        const htmlPromise = cache.navigationHtml 
            ? Promise.resolve(cache.navigationHtml)
            : fetch(navPath).then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            });

        htmlPromise
            .then(html => {
                // Cache the HTML
                cache.navigationHtml = html;
                
                // Fix relative paths based on current location
                let fixedHtml = html;
                if (!isInPagesFolder) {
                    fixedHtml = html.replace(/href="\.\.\/pages\//g, 'href="pages/');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/index\.html/g, 'href="index.html');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/"/g, 'href="/"');
                    fixedHtml = fixedHtml.replace(/href="\.\.\/([^"]+)"/g, 'href="$1"');
                }
                
                placeholder.innerHTML = fixedHtml;
                
                // Load scripts asynchronously
                loadNavigationScriptsAsync();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                placeholder.innerHTML = `
                    <div style="background: #fee2e2; color: #dc2626; padding: 12px; border-radius: 4px; margin: 10px;">
                        Navigation temporarily unavailable. <a href="/" style="color: #dc2626; text-decoration: underline;">Refresh page</a>
                    </div>
                `;
            });
    }
    
    function loadNavigationScriptsAsync() {
        if (window.navigationLoaded) return;

        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const utilsPath = isInPagesFolder ? '../shared/staydripped-utils.js' : 'shared/staydripped-utils.js';
        const scriptPath = isInPagesFolder ? '../shared/navigation.js' : 'shared/navigation.js';

        // Load utilities and navigation scripts in parallel
        const loadScript = (src, module = false) => {
            return new Promise((resolve, reject) => {
                if (cache.scriptsLoaded.has(src)) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = src;
                if (module) script.type = 'module';
                script.async = true;
                script.onload = () => {
                    cache.scriptsLoaded.add(src);
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Load both scripts in parallel
        Promise.all([
            loadScript(utilsPath, true).catch(() => console.warn('StayDripped utilities failed to load')),
            loadScript(scriptPath).catch(() => console.warn('Navigation script failed to load'))
        ]).then(() => {
            window.navigationLoaded = true;
            console.log('Navigation loaded successfully');
        });
    }
    
    // Start preloading immediately
    preloadResources();
    
    // Load navigation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavigationFast);
    } else {
        loadNavigationFast();
    }
    
    // Expose function globally for manual loading
    window.loadNavigation = loadNavigationFast;
})();
