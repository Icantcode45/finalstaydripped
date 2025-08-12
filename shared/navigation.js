// Simple working mobile navigation
function toggleMobileNav() {
    const menu = document.getElementById('mobileNavMenu');
    if (menu) {
        if (menu.classList.contains('show')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }
}

function openMobileNav() {
    const menu = document.getElementById('mobileNavMenu');
    if (menu) {
        menu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    const menu = document.getElementById('mobileNavMenu');
    if (menu) {
        menu.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close mobile nav when pressing escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});

console.log('Simple mobile navigation loaded');
