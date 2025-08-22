// Debug navigation loading and ensure supplements tab appears
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation debug script loaded');
    
    // Check if navigation placeholder exists
    const placeholder = document.getElementById('navigation-placeholder');
    console.log('Navigation placeholder found:', !!placeholder);
    
    // Check if hardcoded navigation exists
    const hardcodedNav = document.querySelector('header.header');
    console.log('Hardcoded navigation found:', !!hardcodedNav);
    
    // Force load navigation if needed
    if (placeholder && !placeholder.innerHTML.trim()) {
        console.log('Navigation placeholder is empty, attempting to load...');
        if (window.loadNavigation) {
            window.loadNavigation();
        }
    }
    
    // Check for supplements tab after a short delay
    setTimeout(() => {
        const supplementsTab = document.querySelector('a[href*="supplements"]');
        console.log('Supplements tab found:', !!supplementsTab);
        
        if (!supplementsTab) {
            console.log('Supplements tab missing, this indicates navigation loading issue');
        }
        
        // Log all navigation links for debugging
        const navLinks = document.querySelectorAll('.nav-links a, .nav-link');
        console.log('Found navigation links:', navLinks.length);
        navLinks.forEach(link => {
            console.log('- Nav link:', link.textContent, '|', link.href);
        });
    }, 1000);
});
