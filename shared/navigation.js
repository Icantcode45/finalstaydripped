// Navigation Core Functionality - Fixed Version
(function() {
    'use strict';

    let mobileMenu, mobileMenuToggle, mobileMenuClose;
    let isInitialized = false;

    function log(message) {
        console.log(`[Navigation] ${message}`);
    }

    function removeHardcodedNavigation() {
        log('Checking for navigation duplication...');
        
        const navigationPlaceholder = document.getElementById('navigation-placeholder');
        if (!navigationPlaceholder) {
            log('Navigation placeholder not found');
            return;
        }
        
        // Remove any top-bar or header elements that are NOT inside the navigation placeholder
        const allTopBars = document.querySelectorAll('.top-bar');
        const allHeaders = document.querySelectorAll('header.header');
        
        allTopBars.forEach((topBar, index) => {
            if (!navigationPlaceholder.contains(topBar)) {
                log(`Removing duplicate top-bar ${index + 1}`);
                topBar.remove();
            }
        });
        
        allHeaders.forEach((header, index) => {
            if (!navigationPlaceholder.contains(header)) {
                log(`Removing duplicate header ${index + 1}`);
                header.remove();
            }
        });
        
        log('Navigation duplication cleanup completed');
    }

    function initializeMobileMenu() {
        log('Initializing mobile menu...');
        
        mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        mobileMenu = document.getElementById('mobile-menu');
        mobileMenuClose = document.querySelector('.mobile-menu-close');

        if (!mobileMenu) {
            log('Mobile menu element not found');
            return false;
        }

        if (!mobileMenuToggle) {
            log('Mobile menu toggle button not found');
            return false;
        }

        // Mobile menu toggle function
        window.toggleMobileNav = function() {
            log('Toggle mobile nav called');
            
            if (!mobileMenu) {
                log('Mobile menu not available');
                return;
            }

            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
                log('Mobile menu closed');
            } else {
                mobileMenu.classList.add('active');
                if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
                log('Mobile menu opened');
            }
        };

        // Close mobile menu function
        function closeMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
            log('Mobile menu closed');
        }

        // Event listeners for mobile menu toggle
        if (mobileMenuToggle) {
            // Remove any existing listeners
            mobileMenuToggle.removeAttribute('onclick');
            
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                log('Mobile menu toggle clicked');
                window.toggleMobileNav();
            });
            
            log('Mobile menu toggle event listener added');
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Close menu when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    closeMobileMenu();
                }
            });
        }
    }

        // Handle mobile dropdown toggles
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        log(`Found ${mobileDropdownToggles.length} mobile dropdown toggles`);
        
        mobileDropdownToggles.forEach(function(toggle, index) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = toggle.getAttribute('data-target');
                const dropdown = document.getElementById(targetId);

                if (dropdown) {
                    // Toggle active state
                    toggle.classList.toggle('active');
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    mobileDropdownToggles.forEach(function(otherToggle) {
                        if (otherToggle !== toggle) {
                            const otherTargetId = otherToggle.getAttribute('data-target');
                            const otherDropdown = document.getElementById(otherTargetId);
                            if (otherDropdown) {
                                otherToggle.classList.remove('active');
                                otherDropdown.classList.remove('active');
                            }
                        }
                    });
                    
                    log(`Mobile dropdown ${targetId} ${dropdown.classList.contains('active') ? 'opened' : 'closed'}`);
                }
            });
        });

        // Close menu when clicking on direct links
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item:not(.mobile-dropdown-toggle)');
        mobileMenuItems.forEach(function(item) {
            item.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close menu when clicking on dropdown links
        const mobileDropdownLinks = document.querySelectorAll('.mobile-dropdown-section a');
        mobileDropdownLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        log('Mobile menu initialized successfully');
        return true;
    }

    function initializeDesktopDropdowns() {
        log('Initializing desktop dropdowns...');
        
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        if (dropdowns.length === 0) {
            log('No desktop dropdowns found');
            return;
        }

        dropdowns.forEach(function(dropdown, index) {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (!dropdownContent) {
                log(`Dropdown content not found for dropdown ${index}`);
                return;
            }

            let hideTimeout;
            let isHovering = false;

            // Show dropdown on hover
            dropdown.addEventListener('mouseenter', function() {
                log(`Showing dropdown ${index}`);
                isHovering = true;
                
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }

                // Reset and show
                dropdownContent.style.display = 'block';
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'visible';
                
                // Trigger animation
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                }, 10);
            });
        });

            // Hide dropdown with delay
            function scheduleHide() {
                hideTimeout = setTimeout(() => {
                    if (!isHovering) {
                        log(`Hiding dropdown ${index}`);
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.visibility = 'hidden';
                        setTimeout(() => {
                            if (dropdownContent.style.opacity === '0') {
                                dropdownContent.style.display = 'none';
                            }
                        }, 300);
                    }
                }, 150);
            }

            function cancelHide() {
                isHovering = true;
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
            }

            dropdown.addEventListener('mouseleave', function() {
                isHovering = false;
                scheduleHide();
            });
            
            dropdownContent.addEventListener('mouseenter', cancelHide);
            dropdownContent.addEventListener('mouseleave', function() {
                isHovering = false;
                scheduleHide();
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(function(dropdown) {
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.visibility = 'hidden';
                        setTimeout(() => {
                            if (dropdownContent.style.opacity === '0') {
                                dropdownContent.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            }
        });

        log(`Desktop dropdowns initialized (${dropdowns.length} found)`);
    }

    function initializeHeaderScrollEffect() {
        const header = document.getElementById('header');
        if (!header) {
            log('Header element not found for scroll effect');
            return;
        }

        let lastScrollY = window.scrollY;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        log('Header scroll effect initialized');
    }

    function initializeSearchFunctionality() {
        const topbarSearch = document.getElementById('topbar-search');
        
        if (topbarSearch) {
            topbarSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        log(`Search performed: ${query}`);
                        // TODO: Implement actual search functionality
                        alert(`Search functionality coming soon!\nYou searched for: "${query}"`);
                    }
                }
            });

            // Keyboard shortcut for search (Cmd+K / Ctrl+K)
            document.addEventListener('keydown', function(e) {
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    topbarSearch.focus();
                    log('Search focused via keyboard shortcut');
                }
            });

            log('Search functionality initialized');
        }
    }

    function initializeCartIcon() {
        const cartIcon = document.querySelector('a[aria-label="Shopping cart"]');
        const cartCount = document.querySelector('.cart-count');
        
        if (cartIcon) {
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if cart system exists
                if (window.StayDrippedCart) {
                    window.location.href = '/pages/checkout.html';
                } else {
                    // Fallback
                    const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
                    window.location.href = `${basePath}checkout.html`;
                }
                
                log('Cart icon clicked');
            });
        }

        // Update cart count if cart system is available
        function updateCartCount() {
            if (cartCount && window.StayDrippedCart) {
                try {
                    const cart = new window.StayDrippedCart();
                    const itemCount = cart.getTotalItems();
                    cartCount.textContent = itemCount || '0';
                    cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
                    log(`Cart count updated: ${itemCount}`);
                } catch (error) {
                    log(`Cart count update failed: ${error.message}`);
                    cartCount.style.display = 'none';
                }
            }
        }

        // Initialize cart count
        setTimeout(updateCartCount, 500);

        // Listen for cart updates
        window.addEventListener('cartUpdated', updateCartCount);
        
        if (cartIcon) {
            log('Cart functionality initialized');
        }
    }

    function initializePhoneIcon() {
        const phoneIcon = document.querySelector('a[aria-label="Call us"]');
        
        if (phoneIcon) {
            phoneIcon.addEventListener('click', function() {
                // Track phone call click if analytics available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'phone_call_click', {
                        'phone_number': '+1-602-688-9825',
                        'source': 'navigation_icon'
                    });
                }
                log('Phone icon clicked');
            });
        }
    }

    function initializeNavigation() {
        if (isInitialized) {
            log('Navigation already initialized');
            return;
        }

        log('Initializing navigation...');

        // Remove any hardcoded navigation first
        removeHardcodedNavigation();

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            // Initialize components
            const mobileSuccess = initializeMobileMenu();
            initializeDesktopDropdowns();
            initializeHeaderScrollEffect();
            initializeSearchFunctionality();
            initializeCartIcon();
            initializePhoneIcon();

            if (mobileSuccess) {
                isInitialized = true;
                log('✅ Navigation initialization completed successfully');
                
                // Dispatch ready event
                window.dispatchEvent(new CustomEvent('navigationReady'));
            } else {
                log('❌ Navigation initialization failed - mobile menu elements not found');
            }
        }, 100);
    }

    // Auto-initialize when DOM is ready
    function autoInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeNavigation);
        } else {
            // Small delay to ensure navigation HTML is injected
            setTimeout(initializeNavigation, 200);
        }
    }

    // Listen for navigation loaded event from loader
    window.addEventListener('navigationLoaded', function() {
        log('Navigation HTML loaded, initializing functionality...');
        setTimeout(initializeNavigation, 100);
    });

    // Expose functions globally for debugging
    window.initializeNavigation = initializeNavigation;
    window.debugNavigation = function() {
        log('=== Navigation Debug Info ===');
        log('Mobile menu toggle:', !!document.querySelector('.mobile-menu-toggle'));
        log('Mobile menu:', !!document.getElementById('mobile-menu'));
        log('Desktop dropdowns:', document.querySelectorAll('.nav-dropdown').length);
        log('Navigation initialized:', isInitialized);
        log('toggleMobileNav function:', typeof window.toggleMobileNav);
    };

    // Start auto-initialization
    autoInit();

    log('Navigation script loaded and ready');
})();
