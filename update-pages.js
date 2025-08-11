// This is a reference script for updating pages
// It contains the JavaScript needed for each page

// Add this to the head section after the fonts link:
// <link rel="stylesheet" href="../shared/navigation.css">

// Replace existing header with:
// <div id="navigation-placeholder"></div>

// Update main padding from padding-top: 100px to:
// padding-top: 140px; /* Increased for top bar + header */

// Add this JavaScript before the closing </body> tag or in existing script:
const navigationScript = `
// Load shared navigation
async function loadNavigation() {
    try {
        const response = await fetch('../shared/navigation.html');
        const navigationHtml = await response.text();
        document.getElementById('navigation-placeholder').innerHTML = navigationHtml;
        
        // Add search functionality
        const topbarSearch = document.getElementById('topbar-search');
        if (topbarSearch) {
            topbarSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
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
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

function performSearch() {
    const term = document.getElementById('topbar-search')?.value?.toLowerCase();
    if (!term) return;
    
    if (term.includes('iv') || term.includes('hydration') || term.includes('therapy')) {
        window.location.href = '../pages/book-ivtherapy.html';
    } else if (term.includes('peptide') || term.includes('nad')) {
        window.location.href = '../pages/nad-peptides.html';
    } else if (term.includes('weight') || term.includes('loss')) {
        window.location.href = '../pages/weight-loss.html';
    } else if (term.includes('vitamin') || term.includes('injection')) {
        window.location.href = '../pages/vitamin-injections.html';
    } else if (term.includes('appointment') || term.includes('book')) {
        window.location.href = '../pages/book-appointment.html';
    } else if (term.includes('membership')) {
        window.location.href = '../pages/membership.html';
    } else if (term.includes('telehealth')) {
        window.location.href = '../pages/telehealth-services.html';
    } else {
        alert('No results found. Please try a different search term or browse our services.');
    }
}

// Call loadNavigation() in your DOMContentLoaded event listener
`;

console.log('Use this script to update all pages with shared navigation');
