// Enhanced Navigation JavaScript - Fixed for new structure
(function() {
    'use strict';

    console.log('Navigation JavaScript initializing...');

    // Remove hardcoded navigation duplication
    function removeHardcodedNavigation() {
        console.log('Checking for navigation duplication...');
        
        const navigationPlaceholder = document.getElementById('navigation-placeholder');
        if (!navigationPlaceholder) {
            console.warn('Navigation placeholder not found');
            return;
        }
        
        // Find and remove any top-bar or header elements that are siblings of the placeholder
        const allTopBars = document.querySelectorAll('.top-bar');
        const allHeaders = document.querySelectorAll('header.header');
        
        allTopBars.forEach((topBar, index) => {
            if (!navigationPlaceholder.contains(topBar)) {
                console.log(`Removing duplicate top-bar ${index + 1}`);
                topBar.remove();
            }
        });
        
        allHeaders.forEach((header, index) => {
            if (!navigationPlaceholder.contains(header)) {
                console.log(`Removing duplicate header ${index + 1}`);
                header.remove();
            }
        });
        
        console.log('Navigation duplication cleanup completed');
    }

    // Initialize expandable navigation functionality
    function initializeExpandableNavigation() {
        console.log('Initializing expandable navigation...');

        const serviceButtons = document.querySelectorAll('.service-category-btn');
        const expansions = document.querySelectorAll('.nav-expansion');

        console.log('Found service buttons:', serviceButtons.length);
        console.log('Found expansions:', expansions.length);

        if (serviceButtons.length === 0) {
            console.warn('No service category buttons found');
            return;
        }

        // Add click handlers to service buttons
        serviceButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const category = this.getAttribute('data-category');
                const expansion = document.querySelector(`.nav-expansion[data-category="${category}"]`);
                const isCurrentlyExpanded = this.classList.contains('expanded');

                console.log('Button clicked:', category, 'Currently expanded:', isCurrentlyExpanded);

                // Close all expansions and remove expanded state from all buttons
                serviceButtons.forEach(btn => btn.classList.remove('expanded'));
                expansions.forEach(exp => exp.classList.remove('expanded'));

                // If this wasn't expanded, expand it
                if (!isCurrentlyExpanded) {
                    this.classList.add('expanded');
                    if (expansion) {
                        expansion.classList.add('expanded');
                        console.log('Expansion opened for:', category);
                    }
                }
            });
        });

        // Close expansions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-expandable')) {
                serviceButtons.forEach(btn => btn.classList.remove('expanded'));
                expansions.forEach(exp => exp.classList.remove('expanded'));
            }
        });

        console.log('Expandable navigation initialized successfully');
    }

    // Initialize mobile menu functionality
    function initializeMobileMenu() {
        console.log('Initializing mobile menu...');

        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

        // Global toggle function
        window.toggleMobileNav = function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.toggle('active');
                }
                
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        };

        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                window.toggleMobileNav();
            });
        }

        // Close mobile menu function
        function closeMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }

        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    closeMobileMenu();
                }
            });
        }

        // Mobile dropdown toggles
        mobileDropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const targetId = toggle.getAttribute('data-target');
                const dropdown = document.getElementById(targetId);

                if (dropdown) {
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
                }
            });
        });

        // Close menu when clicking on menu items
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

        console.log('Mobile menu initialized successfully');
    }

    // Header scroll effect
    function initializeScrollEffect() {
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // Search functionality
    function initializeSearch() {
        const topbarSearch = document.getElementById('topbar-search');
        if (topbarSearch) {
            topbarSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        console.log('Searching for:', query);
                        // Add your search functionality here
                    }
                }
            });
        }

        // Keyboard shortcut for search (Cmd+K / Ctrl+K)
        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (topbarSearch) {
                    topbarSearch.focus();
                }
            }
        });
    }

    // Initialize cart functionality
    function initializeCart() {
        const cartIcon = document.querySelector('a[aria-label="Shopping cart"]');
        if (cartIcon) {
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.StayDrippedCart) {
                    window.location.href = '/pages/checkout.html';
                } else {
                    alert('Cart functionality: Please call (602) 688-9825 to place an order or visit our booking page.');
                    window.location.href = '/pages/book-appointment.html';
                }
            });
        }

        // Update cart count if cart system is available
        function updateCartCount() {
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement && window.StayDrippedCart) {
                const cart = new window.StayDrippedCart();
                const itemCount = cart.getTotalItems();
                cartCountElement.textContent = itemCount || '0';
                cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
            }
        }

        setTimeout(updateCartCount, 500);
        window.addEventListener('cartUpdated', updateCartCount);
    }

    // Main initialization function
    function initialize() {
        console.log('Navigation main initialization starting...');
        
        // Remove duplicate navigation
        removeHardcodedNavigation();
        
        // Initialize all components
        initializeExpandableNavigation();
        initializeMobileMenu();
        initializeScrollEffect();
        initializeSearch();
        initializeCart();
        
        console.log('Navigation initialization completed');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Listen for navigation loaded events
    window.addEventListener('navigationLoaded', function(event) {
        if (event.detail && event.detail.success) {
            console.log('Navigation loaded event received, reinitializing...');
            setTimeout(initialize, 100);
        }
    });

    // Mutation observer to handle dynamic navigation changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const buttons = node.querySelectorAll ? node.querySelectorAll('.service-category-btn') : [];
                        if (buttons.length > 0 || node.classList?.contains('service-category-btn')) {
                            console.log('Navigation buttons detected, reinitializing...');
                            setTimeout(initialize, 50);
                            break;
                        }
                    }
                }
            }
        });
    });

    // Start observing
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    // Global debug function
    window.testNavigation = function() {
        console.log('=== Navigation Test ===');
        const buttons = document.querySelectorAll('.service-category-btn');
        const expansions = document.querySelectorAll('.nav-expansion');

        console.log('Service buttons found:', buttons.length);
        console.log('Expansions found:', expansions.length);

        buttons.forEach((btn, index) => {
            console.log(`Button ${index + 1}:`, {
                category: btn.getAttribute('data-category'),
                text: btn.textContent.trim()
            });
        });

        return { buttons: buttons.length, expansions: expansions.length };
    };

})();
