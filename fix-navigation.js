// Fix navigation and promo banner issues
document.addEventListener('DOMContentLoaded', function() {
    // Remove duplicate hardcoded navigation if it exists
    const hardcodedNav = document.querySelector('header.header nav.nav');
    if (hardcodedNav && document.getElementById('navigation-placeholder')) {
        // Find the parent header and remove it since we have navigation-placeholder
        const headerElement = hardcodedNav.closest('header.header');
        if (headerElement) {
            console.log('Removing duplicate hardcoded navigation');
            headerElement.remove();
        }
    }
    
    // Fix promo banner positioning
    const promoBanner = document.querySelector('.promo-banner');
    if (promoBanner) {
        // Move promo banner to the very beginning of body
        document.body.insertBefore(promoBanner, document.body.firstChild);
        console.log('Moved promo banner to top of page');
    }
    
    // Ensure hero section has proper padding
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.paddingTop = '40px';
        console.log('Fixed hero section padding');
    }
});
