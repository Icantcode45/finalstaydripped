const fs = require('fs');

// Read the file
let content = fs.readFileSync('pages/book-ivtherapy.html', 'utf8');

// Define the category mappings by service titles
const categoryMappings = {
    // Basic category
    'Rehydrate IV Drip': 'basic',
    'Rehydrate Plus IV Drip': 'basic',
    
    // Standard category  
    "Jr. Myers' Cocktail IV Drip": 'standard',
    "Myers' Cocktail IV Drip": 'standard',
    "Mega Myers' Cocktail IV Drip": 'standard',
    'The Day After Hangover Relief IV Drip': 'standard',
    
    // Specialty category
    'The "Sun Devil" Energy Booster IV Drip': 'specialty',
    'The "D-Book" Performance Booster IV Drip': 'specialty', 
    'The "Diamond-Back" Immune Booster IV Drip': 'specialty',
    'The "Scottsdale" Beauty IV Bag': 'specialty',
    'The Stress Relief IV Drip': 'specialty',
    'The Mental Clarity IV Drip': 'specialty',
    'The Anti-Inflammatory IV Drip': 'specialty',
    'The Stay Dripped Special IV Drip': 'specialty',
    
    // Premium category
    'The "Gold" Ultimate Hydration & Recovery IV Drip': 'premium',
    'The "Platinum" Ultimate Hydration & Recovery IV Drip': 'premium',
    'The "Arizona" Detox & Cleanse IV Drip': 'premium',
    'Metabolism Booster IV Drip': 'premium',
    
    // NAD category
    'The Basic NAD+ IV Drip': 'nad',
    'The "Fountain of Youth" NAD+ IV Drip': 'nad',
    'The "Diamond" NAD+ IV Drip': 'nad',
    'The "Elite" NAD+ IV Drip': 'nad'
};

// Replace each service card
for (const [title, category] of Object.entries(categoryMappings)) {
    // Find the service card with this title and add data-category
    const regex = new RegExp(`(<div class="service-card card-hover")([^>]*>\\s*(?:<div class="service-badge">[^<]*</div>\\s*)?<h4 class="service-title">${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h4>)`, 'g');
    content = content.replace(regex, `$1 data-category="${category}"$2`);
}

// Write back to file
fs.writeFileSync('pages/book-ivtherapy.html', content);
console.log('Data-category attributes added successfully!');
