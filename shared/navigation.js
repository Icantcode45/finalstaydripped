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

    // Enhanced dropdown hover management for better UX
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    let hideTimeouts = new Map();

    dropdowns.forEach(function(dropdown) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropdownContent) {
            // Show dropdown on hover
            dropdown.addEventListener('mouseenter', function() {
                // Clear any pending hide timeout
                if (hideTimeouts.has(dropdown)) {
                    clearTimeout(hideTimeouts.get(dropdown));
                    hideTimeouts.delete(dropdown);
                }

                // Show dropdown immediately
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.visibility = 'visible';
                }, 10);
            });

            // Set timeout to hide dropdown when mouse leaves
            dropdown.addEventListener('mouseleave', function() {
                const timeout = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    setTimeout(() => {
                        if (dropdownContent.style.opacity === '0') {
                            dropdownContent.style.display = 'none';
                        }
                    }, 300);
                    hideTimeouts.delete(dropdown);
                }, 200); // 200ms delay before hiding

                hideTimeouts.set(dropdown, timeout);
            });

            // Cancel hide timeout when hovering over dropdown content
            dropdownContent.addEventListener('mouseenter', function() {
                if (hideTimeouts.has(dropdown)) {
                    clearTimeout(hideTimeouts.get(dropdown));
                    hideTimeouts.delete(dropdown);
                }
            });

            // Set hide timeout when leaving dropdown content
            dropdownContent.addEventListener('mouseleave', function() {
                const timeout = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    setTimeout(() => {
                        if (dropdownContent.style.opacity === '0') {
                            dropdownContent.style.display = 'none';
                        }
                    }, 300);
                    hideTimeouts.delete(dropdown);
                }, 200);

                hideTimeouts.set(dropdown, timeout);
            });
        }
    });

    // Enhanced hover management for services dropdown sections
    const servicesDropdown = document.querySelector('.services-dropdown');
    if (servicesDropdown) {
        const sections = servicesDropdown.querySelectorAll('.dropdown-section');
        let sectionHideTimeouts = new Map();

        sections.forEach(function(section) {
            const links = section.querySelectorAll('a');

            // Show submenu on section hover
            section.addEventListener('mouseenter', function() {
                // Clear any pending hide timeout for this section
                if (sectionHideTimeouts.has(section)) {
                    clearTimeout(sectionHideTimeouts.get(section));
                    sectionHideTimeouts.delete(section);
                }

                // Show links
                links.forEach(function(link) {
                    link.style.display = 'block';
                });
            });

            // Set timeout to hide submenu when mouse leaves section
            section.addEventListener('mouseleave', function(e) {
                // Check if mouse is moving to a submenu link
                const relatedTarget = e.relatedTarget;
                if (relatedTarget && section.contains(relatedTarget)) {
                    return; // Don't hide if moving within the section
                }

                const timeout = setTimeout(() => {
                    links.forEach(function(link) {
                        if (!link.matches(':hover')) {
                            link.style.display = 'none';
                        }
                    });
                    sectionHideTimeouts.delete(section);
                }, 300); // 300ms delay for submenu

                sectionHideTimeouts.set(section, timeout);
            });

            // Keep submenu visible when hovering over links
            links.forEach(function(link) {
                link.addEventListener('mouseenter', function() {
                    if (sectionHideTimeouts.has(section)) {
                        clearTimeout(sectionHideTimeouts.get(section));
                        sectionHideTimeouts.delete(section);
                    }

                    // Ensure all links in this section remain visible
                    links.forEach(function(otherLink) {
                        otherLink.style.display = 'block';
                    });
                });

                link.addEventListener('mouseleave', function(e) {
                    // Only hide if mouse is not over the section
                    const rect = section.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;

                    if (mouseX < rect.left || mouseX > rect.right ||
                        mouseY < rect.top || mouseY > rect.bottom) {

                        const timeout = setTimeout(() => {
                            links.forEach(function(otherLink) {
                                if (!otherLink.matches(':hover') && !section.matches(':hover')) {
                                    otherLink.style.display = 'none';
                                }
                            });
                            sectionHideTimeouts.delete(section);
                        }, 200);

                        sectionHideTimeouts.set(section, timeout);
                    }
                });
            });
        });
    }
});
