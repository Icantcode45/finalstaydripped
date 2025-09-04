// Navigation Debug and Test Script
(function() {
    'use strict';

    function log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const styles = {
            info: 'color: #0066cc; font-weight: bold;',
            success: 'color: #10b981; font-weight: bold;',
            error: 'color: #dc2626; font-weight: bold;',
            warn: 'color: #f59e0b; font-weight: bold;'
        };
        console.log(`%c[Navigation Debug ${timestamp}] ${message}`, styles[type]);
    }

    function testMobileMenu() {
        log('Testing mobile menu functionality...', 'info');
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!mobileMenuToggle) {
            log('❌ Mobile menu toggle not found', 'error');
            return false;
        }
        
        if (!mobileMenu) {
            log('❌ Mobile menu element not found', 'error');
            return false;
        }
        
        if (typeof window.toggleMobileNav !== 'function') {
            log('❌ toggleMobileNav function not defined', 'error');
            return false;
        }
        
        // Test toggle functionality
        try {
            window.toggleMobileNav();
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                log('✅ Mobile menu opens successfully', 'success');
                // Close it
                window.toggleMobileNav();
                const isClosed = !mobileMenu.classList.contains('active');
                
                if (isClosed) {
                    log('✅ Mobile menu closes successfully', 'success');
                    return true;
                } else {
                    log('❌ Mobile menu failed to close', 'error');
                    return false;
                }
            } else {
                log('❌ Mobile menu failed to open', 'error');
                return false;
            }
        } catch (error) {
            log(`❌ Mobile menu test failed: ${error.message}`, 'error');
            return false;
        }
    }

    function testDesktopDropdowns() {
        log('Testing desktop dropdown functionality...', 'info');
        
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        if (dropdowns.length === 0) {
            log('❌ No desktop dropdowns found', 'error');
            return false;
        }
        
        let workingDropdowns = 0;
        
        dropdowns.forEach((dropdown, index) => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (dropdownContent) {
                workingDropdowns++;
                log(`✅ Dropdown ${index + 1} structure found`, 'success');
            } else {
                log(`❌ Dropdown ${index + 1} missing content`, 'error');
            }
        });
        
        if (workingDropdowns === dropdowns.length) {
            log(`✅ All ${workingDropdowns} dropdowns have proper structure`, 'success');
            return true;
        } else {
            log(`❌ Only ${workingDropdowns}/${dropdowns.length} dropdowns working`, 'error');
            return false;
        }
    }

    function testNavigationElements() {
        log('Testing navigation elements...', 'info');
        
        const elements = {
            'Navigation placeholder': document.getElementById('navigation-placeholder'),
            'Header': document.getElementById('header'),
            'Top bar': document.querySelector('.top-bar'),
            'Navigation links': document.querySelector('.nav-links'),
            'Search input': document.getElementById('topbar-search'),
            'Cart icon': document.querySelector('a[aria-label="Shopping cart"]'),
            'Phone icon': document.querySelector('a[aria-label="Call us"]')
        };
        
        let workingElements = 0;
        
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                log(`✅ ${name} found`, 'success');
                workingElements++;
            } else {
                log(`❌ ${name} missing`, 'error');
            }
        });
        
        log(`Navigation elements: ${workingElements}/${Object.keys(elements).length} found`, workingElements === Object.keys(elements).length ? 'success' : 'warn');
        
        return workingElements === Object.keys(elements).length;
    }

    function testNavigationFunctionality() {
        log('Starting comprehensive navigation test...', 'info');
        
        const results = {
            elements: testNavigationElements(),
            mobileMenu: testMobileMenu(),
            dropdowns: testDesktopDropdowns()
        };
        
        const totalTests = Object.keys(results).length;
        const passedTests = Object.values(results).filter(Boolean).length;
        
        log(`=== Navigation Test Results ===`, 'info');
        log(`Tests passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? 'success' : 'warn');
        
        if (passedTests === totalTests) {
            log('🎉 All navigation tests passed!', 'success');
        } else {
            log('⚠️ Some navigation tests failed', 'warn');
        }
        
        return results;
    }

    function debugNavigationState() {
        log('=== Navigation State Debug ===', 'info');
        
        const state = {
            'Navigation loaded': !!window.navigationLoaded,
            'Initialize function': typeof window.initializeNavigation,
            'Toggle function': typeof window.toggleMobileNav,
            'Debug function': typeof window.debugNavigation,
            'Navigation ready event': 'Check console for navigationReady event'
        };
        
        Object.entries(state).forEach(([key, value]) => {
            log(`${key}: ${value}`, 'info');
        });
        
        // Check for common issues
        const placeholder = document.getElementById('navigation-placeholder');
        if (placeholder) {
            log(`Navigation placeholder content length: ${placeholder.innerHTML.length}`, 'info');
            if (placeholder.innerHTML.length === 0) {
                log('⚠️ Navigation placeholder is empty - navigation may not have loaded', 'warn');
            }
        }
        
        // Check CSS loading
        const navCSS = document.querySelector('link[href*="navigation.css"]');
        if (navCSS) {
            log('✅ Navigation CSS is linked', 'success');
        } else {
            log('❌ Navigation CSS not found', 'error');
        }
        
        // Check JS loading
        const navJS = document.querySelector('script[src*="navigation"]');
        if (navJS) {
            log('✅ Navigation JS is linked', 'success');
        } else {
            log('❌ Navigation JS not found', 'error');
        }
    }

    // Expose functions globally for manual testing
    window.testNavigation = testNavigationFunctionality;
    window.debugNavigationState = debugNavigationState;
    window.testMobileMenu = testMobileMenu;
    window.testDesktopDropdowns = testDesktopDropdowns;

    // Auto-run tests when navigation is ready
    window.addEventListener('navigationReady', function() {
        log('🎯 Navigation ready event received - running tests...', 'success');
        setTimeout(testNavigationFunctionality, 500);
    });

    // Manual trigger after page load
    if (document.readyState === 'complete') {
        setTimeout(() => {
            log('🔧 Manual test trigger - running navigation tests...', 'info');
            testNavigationFunctionality();
        }, 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                log('🔧 Page loaded - running navigation tests...', 'info');
                testNavigationFunctionality();
            }, 1000);
        });
    }

    log('Navigation debug script loaded. Use testNavigation() to run tests manually.', 'info');
})();
