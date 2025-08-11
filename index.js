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

  // Handle the IV therapy booking page route
  if (req.method === 'GET' && req.url === '/book-ivtherapy') {
    try {
      const bookingPageContent = fs.readFileSync(path.join(__dirname, 'pages', 'book-ivtherapy.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(bookingPageContent);
      return;
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Booking page not found');
      return;
    }
  }

  // Serve the main HTML file for all routes
  if (req.method === 'GET') {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>Stay Dripped IV & Wellness Co. | Mobile IV Therapy Scottsdale</title>
    <meta name="description" content="Professional mobile IV therapy in Scottsdale, AZ. Hydration, vitamin infusions, and wellness treatments delivered to your location by licensed medical professionals.">
    <meta name="robots" content="max-image-preview:large">
    <link rel="canonical" href="https://staydrippediv.com/">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Fad372a4beb4d4d9eae4ad04be4e56deb?format=webp&width=32">
    <link rel="apple-touch-icon" href="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Fad372a4beb4d4d9eae4ad04be4e56deb?format=webp&width=180">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Stay Dripped IV & Wellness Co. | Mobile IV Therapy Scottsdale">
    <meta property="og:description" content="Professional mobile IV therapy in Scottsdale, AZ. Hydration, vitamin infusions, and wellness treatments delivered to your location.">
    <meta property="og:url" content="https://staydrippediv.com/">
    <meta property="og:image" content="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Stay Dripped IV & Wellness Co. | Mobile IV Therapy Scottsdale">
    <meta name="twitter:description" content="Professional mobile IV therapy in Scottsdale, AZ. Hydration, vitamin infusions, and wellness treatments delivered to your location.">
    <meta name="twitter:image" content="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-blue: #0066CC;
            --secondary-teal: #00B8A0;
            --accent-orange: #FF6B35;
            --warm-beige: #F5F1EB;
            --soft-green: #8BC34A;
            --dark-slate: #1A2B3A;
            --light-gray: #F8FAFC;
            --warm-gray: #F7F5F3;
            --medium-gray: #64748B;
            --warm-text: #2D3748;
            --white: #FFFFFF;
            --border-color: #E2E8F0;
            --soft-border: #F0EDE8;
            --font-family: 'Inter', sans-serif;
            --max-width: 1200px;
            --section-padding: 80px 0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-family);
            font-size: 16px;
            line-height: 1.6;
            color: var(--dark-slate);
            background: var(--white);
        }

        .container {
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Top Bar */
        .top-bar {
            background: var(--primary-blue);
            color: var(--white);
            padding: 8px 0;
            font-size: 14px;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1001;
        }

        .top-bar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .location-finder-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--white);
            text-decoration: none;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 0.5px;
            transition: opacity 0.3s ease;
        }

        .location-finder-btn:hover {
            opacity: 0.8;
        }

        .top-bar-right {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .tagline-text {
            font-weight: 600;
            font-size: 13px;
            letter-spacing: 0.5px;
        }

        .top-bar-icons {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .icon-btn {
            background: none;
            border: none;
            color: var(--white);
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: background-color 0.3s ease;
            position: relative;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon-btn:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .cart-count {
            position: absolute;
            top: -2px;
            right: -2px;
            background: var(--accent-orange);
            color: var(--white);
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
        }

        /* Header */
        .header {
            background: var(--white);
            border-bottom: 1px solid var(--border-color);
            position: fixed;
            top: 44px;
            width: 100%;
            z-index: 1000;
            transition: box-shadow 0.3s ease;
        }

        .header.scrolled {
            box-shadow: 0 4px 20px rgba(26, 43, 58, 0.08);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        .logo img {
            height: 42px;
            width: auto;
            max-width: 200px;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 32px;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--dark-slate);
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--primary-blue);
        }

        .btn {
            background: var(--primary-blue);
            color: var(--white);
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn:hover {
            background: #0052A3;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: transparent;
            color: var(--primary-blue);
            border: 2px solid var(--primary-blue);
        }

        .btn-secondary:hover {
            background: var(--primary-blue);
            color: var(--white);
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        /* Hero Section */
        .hero {
            padding: 164px 0 80px;
            background: linear-gradient(135deg, var(--warm-beige) 0%, rgba(0, 184, 160, 0.08) 100%);
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
        }

        .tagline-highlight {
            display: inline-block;
            background: var(--primary-blue);
            color: var(--white);
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 20px;
            text-transform: uppercase;
        }

        .hero-text h1 {
            font-size: clamp(36px, 5vw, 60px);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 24px;
            color: var(--dark-slate);
        }

        .hero-text p {
            font-size: 20px;
            color: var(--medium-gray);
            margin-bottom: 32px;
            line-height: 1.7;
        }

        .hero-cta {
            display: flex;
            gap: 16px;
            margin-bottom: 48px;
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
        }

        .stat-item {
            text-align: center;
            padding: 20px;
            background: var(--white);
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }

        .stat-number {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-blue);
            display: block;
        }

        .stat-label {
            color: var(--medium-gray);
            font-size: 14px;
            margin-top: 4px;
        }

        .hero-image {
            position: relative;
        }

        .hero-image img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(26, 43, 58, 0.15);
        }

        /* Trust Section */
        .trust-section {
            padding: 60px 0;
            background: var(--white);
            border-bottom: 1px solid var(--border-color);
        }

        .trust-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            align-items: center;
        }

        .trust-item {
            text-align: center;
            padding: 20px;
        }

        .trust-icon {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .trust-icon img {
            width: 60px;
            height: 60px;
            object-fit: contain;
            transition: transform 0.3s ease;
        }

        .trust-item:hover .trust-icon img {
            transform: scale(1.1);
        }

        .trust-item h3 {
            font-size: 20px;
            font-weight: 600;
            color: var(--dark-slate);
            margin-bottom: 12px;
        }

        .trust-item p {
            color: var(--medium-gray);
            line-height: 1.6;
            font-size: 15px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .top-bar-right {
                gap: 12px;
            }

            .tagline-text {
                display: none;
            }

            .location-finder-btn {
                font-size: 12px;
            }

            .nav-links {
                display: none;
            }

            .mobile-menu-btn {
                display: block;
            }

            .hero {
                padding: 140px 0 80px;
            }

            .hero-content {
                grid-template-columns: 1fr;
                gap: 40px;
                text-align: center;
            }

            .hero-stats {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .hero-cta {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <a href="#location" class="location-finder-btn">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Fe7cecee1ec3a4073aaabc07c68fe4df3?format=webp&width=800" alt="Location" style="width: 16px; height: 16px;" />
                    FIND A SERVICE LOCATION
                </a>
                <div class="top-bar-right">
                    <span class="tagline-text">MORE THAN WELLNESS</span>
                    <div class="top-bar-icons">
                        <button class="icon-btn search-btn" title="Chat Support">
                            <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Fb887822bbb864f0d9a71c3bf53868eab?format=webp&width=800" alt="Chat" style="width: 20px; height: 20px;" />
                        </button>
                        <a href="mailto:info@staydrippediv.com" class="icon-btn" title="Email Us">
                            <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2F990e393330624b9b99145dd7bb1a1278?format=webp&width=800" alt="Email" style="width: 20px; height: 20px;" />
                        </a>
                        <a href="tel:+1-480-555-3747" class="icon-btn" title="Call Us">
                            <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Ff131a68591e943e39d1306f3fb0c773a?format=webp&width=800" alt="Phone" style="width: 20px; height: 20px;" />
                        </a>
                        <a href="https://Staydripped.intakeq.com/booking?clientArea=1" class="icon-btn" title="Client Portal">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </a>
                        <button class="icon-btn cart-btn" title="Treatment Cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <span class="cart-count">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="logo">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2F868eb06719aa4f289ae6e50e6061ba1e?format=webp&width=800" alt="Stay Dripped IV & Wellness Co." />
            </a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="pages/book-ivtherapy.html">IV Treatments</a></li>
                <li><a href="pages/peptides.html">Peptides</a></li>
                <li><a href="pages/weight-loss.html">Weight Loss</a></li>
                <li><a href="pages/hormone-therapy.html">Hormone Therapy</a></li>
                <li><a href="pages/membership.html">Membership</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="mobile-menu-btn">☰</button>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <span class="tagline-highlight">MORE THAN WELLNESS</span>
                    <h1>Professional Mobile IV Therapy in Scottsdale</h1>
                    <p>At Stay Dripped, we offer diverse wellness services united by a shared goal: better outcomes through more personalized care. No matter your needs, we're here to support your journey with precision medicine and people-first partnership.</p>
                    <div class="hero-cta">
                        <a href="pages/book-ivtherapy.html" class="btn">Book Treatment</a>
                        <a href="#services" class="btn-secondary">Learn More</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">10,000+</span>
                            <span class="stat-label">Treatments Delivered</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">5.0★</span>
                            <span class="stat-label">Client Rating</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">24/7</span>
                            <span class="stat-label">Availability</span>
                        </div>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d" alt="Professional IV Therapy Service" />
                </div>
            </div>
        </div>
    </section>

    <!-- Trust & Quality Section -->
    <section class="trust-section">
        <div class="container">
            <div class="trust-content">
                <div class="trust-item">
                    <div class="trust-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Feb295e2728714bb8b0f6361e148ff41d?format=webp&width=800" alt="Trusted Service" />
                    </div>
                    <h3>Licensed & Insured</h3>
                    <p>Fully licensed medical professionals with comprehensive insurance coverage for your peace of mind.</p>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2F07d1f6cb34f548aa82e4ee354e5fb5f7?format=webp&width=800" alt="Customer Satisfaction" />
                    </div>
                    <h3>100% Satisfaction</h3>
                    <p>Over 10,000 satisfied customers with a 5-star rating. Your wellness is our priority.</p>
                </div>
                <div class="trust-item">
                    <div class="trust-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2F85f8f270cd14469f866585f0976e24d4?format=webp&width=800" alt="Professional Network" />
                    </div>
                    <h3>Professional Network</h3>
                    <p>Connected with leading healthcare providers and wellness professionals across Arizona.</p>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }

  // Handle other request methods
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
