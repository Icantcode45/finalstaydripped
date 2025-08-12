// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const servicesToggle = document.querySelector('.mobile-services-toggle');
    const servicesDropdown = document.querySelector('.mobile-services-dropdown');
    const body = document.body;

    // Open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        body.style.overflow = 'hidden';
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
        
        // Close services dropdown when menu closes
        servicesDropdown.classList.remove('active');
        servicesToggle.classList.remove('active');
    }

    // Toggle services dropdown
    function toggleServicesDropdown(e) {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');
        servicesToggle.classList.toggle('active');
    }

    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    if (servicesToggle) {
        servicesToggle.addEventListener('click', toggleServicesDropdown);
    }

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on navigation links (except services toggle)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a:not(.mobile-services-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Handle window resize - close mobile menu if window becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});
