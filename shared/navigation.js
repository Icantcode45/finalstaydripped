// Fix navigation duplication by removing hardcoded navigation content
function removeHardcodedNavigation() {
    console.log('Checking for navigation duplication...');
    
    // Remove any hardcoded top-bar that's not inside navigation-placeholder
    const navigationPlaceholder = document.getElementById('navigation-placeholder');
    if (!navigationPlaceholder) {
        console.warn('Navigation placeholder not found');
        return;
    }
    
    // Find and remove any top-bar or header elements that are siblings of the placeholder
    const allTopBars = document.querySelectorAll('.top-bar');
    const allHeaders = document.querySelectorAll('header.header');
    
    allTopBars.forEach((topBar, index) => {
        // Only remove if it's NOT inside the navigation placeholder
        if (!navigationPlaceholder.contains(topBar)) {
            console.log(`Removing duplicate top-bar ${index + 1}`);
            topBar.remove();
        }
    });
    
    allHeaders.forEach((header, index) => {
        // Only remove if it's NOT inside the navigation placeholder
        if (!navigationPlaceholder.contains(header)) {
            console.log(`Removing duplicate header ${index + 1}`);
            header.remove();
        }
    });
    
    console.log('Navigation duplication cleanup completed');
}

// Horizontal Expandable Navigation Functionality
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

    // Remove any existing event listeners by cloning buttons
    serviceButtons.forEach((button, index) => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', function(e) {
            console.log('Service button clicked:', this.getAttribute('data-category'));
            e.preventDefault();
            e.stopPropagation();

            const category = this.getAttribute('data-category');
            const expansion = document.querySelector(`.nav-expansion[data-category="${category}"]`);
            const isCurrentlyExpanded = this.classList.contains('expanded');

            console.log('Category:', category, 'Expansion found:', !!expansion, 'Currently expanded:', isCurrentlyExpanded);

            // Get fresh references after cloning
            const allButtons = document.querySelectorAll('.service-category-btn');
            const allExpansions = document.querySelectorAll('.nav-expansion');

            // Close all expansions and remove expanded state from all buttons
            allButtons.forEach(btn => btn.classList.remove('expanded'));
            allExpansions.forEach(exp => exp.classList.remove('expanded'));

            // If this wasn't expanded, expand it
            if (!isCurrentlyExpanded) {
                this.classList.add('expanded');
                if (expansion) {
                    expansion.classList.add('expanded');
                    console.log('Expansion opened for:', category);
                } else {
                    console.warn('No expansion found for category:', category);
                }
            }
        });
    });

    // Close expansions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-expandable')) {
            const allButtons = document.querySelectorAll('.service-category-btn');
            const allExpansions = document.querySelectorAll('.nav-expansion');
            allButtons.forEach(btn => btn.classList.remove('expanded'));
            allExpansions.forEach(exp => exp.classList.remove('expanded'));
        }
    }, { once: false });

    console.log('Expandable navigation initialized successfully');
}

// Listen for navigation loaded event and re-initialize
window.addEventListener('navigationLoaded', function(event) {
    if (event.detail.success) {
        console.log('Navigation loaded, initializing expandable functionality...');
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            initializeExpandableNavigation();
        }, 100);
    }
});

// Also use MutationObserver to watch for navigation changes
const navigationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if any added nodes contain service category buttons
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const buttons = node.querySelectorAll ? node.querySelectorAll('.service-category-btn') : [];
                    if (buttons.length > 0 || node.classList?.contains('service-category-btn')) {
                        console.log('Navigation buttons detected, reinitializing...');
                        setTimeout(() => {
                            initializeExpandableNavigation();
                        }, 50);
                        break;
                    }
                }
            }
        }
    });
});

