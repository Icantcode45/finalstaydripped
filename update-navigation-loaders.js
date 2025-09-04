// Script to update all HTML pages to use unified navigation loader
const fs = require('fs');
const path = require('path');

function updateHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace old navigation loader references
        const oldLoaders = [
            'shared/navigation-loader.js',
            '../shared/navigation-loader.js',
            'shared/navigation-loader-optimized.js',
            '../shared/navigation-loader-optimized.js'
        ];

        oldLoaders.forEach(oldLoader => {
            const oldScript = `<script src="${oldLoader}"></script>`;
            if (content.includes(oldScript)) {
                console.log(`Updating ${filePath}: removing ${oldLoader}`);
                content = content.replace(oldScript, '');
                modified = true;
            }
        });

        // Add unified navigation loader if not present
        const unifiedLoader = '../shared/navigation-loader-unified.js';
        const rootUnifiedLoader = 'shared/navigation-loader-unified.js';
        
        const isInPages = filePath.includes('/pages/');
        const loaderScript = isInPages ? unifiedLoader : rootUnifiedLoader;
        const scriptTag = `<script src="${loaderScript}"></script>`;

        if (!content.includes('navigation-loader-unified.js')) {
            // Add before closing body tag
            if (content.includes('</body>')) {
                console.log(`Adding unified loader to ${filePath}`);
                content = content.replace('</body>', `    ${scriptTag}\n</body>`);
                modified = true;
            }
        }

        // Ensure navigation placeholder exists
        if (!content.includes('navigation-placeholder')) {
            console.log(`Adding navigation placeholder to ${filePath}`);
            const placeholder = '    <div id="navigation-placeholder"></div>\n';
            
            if (content.includes('<body>')) {
                content = content.replace('<body>', `<body>\n${placeholder}`);
                modified = true;
            }
        }

        // Write back if modified
        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Updated ${filePath}`);
        } else {
            console.log(`ℹ️  No changes needed for ${filePath}`);
        }

    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Find all HTML files
function findHtmlFiles(dir) {
    const files = [];
    
    function scanDir(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        items.forEach(item => {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDir(fullPath);
            } else if (item.endsWith('.html')) {
                files.push(fullPath);
            }
        });
    }
    
    scanDir(dir);
    return files;
}

// Main execution
console.log('🚀 Starting navigation loader update...');

const htmlFiles = findHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files`);

htmlFiles.forEach(file => {
    // Skip backup files
    if (file.includes('backup') || file.includes('old') || file.includes('temp')) {
        console.log(`⏭️  Skipping backup file: ${file}`);
        return;
    }
    
    updateHtmlFile(file);
});

console.log('✨ Navigation loader update completed!');
