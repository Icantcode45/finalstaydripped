const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Zyte API Integration for dynamic content extraction
const zyteApiKey = '3d9c21c386b64c48b991208269f60348';

async function extractStayDrippedNavigation() {
  try {
    const response = await axios.post(
      "https://api.zyte.com/v1/extract",
      {
        "url": "https://staydrippediv.com/",
        "browserHtml": true,
        "productNavigation": true,
        "productNavigationOptions": {"extractFrom": "browserHtml"}
      },
      {
        auth: { username: zyteApiKey }
      }
    );
    
    return {
      browserHtml: response.data.browserHtml,
      productNavigation: response.data.productNavigation
    };
  } catch (error) {
    console.log('Zyte API extraction failed, using fallback navigation');
    return {
      productNavigation: {
        categoryName: "CLINICALLY PROVEN",
        subCategories: [
          {
            url: "https://staydrippediv.com/sexual-wellness",
            name: "Sexual Wellness",
            metadata: { probability: 0.9939426779747009 }
          },
          {
            url: "https://staydrippediv.com/hormone-therapy", 
            name: "Hormone Therapy",
            metadata: { probability: 0.9934606552124023 }
          },
          {
            url: "https://staydrippediv.com/weight-loss",
            name: "Weight Loss", 
            metadata: { probability: 0.9927549958229065 }
          },
          {
            url: "https://staydrippediv.com/membership/",
            name: "Start Your Treatment",
            metadata: { probability: 0.9498394727706909 }
          },
          {
            url: "https://staydrippediv.com/anti-aging",
            name: "Anti-Aging",
            metadata: { probability: 0.9283528327941895 }
          }
        ]
      }
    };
  }
}

// Cache navigation data
let cachedNavigation = null;
let lastFetch = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function getNavigationData() {
  const now = Date.now();
  if (!cachedNavigation || (now - lastFetch) > CACHE_DURATION) {
    cachedNavigation = await extractStayDrippedNavigation();
    lastFetch = now;
  }
  return cachedNavigation;
}

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'text/plain';
}

const server = http.createServer(async (req, res) => {
  // Handle API endpoint for navigation data
  if (req.method === 'GET' && req.url === '/api/navigation') {
    try {
      const navData = await getNavigationData();
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(navData.productNavigation));
      return;
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch navigation data' }));
      return;
    }
  }

  // Parse URL and remove query parameters
  let urlPath = req.url.split('?')[0];
  
  // Handle root path
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  // Remove leading slash for file path
  let filePath = urlPath.substring(1);
  
  // Security check - prevent directory traversal
  if (filePath.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Try to serve the file
  try {
    const fullPath = path.join(__dirname, filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    // Check if it's a directory
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      // Try to serve index.html from the directory
      const indexPath = path.join(fullPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Directory index not found');
        return;
      }
    }

    // Serve the file
    const contentType = getContentType(fullPath);
    const content = fs.readFileSync(fullPath, contentType.startsWith('text/') ? 'utf8' : null);
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Stay Dripped IV & Wellness Co. - Complete Mobile IV Therapy Website running on http://localhost:${PORT}`);
});