// Start observing the document for navigation changes
navigationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Global test function for debugging
window.testNavigation = function() {
    console.log('=== Navigation Test ===');
    const buttons = document.querySelectorAll('.service-category-btn');
    const expansions = document.querySelectorAll('.nav-expansion');

    console.log('Service buttons found:', buttons.length);
    console.log('Expansions found:', expansions.length);

    buttons.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, {
            category: btn.getAttribute('data-category'),
            text: btn.textContent.trim(),
            hasClickListener: btn.onclick !== null
        });
    });

    if (buttons.length > 0) {
        console.log('Attempting to click first button...');
        buttons[0].click();
    }

    return { buttons: buttons.length, expansions: expansions.length };
};

// Force initialization on any page load
window.forceNavInit = function() {
    console.log('Force initializing navigation...');
    initializeExpandableNavigation();
};

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Fix navigation duplication first
    removeHardcodedNavigation();

    // Run again after a short delay to catch any dynamically added content
    setTimeout(removeHardcodedNavigation, 500);

    // Initialize expandable navigation multiple times to ensure it works
    initializeExpandableNavigation();

    // Try again after a short delay
    setTimeout(() => {
        initializeExpandableNavigation();
    }, 1000);

    // And once more after everything loads
    setTimeout(() => {
        initializeExpandableNavigation();
    }, 3000);

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    // Function to toggle mobile navigation
    window.toggleMobileNav = function() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.toggle('active');
            }
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                document.body.style.overflow = ''; // Re-enable scroll
            }
        }
    };

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleMobileNav();
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        document.body.style.overflow = ''; // Re-enable scroll
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    // Handle dropdown toggles
    mobileDropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
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
            }
        });
    });

    // Close menu when clicking on menu items (except dropdowns)
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

    // Header scroll effect
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

    // Search functionality
    const topbarSearch = document.getElementById('topbar-search');
    if (topbarSearch) {
        topbarSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    // Add your search functionality here
                    console.log('Searching for:', query);
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

    // Homepage fixes for all reported issues
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        console.log('Applying homepage fixes...');

        // Remove promo banner completely
        setTimeout(() => {
            const promoBanner = document.querySelector('.promo-banner');
            if (promoBanner) {
                promoBanner.remove();
                console.log('Promo banner removed');
            }
        }, 100);

        // Fix duplicate "Learn More" buttons more aggressively
        setTimeout(() => {
            const learnMoreButtons = document.querySelectorAll('a[data-builder-link="learn-more"]');
            console.log('Found Learn More buttons:', learnMoreButtons.length);

            if (learnMoreButtons.length > 1) {
                // Remove all but the first one
                for (let i = 1; i < learnMoreButtons.length; i++) {
                    console.log('Removing duplicate Learn More button', i);
                    learnMoreButtons[i].remove();
                }
            }
        }, 500);

        // Force services grid layout fix
        setTimeout(() => {
            const servicesGrids = document.querySelectorAll('.services-grid');
            servicesGrids.forEach(grid => {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
                grid.style.gap = '18px';
                grid.style.marginBottom = '25px';
                console.log('Applied compact layout to services grid');
            });

            // Make service cards more compact
            const serviceCards = document.querySelectorAll('.service-card-enhanced');
            serviceCards.forEach(card => {
                card.style.padding = '16px';
                card.style.maxHeight = '350px';

                const content = card.querySelector('.service-content');
                if (content) {
                    content.style.padding = '12px 16px 16px 16px';
                }

                const title = card.querySelector('h3');
                if (title) {
                    title.style.fontSize = '18px';
                    title.style.marginBottom = '8px';
                }

                const description = card.querySelector('p');
                if (description) {
                    description.style.fontSize = '13px';
                    description.style.lineHeight = '1.4';
                    description.style.marginBottom = '10px';
                }

                const button = card.querySelector('.btn, .service-btn');
                if (button) {
                    button.style.padding = '6px 12px';
                    button.style.fontSize = '13px';
                    button.style.marginTop = '8px';
                }
            });

            console.log('Applied compact styling to service cards');
        }, 800);

        // Fix stats animations
        let statsAnimated = false;

        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }

        function checkStatsVisibility() {
            if (statsAnimated) return;

            const statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;

            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

            if (isVisible) {
                statsAnimated = true;
                console.log('Triggering stats animation');

                const statCards = document.querySelectorAll('.stats-section .stat-card');
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });

                setTimeout(() => {
                    const counters = document.querySelectorAll('.counter[data-target]');
                    console.log('Found counters to animate:', counters.length);
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }, 600);
            }
        }

        window.addEventListener('scroll', checkStatsVisibility);
        setTimeout(checkStatsVisibility, 100);

        // Replace Google Reviews carousel with Elfsight widget
        setTimeout(() => {
            const reviewsContainer = document.querySelector('.reviews-carousel-container');
            if (reviewsContainer) {
                console.log('Replacing Google Reviews carousel with Elfsight widget');

                // Replace entire reviews section with just the Elfsight widget
                reviewsContainer.innerHTML = `
                    <!-- Elfsight Google Reviews | Untitled Google Reviews -->
                    <div class="elfsight-app-0b06184e-88ba-488f-9d5e-789f8787d167" data-elfsight-app-lazy></div>
                `;

                // Also replace the reviews-footer if it exists
                const reviewsFooter = document.querySelector('.reviews-footer');
                if (reviewsFooter) {
                    reviewsFooter.remove();
                }

                // Load Elfsight script if not already loaded
                if (!document.querySelector('script[src*="elfsightcdn.com"]')) {
                    const script = document.createElement('script');
                    script.src = 'https://elfsightcdn.com/platform.js';
                    script.async = true;
                    document.head.appendChild(script);
                    console.log('Elfsight script loaded');
                }

                // Disable existing review carousel
                if (window.initializeReviewsCarousel) {
                    window.initializeReviewsCarousel = function() {
                        console.log('Review carousel disabled - using Elfsight widget');
                    };
                }
            }
        }, 1000);

        console.log('Homepage fixes applied');
    }

    // Initialize cart functionality
    const cartIcon = document.querySelector('a[aria-label="Shopping cart"]');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // Check if cart system exists
            if (window.StayDrippedCart) {
                // Toggle cart display or navigate to checkout
                window.location.href = '/pages/checkout.html';
            } else {
                // Fallback for basic cart functionality
                alert('Cart functionality: Please call (602) 688-9825 to place an order or visit our booking page.');
                window.location.href = '/pages/book-appointment.html';
            }
        });
    }

    // Initialize phone icon functionality
    const phoneIcon = document.querySelector('a[aria-label="Call us"]');
    if (phoneIcon) {
        phoneIcon.addEventListener('click', function(e) {
            // Allow default behavior (tel: link) but also track the click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call_click', {
                    'phone_number': '+1-602-688-9825',
                    'source': 'navigation_icon'
                });
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

    // Initialize cart count on page load
    setTimeout(updateCartCount, 500);

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    // Enhanced dropdown hover management for all dropdowns
    const allDropdowns = document.querySelectorAll('.nav-dropdown');
    allDropdowns.forEach(function(dropdown) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropdownContent) {
            let hideTimeout;

            // Show dropdown on hover
            dropdown.addEventListener('mouseenter', function() {
                // Clear any pending hide timeout
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }

                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.visibility = 'visible';
                }, 10);
            });

            // Hide dropdown when mouse leaves both trigger and content
            function scheduleHide() {
                hideTimeout = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    setTimeout(() => {
                        if (dropdownContent.style.opacity === '0') {
                            dropdownContent.style.display = 'none';
                        }
                    }, 300);
                }, 300);
            }

            function cancelHide() {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
            }

            dropdown.addEventListener('mouseleave', scheduleHide);
            dropdownContent.addEventListener('mouseenter', cancelHide);
            dropdownContent.addEventListener('mouseleave', scheduleHide);
        }
    });

    // Load aggressive services fix script
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        const script = document.createElement('script');
        script.src = 'aggressive-services-fix.js';
        script.onload = () => console.log('Aggressive services fix loaded');
        script.onerror = () => console.log('Failed to load aggressive services fix');
        document.head.appendChild(script);
    }
});
