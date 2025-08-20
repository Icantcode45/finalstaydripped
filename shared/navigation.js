// Mobile Menu Functionality
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

    // Enhanced dropdown hover management for services dropdown
    const servicesDropdown = document.querySelector('.nav-dropdown');
    if (servicesDropdown) {
        const dropdownContent = servicesDropdown.querySelector('.dropdown-content');

        if (dropdownContent) {
            // Show dropdown on hover
            servicesDropdown.addEventListener('mouseenter', function() {
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.visibility = 'visible';
                }, 10);
            });

            // Hide dropdown when mouse leaves both trigger and content
            let hideTimeout;
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

            servicesDropdown.addEventListener('mouseleave', scheduleHide);
            dropdownContent.addEventListener('mouseenter', cancelHide);
            dropdownContent.addEventListener('mouseleave', scheduleHide);
        }
    }

    // Click-based dropdown system for service categories
    const servicesDropdownContent = document.querySelector('.services-dropdown');
    if (servicesDropdownContent) {
        const sections = servicesDropdownContent.querySelectorAll('.dropdown-section');
        let activeSection = null;

        sections.forEach(function(section) {
            const header = section.querySelector('h4');
            const submenu = section.querySelector('.services-horizontal-submenu');

            // Handle both structures: direct links or submenu container
            const links = submenu ?
                submenu.querySelectorAll('a') :
                section.querySelectorAll('a'); // Direct children for inline structure

            if (header) {
                // Add click event to category headers
                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // If this section is already active, close it
                    if (activeSection === section) {
                        hideLinks(section);
                        activeSection = null;
                        header.classList.remove('active');
                        return;
                    }

                    // Hide any currently active section
                    if (activeSection) {
                        hideLinks(activeSection);
                        activeSection.querySelector('h4').classList.remove('active');
                    }

                    // Show this section's links
                    showLinks(section);
                    activeSection = section;
                    header.classList.add('active');
                });

                // Make header look clickable
                header.style.cursor = 'pointer';
            }
        });

        // Helper functions to show/hide links
        function showLinks(section) {
            const submenu = section.querySelector('.services-horizontal-submenu');

            if (submenu) {
                // Shared navigation structure with submenu container
                submenu.style.display = 'block';
                submenu.style.opacity = '0';
                submenu.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    submenu.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                    submenu.style.opacity = '1';
                    submenu.style.transform = 'translateX(0)';
                }, 50);
            } else {
                // Inline navigation structure with direct links
                const links = section.querySelectorAll('a');
                links.forEach(function(link, index) {
                    link.style.display = 'block';
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(-20px)';

                    // Staggered animation
                    setTimeout(() => {
                        link.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                    }, index * 50 + 50);
                });
            }
        }

        function hideLinks(section) {
            const submenu = section.querySelector('.services-horizontal-submenu');

            if (submenu) {
                // Shared navigation structure with submenu container
                submenu.style.transition = 'all 0.2s ease';
                submenu.style.opacity = '0';
                submenu.style.transform = 'translateX(-10px)';

                setTimeout(() => {
                    submenu.style.display = 'none';
                }, 200);
            } else {
                // Inline navigation structure with direct links
                const links = section.querySelectorAll('a');
                links.forEach(function(link) {
                    link.style.transition = 'all 0.2s ease';
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(-10px)';

                    setTimeout(() => {
                        link.style.display = 'none';
                    }, 200);
                });
            }
        }

        // Close active section when clicking outside
        document.addEventListener('click', function(e) {
            if (activeSection && !servicesDropdownContent.contains(e.target)) {
                hideLinks(activeSection);
                activeSection.querySelector('h4').classList.remove('active');
                activeSection = null;
            }
        });

        // Close active section when dropdown closes
        const servicesDropdownContainer = document.querySelector('.nav-dropdown');
        if (servicesDropdownContainer) {
            servicesDropdownContainer.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (activeSection) {
                        hideLinks(activeSection);
                        activeSection.querySelector('h4').classList.remove('active');
                        activeSection = null;
                    }
                }, 500);
            });
        }
    }
});
