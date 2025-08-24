// Consolidated Navigation Loader V2 - Robust navigation loading system
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        navigationHtmlPath: '/shared/navigation.html',
        navigationCssPath: '/shared/navigation-core.css', 
        navigationJsPath: '/shared/navigation.js',
        utilsJsPath: '/shared/staydripped-utils.js',
        maxRetries: 3,
        retryDelay: 1000,
        timeout: 10000
    };
    
    // Cache and state management
    const cache = {
        navigationHtml: null,
        cssLoaded: false,
        scriptsLoaded: new Set(),
        loadPromises: new Map()
    };
    
    // Utility functions
    function getAbsolutePath(relativePath) {
        // Convert relative path to absolute path based on current location
        const base = window.location.origin;
        const currentPath = window.location.pathname;
        
        // Handle paths that start with /
        if (relativePath.startsWith('/')) {
            return base + relativePath;
        }
        
        // For pages in subdirectories, adjust the path
        if (currentPath.includes('/pages/')) {
            return base + '/' + relativePath;
        }
        
        return base + '/' + relativePath;
    }
    
    function createLoadingSpinner() {
        return `
            <div class="nav-loading-container" style="
                height: 80px; 
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-bottom: 1px solid #e2e8f0; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                position: relative;
                overflow: hidden;
            ">
                <div class="nav-loading-spinner" style="
                    width: 40px; 
                    height: 40px; 
                    border: 3px solid #e2e8f0; 
                    border-top: 3px solid #0066cc; 
                    border-radius: 50%; 
                    animation: nav-spin 1s linear infinite;
                "></div>
                <style>
                    @keyframes nav-spin { 
                        0% { transform: rotate(0deg); } 
                        100% { transform: rotate(360deg); } 
                    }
                    .nav-loading-container::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, 
                            transparent, 
                            rgba(255, 255, 255, 0.4), 
                            transparent
                        );
                        animation: nav-shimmer 2s ease-in-out infinite;
                    }
                    @keyframes nav-shimmer {
                        0% { left: -100%; }
                        100% { left: 100%; }
                    }
                </style>
            </div>
        `;
    }
    
    function createErrorMessage(error) {
        console.error('Navigation loading error:', error);
        return `
            <div style="
                background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); 
                color: #dc2626; 
                padding: 16px; 
                border-radius: 8px; 
                margin: 16px; 
                border: 1px solid #fca5a5;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
            ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <strong>Navigation Temporarily Unavailable</strong>
                </div>
                <p style="margin: 0; font-size: 14px;">
                    Please <a href="/" style="color: #dc2626; text-decoration: underline; font-weight: 600;">refresh the page</a> 
                    or <a href="tel:+1-602-688-9825" style="color: #dc2626; text-decoration: underline; font-weight: 600;">call us at (602) 688-9825</a>.
                </p>
            </div>
        `;
    }
    
    // Improved fetch with retry logic
    async function fetchWithRetry(url, options = {}, retries = CONFIG.maxRetries) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (retries > 0 && !controller.signal.aborted) {
                console.warn(`Fetch failed, retrying in ${CONFIG.retryDelay}ms...`, error.message);
                await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay));
                return fetchWithRetry(url, options, retries - 1);
            }
            
            throw error;
        }
    }
    
    // Load CSS with error handling
    function loadNavigationCSS() {
        if (cache.cssLoaded) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            const existingLink = document.querySelector('link[href*="navigation-core.css"]');
            if (existingLink) {
                cache.cssLoaded = true;
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = getAbsolutePath(CONFIG.navigationCssPath);
            link.onload = () => {
                cache.cssLoaded = true;
                resolve();
            };
            link.onerror = () => {
                console.warn('Failed to load navigation CSS');
                // Don't reject - proceed without CSS
                resolve();
            };
            
            document.head.appendChild(link);
        });
    }
    
    // Load JavaScript with better error handling
    function loadScript(src, isModule = false) {
        const scriptKey = `${src}:${isModule}`;
        
        if (cache.scriptsLoaded.has(scriptKey)) {
            return Promise.resolve();
        }
        
        if (cache.loadPromises.has(scriptKey)) {
            return cache.loadPromises.get(scriptKey);
        }
        
        const promise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = getAbsolutePath(src);
            script.async = true;
            
            if (isModule) {
                script.type = 'module';
            }
            
            script.onload = () => {
                cache.scriptsLoaded.add(scriptKey);
                cache.loadPromises.delete(scriptKey);
                resolve();
            };
            
            script.onerror = () => {
                cache.loadPromises.delete(scriptKey);
                console.warn(`Failed to load script: ${src}`);
                // Don't reject - allow page to continue functioning
                resolve();
            };
            
            document.head.appendChild(script);
        });
        
        cache.loadPromises.set(scriptKey, promise);
        return promise;
    }
    
    // Fix relative URLs in HTML content
    function fixRelativeUrls(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Fix href attributes
        const links = tempDiv.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('../')) {
                // Convert ../pages/ to pages/
                link.setAttribute('href', href.replace('../', ''));
            } else if (href && href.startsWith('./')) {
                // Convert ./pages/ to pages/
                link.setAttribute('href', href.replace('./', ''));
            }
        });
        
        // Fix src attributes for images
        const images = tempDiv.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('../')) {
                img.setAttribute('src', src.replace('../', ''));
            } else if (src && src.startsWith('./')) {
                img.setAttribute('src', src.replace('./', ''));
            }
        });
        
        return tempDiv.innerHTML;
    }
    
    // Remove duplicate navigation elements
    function removeDuplicateNavigation() {
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) return;
        
        // Remove any hardcoded navigation that's not in the placeholder
        const allTopBars = document.querySelectorAll('.top-bar:not(#navigation-placeholder .top-bar)');
        const allHeaders = document.querySelectorAll('header.header:not(#navigation-placeholder header.header)');
        
        let removedCount = 0;
        
        allTopBars.forEach(topBar => {
            if (!placeholder.contains(topBar)) {
                topBar.remove();
                removedCount++;
            }
        });
        
        allHeaders.forEach(header => {
            if (!placeholder.contains(header)) {
                header.remove();
                removedCount++;
            }
        });
        
        if (removedCount > 0) {
            console.log(`Removed ${removedCount} duplicate navigation elements`);
        }
    }
    
    // Main navigation loading function
    async function loadNavigation() {
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Show loading spinner
        placeholder.innerHTML = createLoadingSpinner();
        
        try {
            // Load CSS first (non-blocking)
            loadNavigationCSS().catch(console.warn);
            
            // Load navigation HTML
            let navigationHtml;
            if (cache.navigationHtml) {
                navigationHtml = cache.navigationHtml;
            } else {
                const response = await fetchWithRetry(getAbsolutePath(CONFIG.navigationHtmlPath));
                navigationHtml = await response.text();
                cache.navigationHtml = navigationHtml;
            }
            
            // Fix relative URLs and inject HTML
            const fixedHtml = fixRelativeUrls(navigationHtml);
            placeholder.innerHTML = fixedHtml;
            
            // Remove any duplicate navigation
            removeDuplicateNavigation();
            
            // Load JavaScript files
            try {
                await Promise.allSettled([
                    loadScript(CONFIG.utilsJsPath, true),
                    loadScript(CONFIG.navigationJsPath)
                ]);
            } catch (jsError) {
                console.warn('Some navigation scripts failed to load:', jsError);
            }
            
            // Mark as loaded
            window.navigationLoaded = true;
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('navigationLoaded', {
                detail: { success: true }
            }));
            
            console.log('Navigation loaded successfully');
            
        } catch (error) {
            console.error('Navigation loading failed:', error);
            placeholder.innerHTML = createErrorMessage(error);
            
            // Dispatch failure event
            window.dispatchEvent(new CustomEvent('navigationLoaded', {
                detail: { success: false, error: error.message }
            }));
        }
    }
    
    // Enhanced initialization
    function initializeNavigation() {
        // Check for duplicate loaders
        const loaderScripts = document.querySelectorAll('script[src*="navigation-loader"]');
        if (loaderScripts.length > 1) {
            console.warn(`Found ${loaderScripts.length} navigation loader scripts. This may cause conflicts.`);
        }
        
        // Load navigation when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNavigation);
        } else {
            // DOM is already ready
            setTimeout(loadNavigation, 0);
        }
    }
    
    // Expose global functions
    window.loadNavigation = loadNavigation;
    window.navigationConfig = CONFIG;
    
    // Auto-initialize unless explicitly disabled
    if (!window.disableAutoNavigation) {
        initializeNavigation();
    }
    
    // Handle page visibility change (reload if needed)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !window.navigationLoaded) {
            console.log('Page became visible, checking navigation...');
            const placeholder = document.getElementById('navigation-placeholder');
            if (placeholder && !placeholder.querySelector('.header')) {
                loadNavigation();
            }
        }
    });
    
})();
