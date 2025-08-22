// Fix promo banner overlap by adjusting hero section padding
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.paddingTop = '40px';
    }
});
