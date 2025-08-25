// Cleanup script to remove old navigation files and fix references
console.log('🧹 Cleaning up old navigation files...');

const filesToRemove = [
    'shared/navigation-backup.html',
    'shared/navigation-backup.js',
    'fix-navigation.js',
    'fix-navigation-duplication.js',
    'navigation-debug.js',
    'aggressive-services-fix.js',
    'promo-fix.js',
    'promo-fix.css',
    'responsive-fix.css',
    'services-emergency-fix.css'
];

const fs = require('fs');

filesToRemove.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`✅ Removed ${file}`);
        } else {
            console.log(`ℹ️  ${file} not found (already removed)`);
        }
    } catch (error) {
        console.error(`❌ Error removing ${file}:`, error.message);
    }
});

console.log('✨ Cleanup completed!');
console.log('\n📋 Navigation System Summary:');
console.log('• Navigation HTML: shared/navigation.html (unified)');
console.log('• Navigation CSS: shared/navigation.css');
console.log('• Navigation JS: shared/navigation.js (clean)');
console.log('• Navigation Loader: shared/navigation-loader-unified.js');
console.log('• Test Page: test-navigation.html');
console.log('\n🎯 All pages should now use the unified navigation system!');
