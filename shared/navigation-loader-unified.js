// Unified Navigation Loader - Handles loading navigation with correct paths
(function() {
    'use strict';

    // Configuration
    const config = {
        maxRetries: 3,
        retryDelay: 1000,
        loadTimeout: 10000
    };

    let loadAttempts = 0;
    let isLoading = false;
    let isLoaded = false;

    function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[Navigation ${timestamp}] ${message}`);
    }

    function determineBasePath() {
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        return isInPagesFolder ? '../' : '';
    }

    function loadNavigationCSS() {
        // Check if navigation CSS is already loaded
        const existingLink = document.querySelector('link[href*="navigation.css"]');
        if (existingLink) {
            log('Navigation CSS already loaded');
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const basePath = determineBasePath();
            const cssPath = `${basePath}shared/navigation.css`;

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.onload = () => {
                log('Navigation CSS loaded successfully');
                resolve();
            };
            link.onerror = () => {
                log('Failed to load navigation CSS', 'error');
                reject(new Error('Failed to load navigation CSS'));
            };
            document.head.appendChild(link);
        });
    }

    function fetchNavigationHTML() {
        const basePath = determineBasePath();
        const navPath = `${basePath}shared/navigation.html`;

        log(`Fetching navigation from: ${navPath}`);

        return fetch(navPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                log('Navigation HTML fetched successfully');
                return html;
            });
    }

    function fixNavigationPaths(html) {
        const basePath = determineBasePath();
        let fixedHtml = html;

        if (basePath === '') {
            // We're in root, fix paths for root-level access
            fixedHtml = fixedHtml.replace(/href="\.\.\/pages\//g, 'href="pages/');
            fixedHtml = fixedHtml.replace(/href="\.\.\/index\.html/g, 'href="index.html');
            fixedHtml = fixedHtml.replace(/href="\.\.\/"/g, 'href="/"');
            fixedHtml = fixedHtml.replace(/src="\.\.\/shared\//g, 'src="shared/');
            // Fix any remaining ../ references that should be root-relative
            fixedHtml = fixedHtml.replace(/href="\.\.\/([^"]+)"/g, 'href="$1"');
        }
        // If basePath is '../', paths in HTML are already correct

        log('Navigation paths fixed for current location');
        return fixedHtml;
    }

    function injectNavigationHTML(html) {
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) {
            throw new Error('Navigation placeholder not found');
        }

        const fixedHtml = fixNavigationPaths(html);
        placeholder.innerHTML = fixedHtml;
        log('Navigation HTML injected successfully');
    }

    function loadNavigationScript() {
        // Check if navigation script is already loaded
        if (window.navigationLoaded) {
            log('Navigation script already loaded');
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const basePath = determineBasePath();
            const scriptPath = `${basePath}shared/navigation.js`;
            const utilsPath = `${basePath}shared/staydripped-utils.js`;

            // Load utilities first (if available)
            const utilsScript = document.createElement('script');
            utilsScript.src = utilsPath;
            utilsScript.type = 'module';
            utilsScript.onload = function() {
                log('StayDripped utilities loaded successfully');
                loadMainNavigationScript();
            };
            utilsScript.onerror = function() {
                log('StayDripped utilities not found, continuing without them');
                loadMainNavigationScript();
            };

            function loadMainNavigationScript() {
                // Load main navigation script
                const script = document.createElement('script');
                script.src = scriptPath;
                script.onload = function() {
                    window.navigationLoaded = true;
                    log('Navigation script loaded successfully');
                    resolve();
                };
                script.onerror = function() {
                    log('Failed to load navigation script', 'error');
                    reject(new Error('Failed to load navigation script'));
                };
                document.head.appendChild(script);
            }

            document.head.appendChild(utilsScript);
        });
    }

    function showLoadingState() {
        const placeholder = document.getElementById('navigation-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #f8fafc 0%, rgba(0, 102, 204, 0.04) 100%);
                    padding: 16px;
                    text-align: center;
                    color: #64748b;
                    font-family: Inter, sans-serif;
                    font-size: 14px;
                    border-radius: 8px;
                    margin: 8px 0;
                ">
                    <div style="display: inline-flex; align-items: center; gap: 8px;">
                        <div style="
                            width: 16px;
                            height: 16px;
                            border: 2px solid #e2e8f0;
                            border-top: 2px solid #0066cc;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        "></div>
                        Loading navigation...
                    </div>
                    <style>
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                </div>
            `;
        }
    }

    function showErrorState(error) {
        const placeholder = document.getElementById('navigation-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div style="
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    padding: 12px 16px;
                    text-align: center;
                    color: #dc2626;
                    font-family: Inter, sans-serif;
                    font-size: 14px;
                    border-radius: 8px;
                    margin: 8px 0;
                ">
                    Navigation temporarily unavailable
                    <div style="font-size: 12px; margin-top: 4px; color: #7f1d1d;">
                        ${error.message}
                    </div>
                </div>
            `;
        }
    }

    function loadNavigationWithRetry() {
        if (isLoading || isLoaded) {
            log('Navigation loading already in progress or completed');
            return;
        }

        isLoading = true;
        loadAttempts++;

        log(`Loading navigation (attempt ${loadAttempts}/${config.maxRetries})`);

        // Show loading state
        showLoadingState();

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Navigation load timeout')), config.loadTimeout);
        });

        // Main loading promise
        const loadPromise = loadNavigationCSS()
            .then(() => fetchNavigationHTML())
            .then(html => injectNavigationHTML(html))
            .then(() => loadNavigationScript())
            .then(() => {
                isLoaded = true;
                isLoading = false;
                log('Navigation loaded successfully');
                
                // Trigger custom event
                window.dispatchEvent(new CustomEvent('navigationLoaded', {
                    detail: { attempts: loadAttempts }
                }));
            });

        // Race between loading and timeout
        Promise.race([loadPromise, timeoutPromise])
            .catch(error => {
                isLoading = false;
                log(`Navigation load failed: ${error.message}`, 'error');
                showErrorState(error);

                // Retry if attempts remaining
                if (loadAttempts < config.maxRetries) {
                    log(`Retrying in ${config.retryDelay}ms...`);
                    setTimeout(loadNavigationWithRetry, config.retryDelay);
                } else {
                    log('Max retry attempts reached', 'error');
                    // Try to show minimal fallback navigation
                    showFallbackNavigation();
                }
            });
    }

    function showFallbackNavigation() {
        const placeholder = document.getElementById('navigation-placeholder');
        if (!placeholder) return;

        const basePath = determineBasePath();
        placeholder.innerHTML = `
            <div style="
                background: #fff;
                border-bottom: 1px solid #e2e8f0;
                padding: 16px 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                <div style="
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <a href="${basePath}index.html" style="
                        font-size: 24px;
                        font-weight: 700;
                        color: #0066cc;
                        text-decoration: none;
                    ">Stay Dripped IV</a>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <a href="${basePath}pages/unified-booking.html" style="
                            background: #0066cc;
                            color: white;
                            padding: 12px 24px;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: 600;
                        ">Book Now</a>
                        <a href="tel:+1-602-688-9825" style="
                            color: #0066cc;
                            text-decoration: none;
                            font-weight: 600;
                        ">Call (602) 688-9825</a>
                    </div>
                </div>
            </div>
        `;
        log('Fallback navigation displayed');
    }

    // Auto-load when DOM is ready
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNavigationWithRetry);
        } else {
            loadNavigationWithRetry();
        }
    }

    // Expose functions globally
    window.loadNavigation = loadNavigationWithRetry;
    window.navigationConfig = config;

    // Initialize
    initialize();

    log('Unified navigation loader initialized');
})();
