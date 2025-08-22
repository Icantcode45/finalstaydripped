// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
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

        // Fix duplicate "Learn More" buttons
        setTimeout(() => {
            const learnMoreButtons = document.querySelectorAll('a[data-builder-link="learn-more"]');
            if (learnMoreButtons.length > 1) {
                learnMoreButtons.forEach(btn => {
                    if (btn.classList.contains('btn-small')) {
                        console.log('Removing duplicate Learn More button');
                        btn.remove();
                    }
                });
            }
        }, 500);

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

                const elfsightWidget = document.createElement('div');
                elfsightWidget.innerHTML = `
                    <div style="text-align: center; margin-bottom: 32px;">
                        <h3 style="font-size: 32px; font-weight: 700; color: var(--dark-slate); margin-bottom: 16px;">
                            What Our Clients Say
                        </h3>
                        <p style="font-size: 18px; color: var(--medium-gray); max-width: 600px; margin: 0 auto;">
                            Real reviews from our satisfied clients who've experienced the benefits of our wellness treatments.
                        </p>
                    </div>
                    <div class="elfsight-app-0b06184e-88ba-488f-9d5e-789f8787d167" data-elfsight-app-lazy></div>
                `;

                reviewsContainer.innerHTML = '';
                reviewsContainer.appendChild(elfsightWidget);

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
});
