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
<html dir="ltr" lang="en-US" prefix="og: https://ogp.me/ns#" style="--lqd-mobile-sec-height: 0px; scroll-behavior: smooth;">
<head itemscope="itemscope" itemtype="http://schema.org/WebSite">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Stay Dripped IV & Wellness Co. - #1 Mobile IV Therapy in Scottsdale, AZ">
    
    <title>#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.</title>
    <meta name="description" content="Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!">
    <meta name="robots" content="max-image-preview:large">
    <link rel="canonical" href="https://staydrippediv.com/">
    <meta name="generator" content="Stay Dripped IV & Wellness Co. - Mobile IV Therapy Specialists">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="Stay Dripped IV & Wellness Co. - Mobile IV Therapy & Wellness">
    <meta property="og:type" content="website">
    <meta property="og:title" content="#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.">
    <meta property="og:description" content="Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!">
    <meta property="og:url" content="https://staydrippediv.com/">
    <meta property="og:image" content="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Stay Dripped IV & Wellness Co. - Premium Mobile IV Therapy">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.">
    <meta name="twitter:description" content="Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!">
    <meta name="twitter:image" content="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "@id": "https://staydrippediv.com/#breadcrumblist",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "@id": "https://staydrippediv.com/#listItem",
                        "position": 1,
                        "name": "Home"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": "https://staydrippediv.com/#organization",
                "name": "Stay Dripped IV & Wellness Co.",
                "description": "Mobile IV Therapy & Wellness Delivered, Anytime, Anywhere.",
                "url": "https://staydrippediv.com/",
                "telephone": "+16027610492",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                    "@id": "https://staydrippediv.com/#organizationLogo",
                    "width": 1200,
                    "height": 630
                },
                "image": {
                    "@id": "https://staydrippediv.com/#organizationLogo"
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Scottsdale",
                    "addressRegion": "AZ",
                    "addressCountry": "US"
                },
                "areaServed": {
                    "@type": "Place",
                    "name": "Scottsdale, Arizona"
                },
                "serviceType": ["Mobile IV Therapy", "Hormone Therapy", "Weight Management", "Anti-Aging Treatments"]
            },
            {
                "@type": "WebPage",
                "@id": "https://staydrippediv.com/#webpage",
                "url": "https://staydrippediv.com/",
                "name": "#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.",
                "description": "Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!",
                "inLanguage": "en-US",
                "isPartOf": {
                    "@id": "https://staydrippediv.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://staydrippediv.com/#breadcrumblist"
                },
                "image": {
                    "@type": "ImageObject",
                    "url": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                    "@id": "https://staydrippediv.com/#mainImage",
                    "width": 1200,
                    "height": 630
                },
                "primaryImageOfPage": {
                    "@id": "https://staydrippediv.com/#mainImage"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://staydrippediv.com/#website",
                "url": "https://staydrippediv.com/",
                "name": "Stay Dripped IV & Wellness Co.",
                "description": "Mobile IV Therapy & Wellness Delivered, Anytime, Anywhere.",
                "inLanguage": "en-US",
                "publisher": {
                    "@id": "https://staydrippediv.com/#organization"
                }
            },
            {
                "@type": "MedicalBusiness",
                "@id": "https://staydrippediv.com/#medicalbusiness",
                "name": "Stay Dripped IV & Wellness Co. - Mobile IV Therapy",
                "image": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                "telephone": "+16027610492",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Scottsdale",
                    "addressRegion": "AZ",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 33.5027,
                    "longitude": -111.9261
                },
                "url": "https://staydrippediv.com/",
                "medicalSpecialty": ["IV Therapy", "Hormone Therapy", "Wellness Medicine"],
                "serviceArea": {
                    "@type": "Place",
                    "name": "Scottsdale, Arizona and surrounding areas"
                }
            }
        ]
    }
    </script>
    
    <style>
        /* Enhanced CSS Variable System */
        :root {
            /* Global Color System - Enhanced */
            --e-global-color-primary: #000000;
            --e-global-color-text: #3F4C51;
            --e-global-color-12573a4: #FFFFFF;
            --e-global-color-6e06d90: #000000;
            --e-global-color-e41200d: #F5F7F9;
            --e-global-color-34f92fa: #1A2B3B;
            --e-global-color-ac9db47: #0000000D;
            --e-global-color-f7d3e02: #0D0D0DCC;
            --e-global-color-2584140: #FFFFFF;
            --e-global-color-cbdd3a3: #D4D4D4;
            --e-global-color-a403e49: #171717;
            
            /* Modern Brand Colors */
            --brand-primary: #FF6B6B;
            --brand-secondary: #4ECDC4;
            --brand-accent: #45B7D1;
            --brand-dark: #2C3E50;
            --brand-light: #F8F9FA;

            /* Enhanced Color Palette */
            --elite-gold: #D4AF37;
            --premium-purple: #8B5CF6;
            --luxury-black: #0D0D0D;
            --platinum-silver: #C0C0C0;

            /* Gradient System */
            --gradient-primary: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
            --gradient-secondary: linear-gradient(135deg, #45B7D1 0%, #96CEB4 100%);
            --gradient-dark: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);

            /* Therapy Colors */
            --therapy-energy: #FFD93D;
            --therapy-calm: #6BCF7F;
            --therapy-focus: #4D96FF;
            
            /* Neutral System */
            --white: #ffffff;
            --light-gray: #f8fafc;
            --dark-gray: #1f2937;
            --text-gray: #374151;
            --border-gray: #e5e7eb;
            
            /* Modern Typography Variables */
            --primary-font: "Inter", sans-serif;
            --display-font: "Playfair Display", serif;
            --accent-font: "Space Grotesk", sans-serif;
            --mono-font: "JetBrains Mono", monospace;
            
            /* Container System */
            --container-max-width: 1100px;
            --container-default-padding: 20px;
        }

        /* Device Detection & Optimization Styles */
        .device-mobile { --device-type: mobile; }
        .device-iphone { --device-type: iphone; }
        .device-ipad { --device-type: ipad; }
        .device-tablet { --device-type: tablet; }
        .device-desktop { --device-type: desktop; }

        /* Performance Optimizations by Device */
        .device-mobile, .device-iphone {
            --animation-duration: 0.2s;
            --blur-amount: 8px;
            --shadow-intensity: 0.1;
        }

        .device-ipad, .device-tablet {
            --animation-duration: 0.3s;
            --blur-amount: 12px;
            --shadow-intensity: 0.15;
        }

        .device-desktop {
            --animation-duration: 0.4s;
            --blur-amount: 20px;
            --shadow-intensity: 0.2;
        }

        /* Touch-Optimized Interactions for Mobile Devices */
        .device-mobile .btn, .device-iphone .btn {
            min-height: 48px;
            padding: 12px 24px;
            font-size: 16px;
            transform: none;
            transition: background-color 0.2s ease;
        }

        .device-mobile .btn:active, .device-iphone .btn:active {
            transform: scale(0.98);
            background-color: rgba(0, 0, 0, 0.1);
        }

        /* iPad/Tablet Optimizations */
        .device-ipad .hero-content, .device-tablet .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
        }

        .device-ipad .services-grid, .device-tablet .services-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        /* Desktop Enhancements */
        .device-desktop .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
        }

        .device-desktop .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, var(--shadow-intensity));
        }

        /* Reduced Motion for Performance */
        .device-mobile *, .device-iphone * {
            animation-duration: var(--animation-duration) !important;
            transition-duration: var(--animation-duration) !important;
        }

        /* Font Size Optimizations */
        .device-mobile .modern-hero-title, .device-iphone .modern-hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
        }

        .device-ipad .modern-hero-title, .device-tablet .modern-hero-title {
            font-size: clamp(3rem, 6vw, 5rem);
        }

        .device-desktop .modern-hero-title {
            font-size: clamp(3.5rem, 8vw, 7rem);
        }

        /* Image Loading Optimization */
        .device-mobile img, .device-iphone img {
            loading: lazy;
            decoding: async;
        }

        .device-desktop img {
            loading: eager;
            decoding: sync;
        }

        /* Backdrop Filter Optimization */
        .device-mobile .glass-effect, .device-iphone .glass-effect,
        .device-mobile .service-card, .device-iphone .service-card,
        .device-mobile .location-card, .device-iphone .location-card {
            backdrop-filter: blur(var(--blur-amount));
            -webkit-backdrop-filter: blur(var(--blur-amount));
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--e-global-typography-text-font-family), sans-serif;
            font-size: 17px;
            font-weight: 400;
            line-height: 1.35em;
            letter-spacing: 0.01em;
            color: var(--e-global-color-text);
            background-color: var(--e-global-color-12573a4);
            overflow-x: hidden;
        }

        /* Enhanced Typography System */
        h1, .h1 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: clamp(50px, 6vw, 84px);
            font-weight: 600;
            line-height: 1em;
            letter-spacing: -1.8px;
            margin-bottom: 24px;
        }



        h2, .h2 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: clamp(40px, 5vw, 54px);
            font-weight: 600;
            line-height: 1em;
            letter-spacing: -1px;
            margin-bottom: 20px;
        }

        h3, .h3 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: clamp(24px, 4vw, 32px);
            font-weight: 600;
            line-height: 1.2em;
            margin-bottom: 16px;
        }

        h4, .h4 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: clamp(20px, 3vw, 24px);
            font-weight: 600;
            line-height: 1.3em;
            margin-bottom: 12px;
        }

        h5, .h5 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: 19px;
            font-weight: 600;
            line-height: 1em;
            margin-bottom: 10px;
        }

        h6, .h6 {
            color: var(--e-global-color-6e06d90);
            font-family: var(--e-global-typography-primary-font-family), sans-serif;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4em;
            margin-bottom: 8px;
        }

        /* Enhanced Container System */
        .container {
            max-width: var(--container-max-width);
            margin: 0 auto;
            padding: 0 var(--container-default-padding);
            width: 100%;
        }

        .container-fluid {
            width: 100%;
            padding: 0 var(--container-default-padding);
        }

        /* Bootstrap-inspired Grid System */
        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
        }

        .col, .col-12, .col-md-6, .col-lg-4, .col-lg-6, .col-lg-8 {
            position: relative;
            width: 100%;
            padding: 0 15px;
        }

        .col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .col-lg-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
        .col-lg-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        .col-lg-8 {
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
        }

        /* Enhanced 3D Glassmorphism Header */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            z-index: 1000;
            border-bottom: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .header.scrolled {
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 12px 48px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
            border-bottom-color: rgba(255, 255, 255, 0.25);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }

        .logo {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo img {
            height: 60px;
            width: auto;
            transition: all 0.3s ease;
        }

        .logo:hover img {
            transform: scale(1.05);
        }



        .logo-subtitle {
            font-size: 12px;
            color: var(--text-gray);
            font-weight: 400;
            font-family: var(--e-global-typography-text-font-family), sans-serif;
            margin-left: 8px;
            opacity: 0.8;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 32px;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--text-gray);
            font-weight: 500;
            font-size: 15px;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-links a:not(.client-portal-btn) {
            font-weight: 500;
            font-size: 15px;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--iv-primary);
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-links a:hover {
            color: var(--iv-primary);
        }

        /* Client Portal Glass Button */
        .nav-links .client-portal-btn,
        .client-portal-btn {
            display: inline-flex !important;
            align-items: center;
            gap: 8px;
            padding: 12px 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.18) !important;
            border-radius: 12px !important;
            font-size: 15px !important;
            font-weight: 500 !important;
            text-decoration: none !important;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            background: rgba(255, 255, 255, 0.25) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            color: var(--text-gray) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
            position: relative;
        }

        .nav-links .client-portal-btn:hover,
        .client-portal-btn:hover {
            background: rgba(255, 255, 255, 0.35) !important;
            border-color: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-2px) scale(1.02) !important;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.3) !important;
            color: var(--brand-primary) !important;
        }

        .nav-links .client-portal-btn::after {
            display: none !important;
        }

        /* Navigation Dropdown Styles */
        .nav-dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            position: absolute;
            top: 100%;
            right: 0;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            display: none;
            z-index: 1000;
            margin-top: 8px;
            min-width: 400px;
            padding: 20px;
        }

        .nav-dropdown:hover .dropdown-content {
            display: block;
        }

        .client-portal-dropdown {
            min-width: 400px;
        }

        .dropdown-content a {
            display: block;
            padding: 12px 16px;
            text-decoration: none;
            color: var(--text-gray);
            transition: all 0.3s ease;
        }

        .dropdown-content a:hover {
            background: rgba(255, 255, 255, 0.3);
            color: var(--brand-primary);
        }

        /* Enhanced 3D Glassmorphism Button System */
        .btn, button, input[type="button"], input[type="submit"], .elementor-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 12px;
            font-family: var(--e-global-typography-text-font-family), sans-serif;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.5em;
            letter-spacing: 0.01em;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: var(--dark-gray);
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .btn:hover, button:hover, input[type="button"]:hover, input[type="submit"]:hover, .elementor-button:hover {
            background: rgba(255, 255, 255, 0.35);
            border-color: rgba(255, 255, 255, 0.25);
            transform: translateY(-3px) scale(1.02);
            box-shadow:
                0 12px 48px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* 3D Glassmorphism Button Variants */
        .btn-primary {
            background: linear-gradient(135deg,
                rgba(61, 156, 210, 0.9),
                rgba(29, 78, 216, 0.9));
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            color: var(--white);
            border: 1px solid rgba(61, 156, 210, 0.3);
            box-shadow:
                0 8px 32px rgba(61, 156, 210, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg,
                rgba(29, 78, 216, 0.95),
                rgba(61, 156, 210, 0.95));
            color: var(--white);
            border-color: rgba(29, 78, 216, 0.4);
            box-shadow:
                0 12px 48px rgba(61, 156, 210, 0.5),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: var(--iv-primary);
            border: 2px solid rgba(61, 156, 210, 0.3);
            box-shadow:
                0 4px 20px rgba(61, 156, 210, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
            background: rgba(61, 156, 210, 0.9);
            color: var(--white);
            border-color: rgba(61, 156, 210, 0.6);
            box-shadow:
                0 8px 32px rgba(61, 156, 210, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.2);
        }

        .btn-gradient {
            background: linear-gradient(135deg,
                rgba(16, 185, 129, 0.9),
                rgba(139, 92, 246, 0.9));
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            color: var(--white);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow:
                0 8px 32px rgba(16, 185, 129, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .btn-gradient:hover {
            background: linear-gradient(135deg,
                rgba(139, 92, 246, 0.95),
                rgba(16, 185, 129, 0.95));
            box-shadow:
                0 12px 48px rgba(139, 92, 246, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        /* IV Therapy Specific Button */
        .btn-iv-therapy {
            background: linear-gradient(135deg, var(--iv-primary), var(--primary-emerald));
            color: var(--white);
            border-color: transparent;
            font-weight: 600;
            padding: 14px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 14px 0 rgba(61, 156, 210, 0.3);
        }

        .btn-iv-therapy:hover {
            background: linear-gradient(135deg, var(--primary-emerald), var(--iv-primary));
            transform: translateY(-2px);
            box-shadow: 0 8px 25px 0 rgba(61, 156, 210, 0.4);
        }

        /* Mobile menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: var(--text-gray);
            cursor: pointer;
        }

        .mobile-nav {
            display: none;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: var(--white);
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }

        .mobile-nav ul {
            list-style: none;
            margin-bottom: 20px;
        }

        .mobile-nav li {
            margin-bottom: 15px;
        }

        .mobile-nav a {
            color: var(--text-gray);
            text-decoration: none;
            font-weight: 500;
            display: block;
            padding: 10px 0;
        }

        /* Hero Section with enhanced animations */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg,
                rgba(255, 107, 107, 0.08) 0%,
                rgba(78, 205, 196, 0.08) 35%,
                rgba(69, 183, 209, 0.08) 65%,
                rgba(139, 92, 246, 0.08) 100%);
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            padding-top: 100px;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(61, 156, 210, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(2deg); }
            66% { transform: translateY(10px) rotate(-1deg); }
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        /* Modern Hero Title */
        .modern-hero-title {
            font-family: var(--display-font);
            font-size: clamp(3.5rem, 8vw, 7rem);
            font-weight: 800;
            line-height: 0.9;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.05em;
            margin-bottom: 1rem;
            position: relative;
            text-transform: lowercase;
        }

        .modern-hero-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 2px;
        }

        .hero-tagline {
            font-family: var(--accent-font);
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            font-weight: 500;
            color: var(--brand-dark);
            opacity: 0.8;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 2rem;
        }

        .hero-subtitle {
            font-size: 18px;
            color: var(--text-gray);
            margin-bottom: 32px;
            line-height: 1.7;
            max-width: 500px;
        }

        .hero-cta {
            display: flex;
            gap: 16px;
            margin-bottom: 48px;
            flex-wrap: wrap;
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            margin-top: 48px;
        }

        .stat-item {
            text-align: center;
            padding: 20px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .stat-item:hover {
            transform: translateY(-4px) scale(1.02);
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 12px 48px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .stat-number {
            font-size: 32px;
            font-weight: 800;
            color: var(--iv-primary);
            display: block;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
            font-size: 14px;
            color: var(--text-gray);
            opacity: 0.8;
            margin-top: 8px;
        }

        .hero-visual {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .hero-image {
            width: 100%;
            max-width: 500px;
            height: 600px;
            background: linear-gradient(135deg, var(--iv-primary), var(--primary-blue));
            border-radius: 24px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 24px;
            transition: transform 0.3s ease, filter 0.3s ease;
        }

        .hero-image:hover img {
            transform: scale(1.02);
            filter: brightness(1.1);
        }

        .floating-card {
            position: absolute;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            padding: 20px;
            box-shadow:
                0 10px 40px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            animation: floatCard 6s ease-in-out infinite;
            transition: all 0.3s ease;
        }

        .floating-card:hover {
            background: rgba(255, 255, 255, 0.35);
            transform: scale(1.05);
            box-shadow:
                0 15px 60px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.4);
        }

        /* Stay Dripped IV Bag Styling */
        .main-iv-bag {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 24px;
            transition: all 0.4s ease;
            animation: ivBagFloat 6s ease-in-out infinite;
        }

        .main-iv-bag:hover {
            transform: scale(1.05) rotate(2deg);
            filter: brightness(1.1) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        }

        .floating-iv-bag {
            width: 120px;
            height: auto;
            object-fit: contain;
            transition: all 0.4s ease;
            filter: drop-shadow(0 8px 25px rgba(0, 0, 0, 0.2));
        }

        .floating-iv-bag:hover {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 12px 35px rgba(0, 0, 0, 0.3));
        }

        @keyframes ivBagFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            25% {
                transform: translateY(-10px) rotate(1deg);
            }
            50% {
                transform: translateY(-5px) rotate(0deg);
            }
            75% {
                transform: translateY(-15px) rotate(-1deg);
            }
        }

        .floating-card-3 {
            top: 60%;
            right: -5%;
            animation-delay: 4s;
        }

        .floating-card-1 {
            top: 10%;
            right: -10%;
            animation-delay: 0s;
        }

        .floating-card-2 {
            bottom: 10%;
            left: -10%;
            animation-delay: 2s;
        }

        @keyframes floatCard {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
        }

        /* Enhanced 3D Glassmorphism Search Form */
        .search-section {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            margin: -50px auto 0;
            border-radius: 24px;
            padding: 2rem;
            box-shadow:
                0 20px 80px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
            position: relative;
            z-index: 10;
            max-width: 1000px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .search-section:hover {
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 25px 100px rgba(0, 0, 0, 0.2),
                inset 0 3px 0 rgba(255, 255, 255, 0.4);
            transform: translateY(-2px);
        }

        .search-form {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            align-items: end;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .form-group input,
        .form-group select {
            padding: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 12px;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow:
                0 4px 20px rgba(0, 0, 0, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: rgba(61, 156, 210, 0.4);
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 8px 32px rgba(61, 156, 210, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                0 0 0 3px rgba(61, 156, 210, 0.1);
            transform: translateY(-1px);
        }

        /* Enhanced Service Categories */
        .services-section {
            padding: 120px 0;
            background: var(--light-gray);
        }

        .section-header {
            text-align: center;
            margin-bottom: 80px;
        }

        .section-subtitle {
            font-size: 16px;
            color: var(--iv-primary);
            font-weight: 600;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-title {
            font-family: var(--e-global-typography-primary-font-family);
            font-size: clamp(36px, 5vw, 56px);
            font-weight: 700;
            color: var(--dark-gray);
            margin-bottom: 24px;
            line-height: 1.2;
        }

        .section-description {
            font-size: 18px;
            color: var(--text-gray);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.7;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
            margin-top: 80px;
        }

        .service-card {
            background: var(--white);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--iv-primary), var(--primary-blue));
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }

        .service-card:hover::before {
            transform: scaleX(1);
        }

        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .service-icon {
            font-size: 48px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-left: auto;
            margin-right: auto;
        }

        .service-icon:hover {
            transform: translateY(-4px) scale(1.05);
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 12px 48px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .service-card h3 {
            font-family: var(--e-global-typography-primary-font-family);
            font-size: 28px;
            font-weight: 600;
            color: var(--dark-gray);
            margin-bottom: 12px;
        }

        .service-card .category-subtitle {
            color: var(--iv-primary);
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .service-card p {
            color: var(--text-gray);
            line-height: 1.7;
            margin-bottom: 32px;
        }

        .treatments-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
        }

        .treatment-item {
            background: var(--light-gray);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            cursor: pointer;
        }

        .treatment-item:hover {
            background: var(--iv-primary);
            color: var(--white);
            transform: translateY(-4px);
            border-color: var(--iv-primary);
        }

        .treatment-item h4 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .treatment-item p {
            font-size: 14px;
            opacity: 0.8;
        }



        .shadow-text {
            font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
            font-size: clamp(32px, 6vw, 92px);
            padding: 80px 50px;
            text-align: center;
            text-transform: uppercase;
            text-rendering: optimizeLegibility;
            margin: 0;
            transition: all 0.3s ease;
        }

        .shadow-text:hover {
            transform: scale(1.02);
            cursor: default;
        }

        .shadow-text.elegantshadow {
            color: #131313;
            background-color: #e7e5e4;
            letter-spacing: .15em;
            text-shadow:
                1px -1px 0 #767676,
                -1px 2px 1px #737272,
                -2px 4px 1px #767474,
                -3px 6px 1px #787777,
                -4px 8px 1px #7b7a7a,
                -5px 10px 1px #7f7d7d,
                -6px 12px 1px #828181,
                -7px 14px 1px #868585,
                -8px 16px 1px #8b8a89,
                -9px 18px 1px #8f8e8d,
                -10px 20px 1px #949392,
                -11px 22px 1px #999897,
                -12px 24px 1px #9e9c9c,
                -13px 26px 1px #a3a1a1,
                -14px 28px 1px #a8a6a6,
                -15px 30px 1px #adabab,
                -16px 32px 1px #b2b1b0,
                -17px 34px 1px #b7b6b5,
                -18px 36px 1px #bcbbba,
                -19px 38px 1px #c1bfbf,
                -20px 40px 1px #c6c4c4,
                -21px 42px 1px #cbc9c8,
                -22px 44px 1px #cfcdcd,
                -23px 46px 1px #d4d2d1,
                -24px 48px 1px #d8d6d5,
                -25px 50px 1px #dbdad9,
                -26px 52px 1px #dfdddc,
                -27px 54px 1px #e2e0df,
                -28px 56px 1px #e4e3e2;
        }

        .shadow-text.deepshadow {
            color: #e0dfdc;
            background-color: #333;
            letter-spacing: .1em;
            text-shadow:
                0 -1px 0 #fff,
                0 1px 0 #2e2e2e,
                0 2px 0 #2c2c2c,
                0 3px 0 #2a2a2a,
                0 4px 0 #282828,
                0 5px 0 #262626,
                0 6px 0 #242424,
                0 7px 0 #222,
                0 8px 0 #202020,
                0 9px 0 #1e1e1e,
                0 10px 0 #1c1c1c,
                0 11px 0 #1a1a1a,
                0 12px 0 #181818,
                0 13px 0 #161616,
                0 14px 0 #141414,
                0 15px 0 #121212,
                0 22px 30px rgba(0, 0, 0, 0.9);
        }

        .shadow-text.insetshadow {
            color: #202020;
            background-color: #2d2d2d;
            letter-spacing: .1em;
            text-shadow:
                -1px -1px 1px #111,
                2px 2px 1px #363636;
        }

        .shadow-text.retroshadow {
            color: #2c2c2c;
            background-color: #d5d5d5;
            letter-spacing: .05em;
            text-shadow:
                4px 4px 0px #d5d5d5,
                7px 7px 0px rgba(0, 0, 0, 0.2);
        }



        /* IV Therapy Section */
        .iv-section {
            padding: 120px 0;
            background: linear-gradient(135deg, var(--iv-primary), var(--accent-purple));
            color: var(--white);
            position: relative;
            overflow: hidden;
        }

        .iv-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        }

        .iv-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .iv-content h2 {
            font-family: var(--e-global-typography-primary-font-family);
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.2;
        }

        .iv-features {
            list-style: none;
            margin: 32px 0;
        }

        .iv-features li {
            display: flex;
            align-items: center;
            padding: 12px 0;
            font-size: 16px;
        }

        .iv-features li::before {
            content: "💉";
            margin-right: 12px;
            font-size: 20px;
        }

        /* Enhanced effect descriptions */
        .effect-description {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            margin: 30px;
            border-radius: 15px;
            color: white;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .effect-description h3 {
            margin-bottom: 15px;
            font-size: 1.5rem;
            color: #fff;
        }

        .effect-description p {
            font-size: 1.1rem;
            line-height: 1.6;
            opacity: 0.9;
        }

        /* Location Section */
        .location-section {
            padding: 120px 0;
            background: var(--white);
        }

        .location-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: start;
            margin-top: 60px;
        }

        .location-info {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        .location-card {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .location-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .location-card h3 {
            color: var(--brand-primary);
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .location-card ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .location-card li {
            padding: 8px 0;
            color: var(--text-gray);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            transition: color 0.3s ease;
        }

        .location-card li:last-child {
            border-bottom: none;
        }

        .location-card li:hover {
            color: var(--brand-primary);
        }

        .map-container {
            position: relative;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Team Carousel Section with 3D Glassmorphism */
        .team-section {
            padding: 120px 0;
            background: linear-gradient(135deg, var(--light-gray) 0%, rgba(245, 247, 249, 0.9) 100%);
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }

        .about-title {
            font-size: clamp(4rem, 8vw, 7.5rem);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            white-space: nowrap;
            font-family: var(--e-global-typography-primary-font-family);
            background: linear-gradient(
                to bottom,
                rgba(61, 156, 210, 0.35) 30%,
                rgba(255, 255, 255, 0) 76%
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .carousel-container {
            width: 100%;
            max-width: 1200px;
            height: 450px;
            position: relative;
            perspective: 1000px;
            margin: 80px auto 0;
        }

        .carousel-track {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card {
            position: absolute;
            width: 280px;
            height: 380px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 24px;
            overflow: hidden;
            box-shadow:
                0 20px 60px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: pointer;
        }

        .card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-radius: 24px;
        }

        .card.center {
            z-index: 10;
            transform: scale(1.1) translateZ(0);
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 25px 80px rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .card.center img {
            filter: none;
        }

        .card.left-2 {
            z-index: 1;
            transform: translateX(-400px) scale(0.8) translateZ(-300px);
            opacity: 0.7;
        }

        .card.left-2 img {
            filter: grayscale(100%);
        }

        .card.left-1 {
            z-index: 5;
            transform: translateX(-200px) scale(0.9) translateZ(-100px);
            opacity: 0.9;
        }

        .card.left-1 img {
            filter: grayscale(50%);
        }

        .card.right-1 {
            z-index: 5;
            transform: translateX(200px) scale(0.9) translateZ(-100px);
            opacity: 0.9;
        }

        .card.right-1 img {
            filter: grayscale(50%);
        }

        .card.right-2 {
            z-index: 1;
            transform: translateX(400px) scale(0.8) translateZ(-300px);
            opacity: 0.7;
        }

        .card.right-2 img {
            filter: grayscale(100%);
        }

        .card.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .member-info {
            text-align: center;
            margin-top: 40px;
            transition: all 0.5s ease-out;
        }

        .member-name {
            color: var(--iv-primary);
            font-size: clamp(2rem, 4vw, 2.5rem);
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
            font-family: var(--e-global-typography-primary-font-family);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .member-name::before,
        .member-name::after {
            content: "";
            position: absolute;
            top: 100%;
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, var(--iv-primary), var(--primary-blue));
            border-radius: 2px;
        }

        .member-name::before {
            left: -100px;
        }

        .member-name::after {
            right: -100px;
        }

        .member-role {
            color: var(--text-gray);
            font-size: clamp(1.2rem, 2.5vw, 1.5rem);
            font-weight: 500;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 10px 0;
            margin-top: -15px;
            position: relative;
            font-family: var(--e-global-typography-accent-font-family);
        }

        .dots {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 60px;
        }

        .dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: rgba(61, 156, 210, 0.25);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .dot.active {
            background: var(--iv-primary);
            transform: scale(1.3);
            box-shadow:
                0 4px 20px rgba(61, 156, 210, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(61, 156, 210, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            color: var(--iv-primary);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 20;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-size: 1.8rem;
            font-weight: 600;
            outline: none;
            padding-bottom: 4px;
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .nav-arrow:hover {
            background: rgba(61, 156, 210, 0.9);
            color: var(--white);
            transform: translateY(-50%) scale(1.1);
            box-shadow:
                0 12px 48px rgba(61, 156, 210, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        .nav-arrow.left {
            left: 20px;
            padding-right: 3px;
        }

        .nav-arrow.right {
            right: 20px;
            padding-left: 3px;
        }

        /* Stay Dripped Vitamin Vials Showcase */
        .iv-therapy-showcase {
            position: relative;
            border-radius: 24px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

        .vitamin-vials {
            width: 100%;
            height: auto;
            object-fit: contain;
            transition: all 0.4s ease;
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
        }

        .vitamin-vials:hover {
            transform: scale(1.02);
            filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.3));
        }

        .vials-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            pointer-events: none;
        }

        .vial-highlight {
            position: relative;
            padding: 8px 12px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
            pointer-events: auto;
            cursor: pointer;
            font-family: "Trebuchet MS", sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .vial-highlight:hover {
            background: rgba(61, 156, 210, 0.9);
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 8px 25px rgba(61, 156, 210, 0.4);
        }

        .iv-therapy-showcase:hover .vial-highlight {
            opacity: 1;
            transform: translateY(0);
        }

        .vial-1 { animation-delay: 0.1s; }
        .vial-2 { animation-delay: 0.2s; }
        .vial-3 { animation-delay: 0.3s; }
        .vial-4 { animation-delay: 0.4s; }

        /* Enhanced IV Section Image Effects */
        .scroll-animate:hover img {
            transform: scale(1.05);
        }

        .scroll-animate:hover .image-overlay {
            opacity: 1;
        }

        /* Footer */
        .footer {
            background: var(--dark-gray);
            color: var(--white);
            padding: 80px 0 32px 0;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 60px;
            margin-bottom: 48px;
        }

        .footer h4 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 24px;
            color: var(--primary-emerald-light);
        }

        .footer ul {
            list-style: none;
        }

        .footer li {
            margin-bottom: 12px;
        }

        .footer a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .footer a:hover {
            color: var(--primary-emerald-light);
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 32px;
            text-align: center;
            opacity: 0.6;
        }

        /* Modal styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 24px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow:
                0 20px 80px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }

        /* Enhanced modal for service bookings */
        .service-booking-modal .modal {
            max-width: 900px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 2rem;
        }

        /* Enhanced modal for client portal */
        #clientPortalModal .modal {
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 2.5rem;
        }

        /* Custom scrollbar for modals */
        .service-booking-modal .modal::-webkit-scrollbar,
        #clientPortalModal .modal::-webkit-scrollbar {
            width: 8px;
        }

        .service-booking-modal .modal::-webkit-scrollbar-track,
        #clientPortalModal .modal::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        .service-booking-modal .modal::-webkit-scrollbar-thumb,
        #clientPortalModal .modal::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }

        .service-booking-modal .modal::-webkit-scrollbar-thumb:hover,
        #clientPortalModal .modal::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }

        .modal-overlay.active .modal {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.8);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: rgba(255, 255, 255, 1);
            color: #333;
            transform: scale(1.1);
        }

        .modal h2 {
            margin-bottom: 1.5rem;
            color: var(--dark-gray);
            text-align: center;
        }

        .modal .form-group {
            margin-bottom: 1rem;
        }

        .modal input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
        }

        .modal input:focus {
            border-color: var(--iv-primary);
            outline: none;
        }

        /* Service booking widget styling */
        .booking-widget-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 20px;
            margin-top: 16px;
            min-height: 400px;
        }

        .hidden {
            display: none;
        }

        .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            text-align: center;
        }

        /* Dynamic Navigation Dropdown Styles */
        .nav-dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-trigger {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--white);
            min-width: 200px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 12px 0;
            z-index: 1000;
            border: 1px solid var(--border-gray);
        }

        .dropdown-content a {
            display: block;
            padding: 8px 16px;
            color: var(--text-gray);
            text-decoration: none;
            transition: all 0.2s ease;
            font-size: 14px;
        }

        .dropdown-content a:hover {
            background: var(--light-gray);
            color: var(--iv-primary);
        }

        .nav-dropdown:hover .dropdown-content {
            display: block;
        }

        /* Dynamic Treatment Grid Enhancements */
        .dynamic-treatment {
            border: 2px solid transparent;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .dynamic-treatment:hover {
            border-color: var(--iv-primary);
            transform: translateY(-2px);
        }

        .confidence-indicator {
            background: rgba(61, 156, 210, 0.1);
            border-radius: 4px;
            padding: 2px 6px;
            display: inline-block;
            font-size: 10px;
            opacity: 0.7;
            margin-top: 5px;
        }

        /* Enhanced Service Cards with Glassmorphism */
        .service-card-enhanced {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .service-card-enhanced:hover {
            transform: translateY(-12px) scale(1.02);
            background: rgba(255, 255, 255, 0.35);
            box-shadow:
                0 20px 80px rgba(0, 0, 0, 0.15),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                0 0 0 1px rgba(61, 156, 210, 0.2);
        }

        /* Hover Card Items Integration */
        .hover-card-item {
            position: relative;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            perspective: 400px;
            cursor: pointer;
            overflow: hidden;
        }

        .hover-card-item .card-face {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            height: 80px;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, var(--iv-primary), var(--primary-blue));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hover-card-item .card-info {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 20px;
            background: linear-gradient(135deg, var(--iv-primary), var(--primary-blue));
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            transform: rotateX(90deg);
            transform-origin: bottom;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .hover-card-item .card-info h4 {
            color: white;
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 600;
        }

        .hover-card-item .card-info p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
        }

        .hover-card-item:hover .card-info {
            transform: rotateX(0deg);
            opacity: 1;
        }

        .hover-card-item:hover .card-face {
            transform: rotateX(-90deg);
            opacity: 0;
        }

        /* Hover Treatment Grid */
        .hover-treatment-grid {
            gap: 15px;
        }

        .hover-treatment-grid .hover-card-item {
            min-height: 140px;
            border-radius: 16px;
            box-shadow:
                0 4px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .hover-treatment-grid .hover-card-item:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow:
                0 10px 40px rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.5);
        }

        /* Enhanced Section Titles with Shadow Effects */
        .section-title.shadow-text {
            background: linear-gradient(135deg, var(--dark-gray), var(--iv-primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-rendering: optimizeLegibility;
        }

        /* IV Section Enhanced with Deep Shadow */
        .iv-section .shadow-text.deepshadow {
            color: rgba(255, 255, 255, 0.95);
            background: transparent;
            font-family: var(--e-global-typography-primary-font-family);
            font-size: clamp(32px, 5vw, 48px);
            letter-spacing: 0.05em;
            text-shadow:
                0 -1px 0 rgba(255, 255, 255, 0.8),
                0 1px 0 rgba(0, 0, 0, 0.3),
                0 2px 0 rgba(0, 0, 0, 0.25),
                0 3px 0 rgba(0, 0, 0, 0.2),
                0 4px 0 rgba(0, 0, 0, 0.15),
                0 5px 0 rgba(0, 0, 0, 0.1),
                0 6px 0 rgba(0, 0, 0, 0.05),
                0 12px 30px rgba(0, 0, 0, 0.4);
        }

        /* Glassmorphism Buttons Enhancement */
        .btn-iv-therapy {
            background: linear-gradient(135deg,
                rgba(61, 156, 210, 0.9),
                rgba(16, 185, 129, 0.9));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow:
                0 8px 32px rgba(61, 156, 210, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        .btn-iv-therapy::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent);
            transform: rotate(45deg);
            transition: all 0.6s ease;
            opacity: 0;
        }

        .btn-iv-therapy:hover::before {
            animation: shine 0.6s ease-in-out;
        }

        @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
        }
        .btn-iv-therapy:hover {
            background: linear-gradient(135deg,
                rgba(16, 185, 129, 0.9),
                rgba(61, 156, 210, 0.9));
            transform: translateY(-2px) scale(1.02);
            box-shadow:
                0 12px 48px rgba(61, 156, 210, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        /* Animation Classes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }

        .scroll-animate.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Booking Portal Styles */
        .booking-portal-section {
            position: relative;
            overflow: hidden;
        }

        .booking-portal-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 15% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 85% 75%, rgba(78, 205, 196, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }

        .booking-categories-grid .booking-category-card {
            position: relative;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .booking-categories-grid .booking-category-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow:
                0 25px 100px rgba(0, 0, 0, 0.15),
                inset 0 3px 0 rgba(255, 255, 255, 0.4);
        }

        .booking-categories-grid .booking-category-card h3 {
            background: linear-gradient(135deg, var(--brand-primary), var(--brand-accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }

        /* Enhanced Responsive Design System */
        @media (max-width: 1024px) {
            .container {
                max-width: 1024px;
                padding: 0 20px;
            }

            .hero-content {
                grid-template-columns: 1fr;
                gap: 60px;
                text-align: center;
            }

            .hero-stats {
                justify-content: center;
            }

            .iv-content {
                grid-template-columns: 1fr;
                gap: 60px;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }

            .col-md-6, .col-lg-4, .col-lg-6, .col-lg-8 {
                flex: 0 0 100%;
                max-width: 100%;
                margin-bottom: 30px;
            }

            .hover-grid li {
                width: 150px;
                height: 150px;
            }
            
            .hover-grid li a {
                font-size: 35px;
                line-height: 150px;
            }
            
            .icon {
                width: 12em;
                height: 12em;
            }

            /* Button adjustments */
            .btn, button, input[type="button"], input[type="submit"] {
                font-size: 15px;
                padding: 10px 14px;
            }
        }

        @media (max-width: 767px) {
            .container {
                max-width: 767px;
                padding: 0 15px;
            }

            .nav-links {
                display: none;
            }

            .mobile-menu-toggle {
                display: block;
            }

            .hero {
                min-height: 80vh;
                padding-top: 80px;
            }

            /* Mobile Typography */
            h1, .h1 {
                font-size: 50px;
                letter-spacing: -1px;
            }

            h2, .h2 {
                font-size: 40px;
                letter-spacing: -0.5px;
            }

            .hero-cta {
                justify-content: center;
                flex-direction: column;
                gap: 12px;
            }

            .hero-stats {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .floating-card {
                display: none;
            }

            .services-grid {
                gap: 20px;
                margin-top: 40px;
            }

            .service-card {
                padding: 24px;
            }

            .treatments-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            .footer-content {
                grid-template-columns: 1fr;
                gap: 40px;
                text-align: center;
            }

            .section-header {
                margin-bottom: 40px;
            }

            .services-section,
            .iv-section,
            .shadow-showcase,
            .interactive-section,
            .icon-section {
                padding: 60px 0;
            }

            .shadow-text {
                font-size: 28px;
                padding: 30px 15px;
            }

            .search-form {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            /* Mobile Button Adjustments */
            .btn, button, input[type="button"], input[type="submit"] {
                width: 100%;
                justify-content: center;
                font-size: 16px;
                padding: 12px 16px;
            }

            .btn-iv-therapy {
                padding: 16px 20px;
                font-size: 17px;
            }

            /* Mobile-specific IV Therapy Enhancements */
            .iv-features li {
                font-size: 15px;
                padding: 8px 0;
            }

            .treatment-item {
                padding: 20px;
                margin-bottom: 15px;
            }

            /* Mobile Team Carousel */
            .about-title {
                font-size: 3.5rem;
                top: 40px;
            }

            .carousel-container {
                height: 350px;
                margin-top: 60px;
            }

            .card {
                width: 200px;
                height: 280px;
            }

            .card.left-2 {
                transform: translateX(-280px) scale(0.7) translateZ(-300px);
            }

            .card.left-1 {
                transform: translateX(-140px) scale(0.85) translateZ(-100px);
            }

            .card.right-1 {
                transform: translateX(140px) scale(0.85) translateZ(-100px);
            }

            .card.right-2 {
                transform: translateX(280px) scale(0.7) translateZ(-300px);
            }

            .member-name::before,
            .member-name::after {
                width: 50px;
            }

            .member-name::before {
                left: -70px;
            }

            .member-name::after {
                right: -70px;
            }

            .nav-arrow {
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
            }

            .nav-arrow.left {
                left: 10px;
            }

            .nav-arrow.right {
                right: 10px;
            }

            /* Location Section Mobile */
            .location-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }

            .location-card {
                padding: 20px;
            }

            .map-container {
                padding: 15px;
            }

            .map-container iframe {
                height: 350px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="logo">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Ff74b8d31183c4e73ad423862ef65b827?format=webp&width=800" alt="Stay Dripped IV & Wellness Co." />
            </a>
            <ul class="nav-links" id="mainNavLinks">
                <li><a href="/">Home</a></li>
                <li><a href="#advanced-therapies">Advanced Therapies</a></li>
                <li><a href="/book-ivtherapy">Cocktail Menu</a></li>
                <li><a href="#location">Service Area</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="nav-dropdown">
                    <button class="btn btn-primary dropdown-trigger" onclick="toggleClientPortal()">👤 Client Portal</button>
                    <div class="dropdown-content client-portal-dropdown" id="clientPortalDropdown" style="display: none;">
                        <div style="padding: 24px; min-width: 400px; max-width: 500px;">
                            <h4 style="margin-bottom: 16px; color: var(--brand-dark); text-align: center;">Access Your Portal</h4>
                            <div style="background: rgba(255, 255, 255, 0.95); border-radius: 12px; padding: 20px; border: 2px solid rgba(44, 62, 80, 0.2); backdrop-filter: blur(20px);">
                                <script>
                                (function (c) {
                                    if (window.intakeqClientPortal) return;
                                    window.intakeq = "68460f36bc104b6aa9da43e0";
                                    window.intakeqClientArea = true;
                                    window.intakeqClientPortal = true;

                                    var i = c.createElement("script");
                                    i.type = "text/javascript";
                                    i.async = true;
                                    i.src = "https://intakeq.com/js/widget.min.js?v=" + Date.now();
                                    document.head.appendChild(i);
                                })(document);
                                </script>
                                <div id="intakeq-nav-client-portal" style="min-height: 300px; width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="mobile-menu-toggle" onclick="toggleMenu()">☰</button>
        </nav>
        <div class="mobile-nav" id="mobileNav">
            <ul>
                <li><a href="#advanced-therapies" onclick="scrollToSection('advanced-therapies'); toggleMenu();">Advanced Therapies</a></li>
                <li><a href="/book-ivtherapy" onclick="toggleMenu();">Cocktail Menu</a></li>
                <li><a href="#location" onclick="scrollToSection('location'); toggleMenu();">Service Area</a></li>
                <li><a href="#team" onclick="scrollToSection('team'); toggleMenu();">Our Team</a></li>
                <li><a href="#contact" onclick="scrollToSection('contact'); toggleMenu();">Contact</a></li>
                <li><a href="#" onclick="window.open('https://Staydripped.intakeq.com/booking?clientArea=1', '_blank'); toggleMenu();">Client Portal</a></li>
            </ul>
            <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                <button class="btn btn-secondary" onclick="showLogin(); toggleMenu();">Login</button>
                <button class="btn btn-primary" onclick="showSignup(); toggleMenu();">Sign Up</button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text fade-in-up">
                    <h1 class="modern-hero-title">Stay Dripped<sup style="font-size: 0.4em;">®</sup> Wellness</h1>
                    <div class="hero-tagline">Advanced Wellness Solutions at Your Doorstep</div>
                    <p class="hero-subtitle">
                        Revolutionary mobile wellness therapies combining cutting-edge medical treatments with premium IV therapy. Transform your health with our personalized approach to optimal vitality and performance.
                    </p>
                    <div class="hero-cta">
                        <a href="/book-ivtherapy" class="btn btn-iv-therapy">Start Your Wellness Journey</a>
                        <a href="#advanced-therapies" class="btn btn-secondary">Explore Treatments</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">10k+</span>
                            <span class="stat-label">IV Treatments Delivered</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">5.0/5.0</span>
                            <span class="stat-label">Star Reviews</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">Same Day</span>
                            <span class="stat-label">Service Available</span>
                        </div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-image">
                        <img src="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d" alt="Stay Dripped IV & Wellness Co. - Premium Wellness Services" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px;">
                    </div>
                    <div class="floating-card floating-card-1">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 12px; height: 12px; background: var(--iv-success); border-radius: 50%;"></div>
                            <span style="font-size: 14px; font-weight: 600;">Same-Day Service</span>
                        </div>
                    </div>
                    <div class="floating-card floating-card-2">
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: 700; color: var(--iv-primary);">Scottsdale</div>
                            <div style="font-size: 12px; opacity: 0.7;">Service Area</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- IV Therapy Booking Form -->
        <div class="container">
            <div class="search-section">
                <div class="search-form">
                    <div class="form-group">
                        <label for="service-location">
                            Service Location in Scottsdale
                        </label>
                        <input type="text" id="service-location" placeholder="Enter your Scottsdale, AZ address" required>
                    </div>
                    <div class="form-group">
                        <label for="service-date">
                            Preferred Date
                        </label>
                        <input type="date" id="service-date">
                    </div>
                    <div class="form-group">
                        <label for="service-time">
                            Preferred Time
                        </label>
                        <select id="service-time">
                            <option value="">Select Time</option>
                            <option value="morning">Morning (8AM-12PM)</option>
                            <option value="afternoon">Afternoon (12PM-5PM)</option>
                            <option value="evening">Evening (5PM-8PM)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="iv-type-search">IV Therapy Type</label>
                        <select id="iv-type-search">
                            <option value="all">All IV Treatments</option>
                            <option value="hydration">Hydration Boost - $150</option>
                            <option value="energy">Energy & B-Complex - $175</option>
                            <option value="immunity">Immunity Support - $200</option>
                            <option value="hangover">Hangover Recovery - $180</option>
                            <option value="beauty">Beauty & Glow - $220</option>
                            <option value="athletic">Athletic Performance - $250</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-iv-therapy" onclick="bookService()" style="width: 100%; margin-top: 1.5rem;">
                            Book Mobile IV Therapy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Comprehensive Booking Portal -->
    <section id="booking-portal" class="booking-portal-section" style="padding: 120px 0; background: linear-gradient(135deg, var(--brand-light) 0%, rgba(78, 205, 196, 0.1) 100%);">
        <div class="container">
            <div class="section-header scroll-animate">
                <div class="section-subtitle">Book Your Treatment</div>
                <h2 class="section-title">Comprehensive Wellness Booking Portal</h2>
                <p class="section-description">
                    Choose from our complete range of wellness treatments and book your appointment instantly through our advanced booking system.
                </p>
            </div>

            <div class="booking-categories-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px; margin-top: 80px;">

                <!-- Basic IV Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--brand-primary); margin-bottom: 16px;">Basic IV Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Essential hydration and vitamin infusions for everyday wellness and recovery.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(255, 107, 107, 0.3);">
                        <h4 style="color: var(--brand-primary); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">💧 Rehydrate IV Drip - Basic hydration boost</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">⚡ Jr. Myers' Cocktail - Essential vitamins</li>
                            <li style="padding: 8px 0;">🔋 Rehydrate Plus - Enhanced electrolytes</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Basic IV Therapy</a>
                </div>

                <!-- Standard IV Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--brand-secondary); margin-bottom: 16px;">Standard IV Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Enhanced formulations with specialized vitamin blends for targeted wellness goals.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(78, 205, 196, 0.3);">
                        <h4 style="color: var(--brand-secondary); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🌟 Myers' Cocktail - Complete vitamin blend</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🚀 Mega Myers' - Enhanced potency formula</li>
                            <li style="padding: 8px 0;">🍃 The Day After - Hangover relief</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Standard IV Therapy</a>
                </div>

                <!-- Premium IV Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--therapy-energy); margin-bottom: 16px;">Premium IV Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Elite wellness protocols with premium ingredients and personalized formulations.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(255, 215, 61, 0.3);">
                        <h4 style="color: var(--therapy-energy); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🥇 The "Gold" Ultimate Recovery</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">💎 The "Platinum" Premium Formula</li>
                            <li style="padding: 8px 0;">🌵 The "Arizona" Detox & Cleanse</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Premium IV Therapy</a>
                </div>

                <!-- Specialty IV Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--brand-accent); margin-bottom: 16px;">Specialty IV Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Advanced therapeutic formulations for specific health conditions and performance optimization.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(69, 183, 209, 0.3);">
                        <h4 style="color: var(--brand-accent); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">☀️ The "Sun Devil" Energy Booster</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🏀 The "D-Book" Performance</li>
                            <li style="padding: 8px 0;">🐍 The "Diamond-Back" Immune Boost</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Specialty IV Therapy</a>
                </div>

                <!-- NAD+ IV Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--therapy-focus); margin-bottom: 16px;">NAD+ IV Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Revolutionary anti-aging and cellular regeneration therapy for optimal longevity.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(77, 150, 255, 0.3);">
                        <h4 style="color: var(--therapy-focus); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🧬 The Basic NAD+ IV Drip</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">⛲ The "Fountain of Youth" NAD+</li>
                            <li style="padding: 8px 0;">💎 The "Diamond" NAD+ Formula</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book NAD+ Therapy</a>
                </div>

                <!-- Vitamin Injection Shots -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <div style="display: flex; align-items: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 300px;">
                            <h3 style="color: var(--brand-primary); margin-bottom: 16px;">Vitamin Injection Shots</h3>
                            <p style="margin-bottom: 24px; opacity: 0.8;">Quick and effective vitamin injections for immediate energy and wellness benefits.</p>
                        </div>
                        <div style="flex-shrink: 0;">
                            <img src="https://cdn.builder.io/api/v1/image/assets%2F1268a8aa36364ef795a07a801a639f41%2Fc446a3c079eb41d1b8d2348b17a3f507?format=webp&width=800" alt="Vitamin Injection Vials" style="width: 200px; height: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);" />
                        </div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(255, 107, 107, 0.3);">
                        <h4 style="color: var(--brand-primary); margin-bottom: 12px; font-size: 18px;">Featured Treatments:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">��� B12 Energy Shot</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">📦 B12 Power Pack Bundle</li>
                            <li style="padding: 8px 0;">🎯 Wellness Shot Bundle</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Vitamin Shots</a>
                </div>

                <!-- Membership Plans -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--therapy-calm); margin-bottom: 16px;">Membership Plans</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Exclusive membership packages with significant savings and priority scheduling.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(107, 207, 127, 0.3);">
                        <h4 style="color: var(--therapy-calm); margin-bottom: 12px; font-size: 18px;">Featured Plans:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🎫 Monthly Shot Pass</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">🌟 Wellness Explorer</li>
                            <li style="padding: 8px 0;">👑 Wellness Platinum</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">View Membership Plans</a>
                </div>

                <!-- Peptide Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--brand-accent); margin-bottom: 16px;">Peptide Therapy Treatments</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Advanced peptide protocols for anti-aging, recovery, and performance enhancement.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(69, 183, 209, 0.3);">
                        <h4 style="color: var(--brand-accent); margin-bottom: 12px; font-size: 18px;">Advanced Therapies:</h4>
                        <p style="margin: 0; padding: 12px 0; font-style: italic; color: #666;">Cutting-edge peptide treatments for cellular regeneration, muscle recovery, and anti-aging optimization.</p>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Peptide Therapy</a>
                </div>

                <!-- Weight Management -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--therapy-energy); margin-bottom: 16px;">Weight Management Therapy</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Comprehensive weight management programs with medical-grade treatments and ongoing support.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(255, 215, 61, 0.3);">
                        <h4 style="color: var(--therapy-energy); margin-bottom: 12px; font-size: 18px;">Program Includes:</h4>
                        <ul style="list-style: none; margin: 0; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">⚖️ Metabolism Booster IV Drip</li>
                            <li style="padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">📊 Comprehensive metabolic analysis</li>
                            <li style="padding: 8px 0;">🎯 Personalized nutrition guidance</li>
                        </ul>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Weight Management</a>
                </div>

                <!-- Hormone Replacement Therapy -->
                <div class="booking-category-card service-card-enhanced" style="padding: 40px; border-radius: 24px;">
                    <h3 style="color: var(--therapy-focus); margin-bottom: 16px;">Hormone Replacement Therapy</h3>
                    <p style="margin-bottom: 24px; opacity: 0.8;">Personalized hormone optimization therapy for enhanced vitality and well-being.</p>
                    <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(77, 150, 255, 0.3);">
                        <h4 style="color: var(--therapy-focus); margin-bottom: 12px; font-size: 18px;">Comprehensive Care:</h4>
                        <p style="margin: 0; padding: 12px 0; font-style: italic; color: #666;">Bioidentical hormone therapy with continuous monitoring and personalized optimization protocols.</p>
                    </div>
                    <a href="/book-ivtherapy" class="btn btn-iv-therapy" style="width: 100%; text-align: center; justify-content: center;">Book Hormone Therapy</a>
                </div>



            </div>


        </div>
    </section>
    <!-- Advanced Therapies Section -->
    <section id="advanced-therapies" class="services-section">
        <div class="container">
            <div class="section-header scroll-animate">
                <div class="section-subtitle">Next-Generation Wellness</div>
                <h2 class="section-title modern-section-title">Advanced Wellness Solutions</h2>
                <p class="section-description">
                    Pioneering the future of personalized medicine with cutting-edge therapies, precision treatments, and mobile convenience that transforms your wellness journey from ordinary to extraordinary.
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card service-card-enhanced scroll-animate">
                    <h3>Core IV Therapy Features</h3>
                    <div class="category-subtitle">Why Choose Stay Dripped</div>
                    <p>Experience the pinnacle of mobile IV therapy with our comprehensive wellness approach featuring certified medical professionals, premium formulations, and concierge-level service in Scottsdale, AZ.</p>

                    <div class="treatments-grid hover-treatment-grid" id="dynamicTreatments">
                        <div class="treatment-item hover-card-item" onclick="scrollToSection('team')">
                            <div class="card-face">🏥 Licensed Professionals</div>
                            <div class="card-info">
                                <h4>Board-Certified Medical Team</h4>
                                <p>Our licensed nurses and medical professionals bring hospital-grade care directly to your location with full safety protocols.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="scrollToSection('contact')">
                            <div class="card-face">⚡ Same-Day Service</div>
                            <div class="card-info">
                                <h4>Rapid Response Scheduling</h4>
                                <p>Available 7 days a week with same-day appointments. Get the wellness boost you need when you need it most.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="window.open('/book-ivtherapy', '_self')">
                            <div class="card-face">💎 Premium Formulations</div>
                            <div class="card-info">
                                <h4>Pharmaceutical-Grade Nutrients</h4>
                                <p>Only the highest quality vitamins, minerals, and compounds sourced from certified medical suppliers for optimal absorption.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="scrollToSection('contact')">
                            <div class="card-face">🌟 5.0/5.0 Star Reviews</div>
                            <div class="card-info">
                                <h4>Exceptional Client Satisfaction</h4>
                                <p>Perfect 5-star rating from hundreds of satisfied clients who trust us for their wellness needs across Scottsdale, AZ.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="service-card service-card-enhanced scroll-animate">
                    <h3>Popular IV Therapy Treatments</h3>
                    <div class="category-subtitle">Click to Book Your Treatment</div>
                    <p>Our most popular IV therapy treatments delivered directly to you in Scottsdale, AZ. Each treatment is customized by our medical team and administered by licensed professionals in the comfort of your chosen location.</p>

                    <div class="treatments-grid hover-treatment-grid">
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('rehydrate-iv', 'Rehydrate IV Drip', 'f6362671-bcb3-4b2b-ab08-1f3801ff5249')">
                            <div class="card-face">💧 Rehydrate IV</div>
                            <div class="card-info">
                                <h4>Rehydrate IV Drip - $149</h4>
                                <p>Essential hydration therapy perfect for dehydration, exercise recovery, and general wellness boost.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('myers-cocktail', 'Myers\' Cocktail IV', '65854196-73a1-4e68-a6c5-15cc88a5e346')">
                            <div class="card-face">🧪 Myers' Cocktail</div>
                            <div class="card-info">
                                <h4>Myers' Cocktail IV - $249</h4>
                                <p>Our signature vitamin and mineral infusion for total wellness, immune support, and energy enhancement.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('hangover-relief', 'Day After Recovery', '351c5cac-f576-418f-80d1-b8d6c0a1614f')">
                            <div class="card-face">🤕 Hangover Relief</div>
                            <div class="card-info">
                                <h4>Day After Recovery - $199</h4>
                                <p>Fast-acting hangover relief with hydration, nausea control, and headache relief to get you back on your feet.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('nad-therapy', 'NAD+ Anti-Aging', '73bbd812-1b77-4e60-a92e-35b64af58379')">
                            <div class="card-face">🧬 NAD+ Therapy</div>
                            <div class="card-info">
                                <h4>NAD+ Anti-Aging - $399+</h4>
                                <p>Cutting-edge cellular regeneration therapy for anti-aging, mental clarity, and energy enhancement.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('gold-recovery', 'Gold Ultimate Recovery', '9e6f536c-5907-4c69-93ea-799863fd6495')">
                            <div class="card-face">��� Gold Recovery</div>
                            <div class="card-info">
                                <h4>Gold Ultimate Recovery - $399</h4>
                                <p>Premium recovery formula with the finest vitamins, minerals, and amino acids for ultimate wellness.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" onclick="openServiceBooking('platinum-elite', 'Platinum Ultimate', '1af0f33f-361e-42db-8a06-a87f653a5cb1')">
                            <div class="card-face">💎 Platinum Elite</div>
                            <div class="card-info">
                                <h4>Platinum Ultimate - $499</h4>
                                <p>Our most comprehensive treatment with premium ingredients and elite wellness support for maximum benefits.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <!-- Our Team Section -->
    <section id="team" class="team-section">
        <div class="container">
            <h1 class="about-title">OUR TEAM</h1>

            <div class="carousel-container">
                <button class="nav-arrow left">‹</button>
                <div class="carousel-track">
                    <div class="card" data-index="0">
                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dr. Emily Rodriguez - Medical Director">
                    </div>
                    <div class="card" data-index="1">
                        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dr. Michael Chen - Lead Physician">
                    </div>
                    <div class="card" data-index="2">
                        <img src="https://images.unsplash.com/photo-1594824771640-9c8c1f9df2a6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sarah Johnson - Nurse Practitioner">
                    </div>
                    <div class="card" data-index="3">
                        <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dr. James Wilson - Wellness Specialist">
                    </div>
                    <div class="card" data-index="4">
                        <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lisa Martinez - IV Therapy Coordinator">
                    </div>
                    <div class="card" data-index="5">
                        <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dr. Amanda Thompson - Hormone Specialist">
                    </div>
                </div>
                <button class="nav-arrow right">›</button>
            </div>

            <div class="member-info">
                <h2 class="member-name">Dr. Emily Rodriguez</h2>
                <p class="member-role">Medical Director</p>
            </div>

            <div class="dots">
                <div class="dot active" data-index="0"></div>
                <div class="dot" data-index="1"></div>
                <div class="dot" data-index="2"></div>
                <div class="dot" data-index="3"></div>
                <div class="dot" data-index="4"></div>
                <div class="dot" data-index="5"></div>
            </div>
        </div>
    </section>

    <!-- Google Reviews Section -->
    <section class="reviews-section" style="padding: 60px 0; background: rgba(255, 255, 255, 0.02);">
        <div class="container">
            <div class="section-header" style="text-align: center; margin-bottom: 40px;">
                <div class="section-subtitle">Client Testimonials</div>
                <h2 class="section-title">What Our Clients Say</h2>
            </div>
            <div style="display: flex; justify-content: center;">
                <script defer async src='https://cdn.trustindex.io/loader.js?01478a350bf596112f86f7d885a'></script>
            </div>
        </div>
    </section>

    <!-- Location Section -->
    <section id="location" class="location-section">
        <div class="container">
            <div class="section-header">
                <div class="section-subtitle">Our Service Area</div>
                <h2 class="section-title">Scottsdale & Surrounding Areas</h2>
                <p class="section-description">
                    Stay Dripped® provides premium mobile IV therapy throughout Scottsdale, Arizona and the greater Phoenix metropolitan area. Our team brings wellness directly to your location for the ultimate convenience.
                </p>
            </div>

            <div class="location-content">
                <div class="location-info">
                    <div class="location-card">
                        <h3>📍 Primary Service Area</h3>
                        <ul>
                            <li>Scottsdale</li>
                            <li>Paradise Valley</li>
                            <li>North Phoenix</li>
                            <li>Cave Creek</li>
                            <li>Carefree</li>
                            <li>Fountain Hills</li>
                        </ul>
                    </div>

                    <div class="location-card">
                        <h3>🏨 Service Locations</h3>
                        <ul>
                            <li>Private Residences</li>
                            <li>Hotels & Resorts</li>
                            <li>Corporate Offices</li>
                            <li>Event Venues</li>
                            <li>Vacation Rentals</li>
                            <li>Wellness Centers</li>
                        </ul>
                    </div>

                    <div class="location-card">
                        <h3>⏰ Service Hours</h3>
                        <ul>
                            <li>Monday - Friday: 7:00 AM - 8:00 PM</li>
                            <li>Saturday: 8:00 AM - 6:00 PM</li>
                            <li>Sunday: 9:00 AM - 5:00 PM</li>
                            <li>Emergency Services Available</li>
                            <li>Same-Day Appointments</li>
                        </ul>
                    </div>
                </div>

                <div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d212976.0376813488!2d-112.02195913466991!3d33.48184371121143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1754155681632!5m2!1sen!2sus"
                            width="100%"
                            height="450"
                            style="border:0; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="contact">
        <div class="container">
            <div class="footer-content">
                <div>
                    <h4>STAY DRIPPED IV & WELLNESS CO.</h4>
                    <p style="margin-bottom: 24px; line-height: 1.6; opacity: 0.8;">Revolutionary wellness pioneer delivering cutting-edge precision medicine, advanced biomarker optimization, elite mobile infusion therapy, and personalized longevity protocols to discerning clients in Scottsdale, AZ.</p>
                    <div>
                        <p style="margin-bottom: 8px;">📞 (602) 761-0492</p>
                        <p style="margin-bottom: 8px;">✉️ info@staydrippedmobileiv.com</p>
                        <p>📍 Scottsdale, AZ</p>
                    </div>
                </div>
                <div>
                    <h4>PRECISION MEDICINE</h4>
                    <ul>
                        <li><a href="#">Endocrine Enhancement</a></li>
                        <li><a href="#">Metabolic Optimization</a></li>
                        <li><a href="#">Longevity Protocols</a></li>
                        <li><a href="#">Performance Enhancement</a></li>
                        <li><a href="#">Cognitive Optimization</a></li>
                        <li><a href="#">Regenerative Therapies</a></li>
                    </ul>
                </div>
                <div>
                    <h4>ELITE INFUSION THERAPY</h4>
                    <ul>
                        <li><a href="#">Vital Restore Protocol - $195</a></li>
                        <li><a href="#">Cognitive Power Infusion - $285</a></li>
                        <li><a href="#">Recovery Elite Formula - $225</a></li>
                        <li><a href="#">Radiance Pro Treatment - $350</a></li>
                        <li><a href="#">Peak Performance Protocol - $395</a></li>
                        <li><a href="#">Executive Wellness Programs</a></li>
                    </ul>
                </div>
                <div>
                    <h4>COMPANY</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Team</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Stay Dripped IV & Wellness Co. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </footer>

    <!-- Login Modal -->
    <div id="loginModal" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2>Login</h2>
            <div class="form-group">
                <label for="loginEmail">Email</label>
                <input type="email" id="loginEmail" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" placeholder="Enter your password">
            </div>
            <button class="btn btn-primary" onclick="handleLogin()" style="width: 100%; margin-top: 1rem;">
                Login
            </button>
            <p style="text-align: center; margin-top: 1rem; color: #666;">
                Don't have an account? <a href="#" onclick="showSignup()" style="color: var(--iv-primary);">Sign up</a>
            </p>
        </div>
    </div>

    <!-- Signup Modal -->
    <div id="signupModal" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2>Sign Up</h2>
            <div class="form-group">
                <label for="signupName">Full Name</label>
                <input type="text" id="signupName" placeholder="Enter your full name">
            </div>
            <div class="form-group">
                <label for="signupEmail">Email</label>
                <input type="email" id="signupEmail" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="signupPassword">Password</label>
                <input type="password" id="signupPassword" placeholder="Create a password">
            </div>
            <button class="btn btn-primary" onclick="handleSignup()" style="width: 100%; margin-top: 1rem;">
                Sign Up
            </button>
            <p style="text-align: center; margin-top: 1rem; color: #666;">
                Already have an account? <a href="#" onclick="showLogin()" style="color: var(--iv-primary);">Login</a>
            </p>
        </div>
    </div>

    <!-- Client Portal Modal -->
    <div id="clientPortalModal" class="modal-overlay">
        <div class="modal" style="max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto;">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2 style="text-align: center; margin-bottom: 1.5rem; color: var(--brand-dark);">Client Portal</h2>
            <p style="text-align: center; margin-bottom: 2rem; color: #666; font-size: 16px;">
                Access your appointments, treatment history, and manage your wellness journey
            </p>

            <!-- IntakeQ Client Area Widget -->
            <div style="background: rgba(255, 255, 255, 0.95); border-radius: 16px; padding: 24px; margin: 16px 0; border: 2px solid rgba(44, 62, 80, 0.2);">
                <script>
                (function (c) {
                    // Clear any existing IntakeQ configuration
                    if (window.intakeq) {
                        delete window.intakeq;
                        delete window.intakeqCategoryId;
                        delete window.intakeqServiceId;
                        delete window.intakeqClientArea;
                    }

                    window.intakeq = "68460f36bc104b6aa9da43e0";
                    window.intakeqClientArea = true;

                    var i = c.createElement("script");
                    i.type = "text/javascript";
                    i.async = true;
                    i.src = "https://intakeq.com/js/widget.min.js?v=" + Date.now();
                    i.onload = function() {
                        console.log('IntakeQ Client Portal widget loaded');
                    };
                    document.head.appendChild(i);
                })(document);
                </script>
                <div id="intakeq-client-portal" style="min-height: 400px; width: 100%;"></div>
            </div>

            <!-- Fallback Link -->
            <div style="text-align: center; margin-top: 1.5rem;">
                <p style="color: #666; margin-bottom: 1rem;">Having trouble? Access the full portal directly:</p>
                <a href="https://Staydripped.intakeq.com/booking?clientArea=1" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;">
                    <span>🔗</span> Open Full Client Portal
                </a>
            </div>
        </div>
    </div>

    <script>
        let currentUser = null;

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // Skip empty hashes or just "#" to prevent invalid selector errors
                if (!href || href === '#' || href.length <= 1) {
                    return;
                }
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Direction-aware hover effect JavaScript
        const nodes = [].slice.call(document.querySelectorAll('.hover-grid li'), 0);
        const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
        const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => \`\${p}-\${d}\`)).reduce((a, b) => a.concat(b));

        const getDirectionKey = (ev, node) => {
            const { width, height, top, left } = node.getBoundingClientRect();
            const l = ev.pageX - (left + window.pageXOffset);
            const t = ev.pageY - (top + window.pageYOffset);
            const x = (l - (width/2) * (width > height ? (height/width) : 1));
            const y = (t - (height/2) * (height > width ? (width/height) : 1));
            return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
        }

        class Item {
            constructor(element) {
                this.element = element;    
                this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
                this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
            }

            update(ev, prefix) {
                this.element.classList.remove(...classNames);
                this.element.classList.add(\`\${prefix}-\${directions[getDirectionKey(ev, this.element)]}\`);
            }
        }

        nodes.forEach(node => new Item(node));

        // Dynamic Navigation Integration
        async function loadDynamicNavigation() {
            try {
                const response = await fetch('/api/navigation');
                const navData = await response.json();
                
                if (navData && navData.subCategories) {
                    updateNavigationWithDynamicData(navData);
                    updateTreatmentGrid(navData);
                }
            } catch (error) {
                console.log('Using static navigation - API unavailable');
            }
        }

        function updateNavigationWithDynamicData(navData) {
            const mainNav = document.getElementById('mainNavLinks');
            const treatmentItems = [];
            
            // Create treatment navigation from API data
            navData.subCategories.forEach(item => {
                if (item.url && item.url.includes('vitabella.com/') && 
                    !item.url.includes('membership') && 
                    item.metadata.probability > 0.92) {
                    
                    const urlParts = item.url.split('/');
                    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
                    const name = item.name || formatSlugToName(slug);
                    
                    treatmentItems.push({ slug, name, probability: item.metadata.probability });
                }
            });

            // Add dynamic treatments dropdown if we have data
            if (treatmentItems.length > 0) {
                const treatmentsDropdown = createTreatmentsDropdown(treatmentItems);
                const servicesLink = mainNav.querySelector('a[href="#services"]').parentElement;
                servicesLink.innerHTML = treatmentsDropdown;
            }
        }

        function createTreatmentsDropdown(treatments) {
            const sortedTreatments = treatments.sort((a, b) => b.probability - a.probability);
            const dropdownItems = sortedTreatments.map(treatment => 
                \`<a href="#\${treatment.slug}" onclick="scrollToTreatment('\${treatment.slug}')">\${treatment.name}</a>\`
            ).join('');

            return \`
                <div class="nav-dropdown">
                    <a href="#services" class="dropdown-trigger">Services <span style="font-size: 12px;">▼</span></a>
                    <div class="dropdown-content">
                        \${dropdownItems}
                        <a href="#iv-therapy">IV Therapy</a>
                    </div>
                </div>
            \`;
        }

        function updateTreatmentGrid(navData) {
            const treatmentGrid = document.getElementById('dynamicTreatments');
            const treatments = navData.subCategories
                .filter(item => item.url && item.url.includes('vitabella.com/') && 
                               !item.url.includes('membership') && 
                               item.metadata.probability > 0.92)
                .sort((a, b) => b.metadata.probability - a.metadata.probability);

            if (treatments.length > 0) {
                const treatmentHTML = treatments.map(treatment => {
                    const urlParts = treatment.url.split('/');
                    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
                    const name = treatment.name || formatSlugToName(slug);
                    const description = getTreatmentDescription(slug);
                    
                    return \`
                        <div class="treatment-item dynamic-treatment" data-url="\${slug}" data-probability="\${treatment.metadata.probability}">
                            <h4>\${name}</h4>
                            <p>\${description}</p>
                            <div class="confidence-indicator" style="font-size: 10px; opacity: 0.7; margin-top: 5px;">
                                Confidence: \${(treatment.metadata.probability * 100).toFixed(1)}%
                            </div>
                        </div>
                    \`;
                }).join('');
                
                treatmentGrid.innerHTML = treatmentHTML;
            }
        }

        function formatSlugToName(slug) {
            return slug.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }

        function getTreatmentDescription(slug) {
            const descriptions = {
                'weight-loss': 'Medical-grade programs',
                'hormone-therapy': 'Personalized optimization', 
                'anti-aging': 'Advanced treatments',
                'sexual-wellness': 'Restore confidence'
            };
            return descriptions[slug] || 'Specialized treatment';
        }

        function scrollToTreatment(slug) {
            const treatmentElement = document.querySelector(\`[data-url="\${slug}"]\`);
            if (treatmentElement) {
                treatmentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                treatmentElement.style.background = 'var(--iv-primary)';
                treatmentElement.style.color = 'var(--white)';
                treatmentElement.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    treatmentElement.style.background = '';
                    treatmentElement.style.color = '';
                    treatmentElement.style.transform = '';
                }, 2000);
            }
        }

        // Authentication functions
        function showLogin() {
            closeModal();
            document.getElementById('loginModal').classList.add('active');
        }

        function showSignup() {
            closeModal();
            document.getElementById('signupModal').classList.add('active');
        }

        function showClientPortal() {
            closeModal();
            document.getElementById('clientPortalModal').classList.add('active');

            // Initialize IntakeQ client portal widget
            setTimeout(() => {
                if (window.IntakeQ && window.IntakeQ.init) {
                    window.IntakeQ.init();
                }
            }, 500);
        }

        function closeModal() {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
        }

        function handleLogin() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            
            updateAuthUI();
            closeModal();
            alert('Login successful!');
        }

        function handleSignup() {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            if (!name || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate signup
            currentUser = {
                name: name,
                email: email
            };
            
            updateAuthUI();
            closeModal();
            alert('Account created successfully!');
        }

        function logout() {
            currentUser = null;
            updateAuthUI();
            alert('Logged out successfully!');
        }

        function updateAuthUI() {
            const authSection = document.getElementById('authSection');
            const userSection = document.getElementById('userSection');
            const userWelcome = document.getElementById('userWelcome');
            
            if (currentUser) {
                authSection.classList.add('hidden');
                userSection.classList.remove('hidden');
                userWelcome.textContent = \`Welcome, \${currentUser.name}!\`;
            } else {
                authSection.classList.remove('hidden');
                userSection.classList.add('hidden');
            }
        }

        // Service booking modal functionality
        function openServiceBooking(serviceSlug, serviceName, serviceId) {
            // Create modal if it doesn't exist
            let modal = document.getElementById('service-booking-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'service-booking-modal';
                modal.className = 'modal-overlay service-booking-modal';
                modal.innerHTML = \`
                    <div class="modal">
                        <button class="modal-close" onclick="closeServiceBooking()">×</button>
                        <h2 id="service-modal-title">Book Service</h2>
                        <div class="booking-widget-container">
                            <div id="intakeq-service-widget" style="min-height: 400px; width: 100%;"></div>
                        </div>
                    </div>
                \`;
                document.body.appendChild(modal);
            }

            // Update modal content
            document.getElementById('service-modal-title').textContent = \`Book \${serviceName}\`;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Load IntakeQ widget for specific service
            const widgetContainer = document.getElementById('intakeq-service-widget');
            widgetContainer.innerHTML = ''; // Clear previous content

            // Create unique script for this service
            const script = document.createElement('script');
            script.innerHTML = \`
                (function(c) {
                    window.intakeqService\${serviceSlug.replace(/-/g, '')} = "68460f36bc104b6aa9da43e0";
                    window.intakeqServiceId\${serviceSlug.replace(/-/g, '')} = "\${serviceId}";
                    var i = c.createElement("script");
                    i.type = "text/javascript";
                    i.async = true;
                    i.src = "https://intakeq.com/js/widget.min.js?service=" + Date.now();
                    i.onload = function() {
                        if (window.IntakeQ) {
                            window.IntakeQ.render('intakeq-service-widget', {
                                practiceId: window.intakeqService\${serviceSlug.replace(/-/g, '')},
                                serviceId: window.intakeqServiceId\${serviceSlug.replace(/-/g, '')}
                            });
                        }
                    };
                    c.head.appendChild(i);
                })(document);
            \`;
            document.head.appendChild(script);
        }

        function closeServiceBooking() {
            const modal = document.getElementById('service-booking-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';

                // Clear the widget container
                setTimeout(() => {
                    const widgetContainer = document.getElementById('intakeq-service-widget');
                    if (widgetContainer) {
                        widgetContainer.innerHTML = '';
                    }
                }, 300);
            }
        }

        // Navigation functions
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        function toggleMenu() {
            const mobileNav = document.getElementById('mobileNav');
            const menuToggle = document.querySelector('.mobile-menu-toggle');

            if (mobileNav.style.display === 'block') {
                mobileNav.style.display = 'none';
                menuToggle.textContent = '☰';
            } else {
                mobileNav.style.display = 'block';
                menuToggle.textContent = '✕';
            }
        }

        function toggleClientPortal() {
            const dropdown = document.getElementById('clientPortalDropdown');
            if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        }

        // Book IV therapy service
        function bookService() {
            const location = document.getElementById('service-location').value;
            const date = document.getElementById('service-date').value;
            const time = document.getElementById('service-time').value;
            const type = document.getElementById('iv-type-search').value;
            
            if (!location || !date || !time) {
                alert('Please fill in all booking fields');
                return;
            }
            
            if (!currentUser) {
                alert('Please login to book a service');
                showLogin();
                return;
            }
            
            alert(\`Mobile IV Therapy booking confirmed!\nLocation: \${location}\nDate: \${date}\nTime: \${time}\nType: \${type || 'All Treatments'}\n\nOur team will contact you to confirm the appointment.\`);
        }

        // Set minimum date to today
        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('service-date');
            if (dateInput) {
                dateInput.min = today;
            }
        }

        // Close modal when clicking outside
        document.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                if (event.target === modal) {
                    if (modal.id === 'service-booking-modal') {
                        closeServiceBooking();
                    } else {
                        closeModal();
                    }
                }
            });
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const serviceModal = document.getElementById('service-booking-modal');
                if (serviceModal && serviceModal.classList.contains('active')) {
                    closeServiceBooking();
                } else {
                    closeModal();
                }
            }
        });

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            setMinDate();
            loadDynamicNavigation();
        });

        // Enhanced scroll animations with stagger effect
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.scroll-animate');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => observer.observe(el));
        }

        // Enhanced hover card direction detection
        function initDirectionalHovers() {
            const hoverCards = document.querySelectorAll('.hover-card-item');

            hoverCards.forEach(card => {
                card.addEventListener('mouseenter', function(e) {
                    // Add subtle scale effect
                    this.style.transform = 'scale(1.02)';

                    // Add entrance animation based on hover direction
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const w = rect.width;
                    const h = rect.height;

                    // Determine direction for animation
                    if (y < h * 0.5 && x > w * 0.25 && x < w * 0.75) {
                        this.classList.add('hover-from-top');
                    } else if (x > w * 0.5 && y > h * 0.25 && y < h * 0.75) {
                        this.classList.add('hover-from-right');
                    } else {
                        this.classList.add('hover-from-center');
                    }
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.classList.remove('hover-from-top', 'hover-from-right', 'hover-from-center');
                });
            });
        }

        // Add sparkle effect to glassmorphism elements
        function addSparkleEffect() {
            const glassmorphElements = document.querySelectorAll('.service-card-enhanced, .floating-card');

            glassmorphElements.forEach(element => {
                element.addEventListener('mouseenter', function(e) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle-effect';
                    sparkle.style.cssText = 'position: absolute; top: ' + (e.offsetY - 2) + 'px; left: ' + (e.offsetX - 2) + 'px; width: 4px; height: 4px; background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%); border-radius: 50%; pointer-events: none; animation: sparkle 0.6s ease-out forwards; z-index: 1000;';

                    // Add sparkle animation if not exists
                    if (!document.getElementById('sparkle-styles')) {
                        const style = document.createElement('style');
                        style.id = 'sparkle-styles';
                        style.textContent = '@keyframes sparkle { 0% { transform: scale(0) rotate(0deg); opacity: 1; } 50% { transform: scale(1) rotate(180deg); opacity: 1; } 100% { transform: scale(0) rotate(360deg); opacity: 0; } }';
                        document.head.appendChild(style);
                    }

                    this.style.position = 'relative';
                    this.appendChild(sparkle);

                    setTimeout(() => sparkle.remove(), 600);
                });
            });
        }

        // Enhanced button interactions with ripple effect
        function enhanceButtons() {
            const buttons = document.querySelectorAll('.btn-iv-therapy');

            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.className = 'ripple-effect';
                    ripple.style.cssText = 'position: absolute; top: ' + y + 'px; left: ' + x + 'px; width: ' + size + 'px; height: ' + size + 'px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.6s ease-out; pointer-events: none;';

                    // Add ripple animation if not exists
                    if (!document.getElementById('ripple-styles')) {
                        const style = document.createElement('style');
                        style.id = 'ripple-styles';
                        style.textContent = '@keyframes ripple { to { transform: scale(2); opacity: 0; } }';
                        document.head.appendChild(style);
                    }

                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);

                    setTimeout(() => ripple.remove(), 600);
                });
            });
        }

        // Enhanced vial interactions
        function enhanceVialInteractions() {
            const vialHighlights = document.querySelectorAll('.vial-highlight');

            const vialInfo = {
                'amino': 'Essential amino acids for muscle recovery and energy',
                'b-complex': 'B-vitamins for energy metabolism and brain function',
                'glutathione': 'Master antioxidant for detox and cellular health',
                'vitamin-b12': 'Energy boost and nervous system support'
            };

            vialHighlights.forEach(vial => {
                vial.addEventListener('click', function() {
                    const vialType = this.getAttribute('data-vial');
                    const info = vialInfo[vialType];

                    // Create info popup
                    const popup = document.createElement('div');
                    popup.className = 'vial-info-popup';
                    popup.innerHTML = '<p>' + info + '</p>';
                    popup.style.cssText = 'position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.9); color: white; padding: 10px 15px; border-radius: 8px; font-size: 12px; white-space: nowrap; z-index: 1000; animation: fadeInUp 0.3s ease;';

                    this.style.position = 'relative';
                    this.appendChild(popup);

                    setTimeout(() => popup.remove(), 3000);

                    // Add pulse effect
                    this.style.animation = 'vialPulse 0.6s ease';
                    setTimeout(() => this.style.animation = '', 600);
                });
            });

            // Add vial pulse animation
            if (!document.getElementById('vial-animation-styles')) {
                const style = document.createElement('style');
                style.id = 'vial-animation-styles';
                style.textContent = '@keyframes vialPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }';
                document.head.appendChild(style);
            }
        }

        // Team Carousel Functionality
        const teamMembers = [
            { name: "Dr. Emily Rodriguez", role: "Medical Director" },
            { name: "Dr. Michael Chen", role: "Lead Physician" },
            { name: "Sarah Johnson", role: "Nurse Practitioner" },
            { name: "Dr. James Wilson", role: "Wellness Specialist" },
            { name: "Lisa Martinez", role: "IV Therapy Coordinator" },
            { name: "Dr. Amanda Thompson", role: "Hormone Specialist" }
        ];

        function initTeamCarousel() {
            const cards = document.querySelectorAll(".card");
            const dots = document.querySelectorAll(".dot");
            const memberName = document.querySelector(".member-name");
            const memberRole = document.querySelector(".member-role");
            const leftArrow = document.querySelector(".nav-arrow.left");
            const rightArrow = document.querySelector(".nav-arrow.right");

            if (!cards.length || !dots.length || !memberName || !memberRole || !leftArrow || !rightArrow) {
                return; // Elements not found, skip initialization
            }

            let currentIndex = 0;
            let isAnimating = false;

            function updateCarousel(newIndex) {
                if (isAnimating) return;
                isAnimating = true;

                currentIndex = (newIndex + cards.length) % cards.length;

                cards.forEach((card, i) => {
                    const offset = (i - currentIndex + cards.length) % cards.length;

                    card.classList.remove(
                        "center",
                        "left-1",
                        "left-2",
                        "right-1",
                        "right-2",
                        "hidden"
                    );

                    if (offset === 0) {
                        card.classList.add("center");
                    } else if (offset === 1) {
                        card.classList.add("right-1");
                    } else if (offset === 2) {
                        card.classList.add("right-2");
                    } else if (offset === cards.length - 1) {
                        card.classList.add("left-1");
                    } else if (offset === cards.length - 2) {
                        card.classList.add("left-2");
                    } else {
                        card.classList.add("hidden");
                    }
                });

                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === currentIndex);
                });

                memberName.style.opacity = "0";
                memberRole.style.opacity = "0";

                setTimeout(() => {
                    memberName.textContent = teamMembers[currentIndex].name;
                    memberRole.textContent = teamMembers[currentIndex].role;
                    memberName.style.opacity = "1";
                    memberRole.style.opacity = "1";
                }, 300);

                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            }

            leftArrow.addEventListener("click", () => {
                updateCarousel(currentIndex - 1);
            });

            rightArrow.addEventListener("click", () => {
                updateCarousel(currentIndex + 1);
            });

            dots.forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    updateCarousel(i);
                });
            });

            cards.forEach((card, i) => {
                card.addEventListener("click", () => {
                    updateCarousel(i);
                });
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft") {
                    updateCarousel(currentIndex - 1);
                } else if (e.key === "ArrowRight") {
                    updateCarousel(currentIndex + 1);
                }
            });

            let touchStartX = 0;
            let touchEndX = 0;

            document.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            document.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        updateCarousel(currentIndex + 1);
                    } else {
                        updateCarousel(currentIndex - 1);
                    }
                }
            }

            updateCarousel(0);
        }

        // Loading animation with enhanced effects
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';

            // Initialize all enhanced visual effects
            initScrollAnimations();
            initDirectionalHovers();
            addSparkleEffect();
            enhanceButtons();
            enhanceVialInteractions();
            initTeamCarousel();

            // Staggered fade-in for hero elements
            const heroElements = document.querySelectorAll('.fade-in-up');
            heroElements.forEach((el, index) => {
                el.style.animationDelay = (0.2 + (index * 0.1)) + 's';
            });
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Stay Dripped IV & Wellness Co. - Complete Mobile IV Therapy Website running on http://localhost:${PORT}`);
});
