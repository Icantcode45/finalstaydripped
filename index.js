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
        "url": "https://vitabella.com/",
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
            url: "https://vitabella.com/sexual-wellness",
            name: "Sexual Wellness",
            metadata: { probability: 0.9939426779747009 }
          },
          {
            url: "https://vitabella.com/hormone-therapy", 
            name: "Hormone Therapy",
            metadata: { probability: 0.9934606552124023 }
          },
          {
            url: "https://vitabella.com/weight-loss",
            name: "Weight Loss", 
            metadata: { probability: 0.9927549958229065 }
          },
          {
            url: "https://vitabella.com/membership/",
            name: "Start Your Treatment",
            metadata: { probability: 0.9498394727706909 }
          },
          {
            url: "https://vitabella.com/anti-aging",
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
    <link rel="canonical" href="https://vitabella.com/">
    <meta name="generator" content="Stay Dripped IV & Wellness Co. - Mobile IV Therapy Specialists">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="Stay Dripped IV & Wellness Co. - Mobile IV Therapy & Wellness">
    <meta property="og:type" content="website">
    <meta property="og:title" content="#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.">
    <meta property="og:description" content="Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!">
    <meta property="og:url" content="https://vitabella.com/">
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
                "@id": "https://vitabella.com/#breadcrumblist",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "@id": "https://vitabella.com/#listItem",
                        "position": 1,
                        "name": "Home"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": "https://vitabella.com/#organization",
                "name": "Stay Dripped IV & Wellness Co.",
                "description": "Mobile IV Therapy & Wellness Delivered, Anytime, Anywhere.",
                "url": "https://vitabella.com/",
                "telephone": "+14806020444",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                    "@id": "https://vitabella.com/#organizationLogo",
                    "width": 1200,
                    "height": 630
                },
                "image": {
                    "@id": "https://vitabella.com/#organizationLogo"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "7014 E Camelback Rd suite b100 a",
                    "addressLocality": "Scottsdale",
                    "addressRegion": "AZ",
                    "postalCode": "85251",
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
                "@id": "https://vitabella.com/#webpage",
                "url": "https://vitabella.com/",
                "name": "#1 Mobile IV Therapy in Scottsdale, AZ | Stay Dripped IV & Wellness Co.",
                "description": "Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring premium wellness directly to you. Book your session today!",
                "inLanguage": "en-US",
                "isPartOf": {
                    "@id": "https://vitabella.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://vitabella.com/#breadcrumblist"
                },
                "image": {
                    "@type": "ImageObject",
                    "url": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                    "@id": "https://vitabella.com/#mainImage",
                    "width": 1200,
                    "height": 630
                },
                "primaryImageOfPage": {
                    "@id": "https://vitabella.com/#mainImage"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://vitabella.com/#website",
                "url": "https://vitabella.com/",
                "name": "Stay Dripped IV & Wellness Co.",
                "description": "Mobile IV Therapy & Wellness Delivered, Anytime, Anywhere.",
                "inLanguage": "en-US",
                "publisher": {
                    "@id": "https://vitabella.com/#organization"
                }
            },
            {
                "@type": "MedicalBusiness",
                "@id": "https://vitabella.com/#medicalbusiness",
                "name": "Stay Dripped IV & Wellness Co. - Mobile IV Therapy",
                "image": "https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d",
                "telephone": "+14806020444",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "7014 E Camelback Rd suite b100 a",
                    "addressLocality": "Scottsdale",
                    "addressRegion": "AZ",
                    "postalCode": "85251",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 33.5027,
                    "longitude": -111.9261
                },
                "url": "https://vitabella.com/",
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
            
            /* Primary Brand Colors */
            --primary-emerald: #10B981;
            --primary-emerald-dark: #059669;
            --primary-emerald-light: #6EE7B7;
            --primary-blue: #3B82F6;
            --primary-blue-dark: #1D4ED8;
            --accent-purple: #8B5CF6;
            --accent-purple-light: #C4B5FD;
            
            /* IV Therapy Brand Colors */
            --iv-primary: #3d9cd2;
            --iv-secondary: #1A2B3B;
            --iv-accent: #F5F7F9;
            --iv-success: #22c55e;
            --iv-warning: #f59e0b;
            --iv-error: #d63939;
            
            /* Neutral System */
            --white: #ffffff;
            --light-gray: #f8fafc;
            --dark-gray: #1f2937;
            --text-gray: #374151;
            --border-gray: #e5e7eb;
            
            /* Typography Variables */
            --e-global-typography-primary-font-family: "Instrument Sans", "Inter", sans-serif;
            --e-global-typography-secondary-font-family: "Roboto Slab", serif;
            --e-global-typography-text-font-family: "Rubik", sans-serif;
            --e-global-typography-accent-font-family: "Roboto", sans-serif;
            
            /* Container System */
            --container-max-width: 1100px;
            --container-default-padding: 20px;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=Rubik:wght@300;400;500;600;700&family=Roboto+Slab:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&display=swap');
        
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

        /* Enhanced Header */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 1000;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }

        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--iv-primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo::before {
            content: "💉";
            font-size: 24px;
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
                rgba(61, 156, 210, 0.05) 0%, 
                rgba(16, 185, 129, 0.05) 50%, 
                rgba(139, 92, 246, 0.05) 100%);
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

        .hero-text h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(48px, 6vw, 72px);
            font-weight: 700;
            line-height: 1.1;
            color: var(--dark-gray);
            margin-bottom: 24px;
            background: linear-gradient(135deg, var(--dark-gray), var(--iv-primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
        }

        .stat-number {
            font-size: 32px;
            font-weight: 800;
            color: var(--iv-primary);
            display: block;
        }

        .stat-label {
            font-size: 14px;
            color: var(--text-gray);
            opacity: 0.8;
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

        /* Search Form Styling */
        .search-section {
            background: white;
            margin: -50px auto 0;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 10;
            max-width: 1000px;
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
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--iv-primary);
            box-shadow: 0 0 0 3px rgba(61, 156, 210, 0.1);
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
            font-family: 'Playfair Display', serif;
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
            display: block;
        }

        .service-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
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

        /* Text Shadow Effects Integration */
        .shadow-showcase {
            padding: 120px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }

        .shadow-title {
            text-align: center;
            color: white;
            font-size: 3rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        }

        .shadow-description {
            text-align: center;
            color: rgba(255,255,255,0.9);
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto 50px auto;
        }

        .shadow-section {
            margin-bottom: 60px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .shadow-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
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

        /* Interactive Hover Effects */
        .interactive-section {
            padding: 120px 0;
            background: #34495E;
        }

        .interactive-title {
            text-align: center;
            color: #ECF0F1;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .interactive-description {
            text-align: center;
            color: rgba(236, 240, 241, 0.8);
            margin-bottom: 40px;
            font-size: 1.1rem;
        }

        .hover-container {
            max-width: 840px;
            margin: 0 auto;
        }

        .hover-grid {
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            list-style: none;
        }

        .hover-grid li {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 5px;
            padding: 0;
            list-style: none;
            perspective: 400px;
        }

        .hover-grid li a {
            display: inline-block;
            vertical-align: top;
            text-decoration: none;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            background-color: #ECF0F1;
            color: rgba(52, 73, 94, 0.6);
            box-shadow: inset 0 2px 20px rgba(236, 240, 241, 0.98);
            text-align: center;
            font-size: 50px;
            line-height: 200px;
        }

        .hover-grid .info {
            transform: rotate3d(1,0,0, 90deg);
            width: 100%;
            height: 100%;
            padding: 20px;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 4px;
            pointer-events: none;
            background-color: rgba(61, 156, 210, 0.9);
            color: white;
        }

        .hover-grid .info h3 {
            margin: 0;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.9);
            font-family: 'Playfair Display', serif;
            margin-bottom: 12px;
        }

        .hover-grid .info p {
            font-size: 12px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.8);
        }

        /* Direction-aware animations */
        .hover-grid .in-top .info {
            transform-origin: 50% 0%;
            animation: in-top 300ms ease 0ms 1 forwards;
        }
        .hover-grid .in-right .info {
            transform-origin: 100% 0%;
            animation: in-right 300ms ease 0ms 1 forwards;
        }
        .hover-grid .in-bottom .info {
            transform-origin: 50% 100%;
            animation: in-bottom 300ms ease 0ms 1 forwards;
        }
        .hover-grid .in-left .info {
            transform-origin: 0% 0%;
            animation: in-left 300ms ease 0ms 1 forwards;
        }

        .hover-grid .out-top .info {
            transform-origin: 50% 0%;
            animation: out-top 300ms ease 0ms 1 forwards;
        }
        .hover-grid .out-right .info {
            transform-origin: 100% 50%;
            animation: out-right 300ms ease 0ms 1 forwards;
        }
        .hover-grid .out-bottom .info {
            transform-origin: 50% 100%;
            animation: out-bottom 300ms ease 0ms 1 forwards;
        }
        .hover-grid .out-left .info {
            transform-origin: 0% 0%;
            animation: out-left 300ms ease 0ms 1 forwards;
        }

        @keyframes in-top {
            from {transform: rotate3d(-1,0,0, 90deg)}
            to   {transform: rotate3d(0,0,0, 0deg)}
        }
        @keyframes in-right {
            from {transform: rotate3d(0,-1,0, 90deg)}
            to   {transform: rotate3d(0,0,0, 0deg)}
        }
        @keyframes in-bottom {
            from {transform: rotate3d(1,0,0, 90deg)}
            to   {transform: rotate3d(0,0,0, 0deg)}
        }
        @keyframes in-left {
            from {transform: rotate3d(0,1,0, 90deg)}
            to   {transform: rotate3d(0,0,0, 0deg)}
        }

        @keyframes out-top {
            from {transform: rotate3d(0,0,0, 0deg)}
            to   {transform: rotate3d(-1,0,0, 104deg)}
        }
        @keyframes out-right {
            from {transform: rotate3d(0,0,0, 0deg)}
            to   {transform: rotate3d(0,-1,0, 104deg)}
        }
        @keyframes out-bottom {
            from {transform: rotate3d(0,0,0, 0deg)}
            to   {transform: rotate3d(1,0,0, 104deg)}
        }
        @keyframes out-left {
            from {transform: rotate3d(0,0,0, 0deg)}
            to   {transform: rotate3d(0,1,0, 104deg)}
        }

        /* 3D Icon Section */
        .icon-section {
            padding: 120px 0;
            background: linear-gradient(hsla(0,0%,0%,0) 37.5%,hsla(0,0%,0%,0.5)), 
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23654321"/><rect x="0" y="0" width="20" height="20" fill="%23543210"/><rect x="20" y="20" width="20" height="20" fill="%23543210"/><rect x="40" y="0" width="20" height="20" fill="%23543210"/><rect x="60" y="20" width="20" height="20" fill="%23543210"/><rect x="80" y="0" width="20" height="20" fill="%23543210"/></svg>') center / 39em 39em;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            min-height: 500px;
        }

        .icon-main {
            --h: 33;
            --s: 90%;
            --l: 90%;
            font-size: calc(16px + (24 - 16) * (100vw - 320px) / (2560 - 320));
        }

        .icon {
            background-image: linear-gradient(hsla(0,0%,0%,0.2),hsla(0,0%,0%,0));
            border-radius: 3.25em;
            box-shadow: 
                0 -0.125em 0.25em hsla(0,0%,0%,0.2), 
                0 0.25em 0.25em hsla(var(--h),var(--s),var(--l),0.5), 
                0 0 0 0.25em hsla(var(--h),var(--s),var(--l),0.5), 
                0 0.375em 0.5em hsla(var(--h),var(--s),var(--l),0.5) inset, 
                0 -0.125em 0.375em hsla(var(--h),var(--s),var(--l),0.4) inset, 
                0 -1.25em 2em 0.5em hsla(var(--h),var(--s),var(--l),0.3) inset, 
                0 1.25em 0 hsla(var(--h),var(--s),var(--l),0.3) inset, 
                0 5em 3em hsla(0,0%,0%,0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            position: relative;
            width: 15.5em;
            height: 15.5em;
        }

        .icon:before {
            background: radial-gradient(100% 100% at center,hsla(var(--h),var(--s),80%,0.25),hsla(var(--h),var(--s),80%,0) 50%);
            content: "";
            display: block;
            position: absolute;
            top: 100%;
            left: 50%;
            width: 9em;
            height: 3em;
            transform: translateX(-50%);
        }

        .icon__glyph {
            margin: auto;
            position: relative;
            width: 7em;
            height: 7em;
        }

        .icon__glyph-part {
            background-image: linear-gradient(-45deg,hsla(var(--h),var(--s),var(--l),0.8),hsla(var(--h),var(--s),var(--l),0.2) 67%);
            border-radius: 0.25em;
            box-shadow: 
                -0.125em -0.125em 0.25em hsla(var(--h),var(--s),var(--l),0.5) inset, 
                0.3em 0.3em 0 hsla(var(--h),var(--s),var(--l),0.2) inset, 
                0.375em 0.375em 0.5em hsla(0,0%,0%,0.3), 
                0.5em 0.5em 0.75em hsla(var(--h),var(--s),80%,0.7);
            position: absolute;
            bottom: 50%;
            right: 50%;
            width: 2.25em;
            height: 2.25em;
            transform: rotate(45deg) translate(-0.25em,-0.25em);
            transform-origin: 100% 100%;
        }

        .icon__glyph-part:nth-child(2) {
            background-image: linear-gradient(-135deg,hsla(var(--h),var(--s),var(--l),0.8),hsla(var(--h),var(--s),var(--l),0.2) 67%);
            box-shadow: 
                -0.125em 0.125em 0.25em hsla(var(--h),var(--s),var(--l),0.5) inset, 
                0.3em -0.3em 0 hsla(var(--h),var(--s),var(--l),0.2) inset, 
                0.375em -0.375em 0.5em hsla(0,0%,0%,0.3), 
                0.5em -0.5em 0.75em hsla(var(--h),var(--s),80%,0.7);
            transform: rotate(135deg) translate(-0.25em,-0.25em);
        }

        .icon__glyph-part:nth-child(3) {
            background-image: linear-gradient(-225deg,hsla(var(--h),var(--s),var(--l),0.8),hsla(var(--h),var(--s),var(--l),0.2) 67%);
            box-shadow: 
                0.125em 0.125em 0.25em hsla(var(--h),var(--s),var(--l),0.5) inset, 
                -0.3em -0.3em 0 hsla(var(--h),var(--s),var(--l),0.2) inset, 
                -0.375em -0.375em 0.5em hsla(0,0%,0%,0.3), 
                -0.5em -0.5em 0.75em hsla(var(--h),var(--s),80%,0.7);
            transform: rotate(225deg) translate(-0.25em,-0.25em);
        }

        .icon__glyph-part:nth-child(4) {
            background-image: linear-gradient(-315deg,hsla(var(--h),var(--s),var(--l),0.8),hsla(var(--h),var(--s),var(--l),0.2) 67%);
            box-shadow: 
                0.125em -0.125em 0.25em hsla(var(--h),var(--s),var(--l),0.5) inset, 
                -0.3em 0.3em 0 hsla(var(--h),var(--s),var(--l),0.2) inset, 
                -0.375em 0.375em 0.5em hsla(0,0%,0%,0.3), 
                -0.5em 0.5em 0.75em hsla(var(--h),var(--s),80%,0.7);
            transform: rotate(315deg) translate(-0.25em,-0.25em);
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
            font-family: 'Playfair Display', serif;
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
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .modal-overlay.active .modal {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
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
            font-family: 'Playfair Display', serif;
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
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="logo">
                Stay Dripped
                <span class="logo-subtitle">IV & Wellness Co.</span>
            </a>
            <ul class="nav-links" id="mainNavLinks">
                <li><a href="#services">Services</a></li>
                <li><a href="#effects">Visual Effects</a></li>
                <li><a href="#iv-therapy">IV Therapy</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="mobile-menu-toggle" onclick="toggleMenu()">☰</button>
            <div class="auth-buttons">
                <div id="authSection">
                    <button class="btn btn-secondary" onclick="showLogin()">
                        <span class="icon">👤</span>
                        Login
                    </button>
                    <button class="btn btn-primary" onclick="showSignup()">
                        Sign Up
                        <span class="icon">→</span>
                    </button>
                </div>
                <div id="userSection" class="hidden">
                    <div style="display: flex; align-items: center; gap: 1rem; color: #333;">
                        <span class="icon">👤</span>
                        <span id="userWelcome">Welcome, User!</span>
                        <button class="btn btn-secondary" onclick="logout()">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <div class="mobile-nav" id="mobileNav">
            <ul>
                <li><a href="#services" onclick="scrollToSection('services'); toggleMenu();">Services</a></li>
                <li><a href="#effects" onclick="scrollToSection('effects'); toggleMenu();">Visual Effects</a></li>
                <li><a href="#iv-therapy" onclick="scrollToSection('iv-therapy'); toggleMenu();">IV Therapy</a></li>
                <li><a href="#contact" onclick="scrollToSection('contact'); toggleMenu();">Contact</a></li>
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
                    <h1 class="shadow-text retroshadow">#1 Mobile IV Therapy in Scottsdale</h1>
                    <p class="hero-subtitle">
                        Experience premium mobile IV therapy delivered directly to your location in Scottsdale, AZ. From hydration boosts to hangover recovery, we bring wellness to you with same-day availability.
                    </p>
                    <div class="hero-cta">
                        <a href="#iv-therapy" class="btn btn-iv-therapy">📱 Book Mobile IV Now</a>
                        <a href="#services" class="btn btn-secondary">🏥 View All Services</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">10k+</span>
                            <span class="stat-label">IV Treatments Delivered</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4.9/5</span>
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
                        <img src="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d" alt="Vita Bella Health - Premium Wellness Services" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px;">
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
                            <span class="icon">📍</span>
                            Service Location in Scottsdale
                        </label>
                        <input type="text" id="service-location" placeholder="Enter your Scottsdale, AZ address" required>
                    </div>
                    <div class="form-group">
                        <label for="service-date">
                            <span class="icon">📅</span>
                            Preferred Date
                        </label>
                        <input type="date" id="service-date">
                    </div>
                    <div class="form-group">
                        <label for="service-time">
                            <span class="icon">🕒</span>
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
                            <span class="icon">💉</span>
                            Book Mobile IV Therapy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="container">
            <div class="section-header scroll-animate">
                <div class="section-subtitle">Our Services</div>
                <h2 class="section-title shadow-text elegantshadow">Comprehensive Wellness Care</h2>
                <p class="section-description">
                    Combining advanced medical treatments with convenient mobile services to support your optimal health and vitality.
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card service-card-enhanced scroll-animate">
                    <span class="service-icon">🏥</span>
                    <h3>Medical Wellness</h3>
                    <div class="category-subtitle">Hormone & Anti-Aging Therapy</div>
                    <p>Personalized hormone optimization, weight management, and anti-aging treatments designed to restore your vitality and enhance your quality of life.</p>

                    <div class="treatments-grid hover-treatment-grid" id="dynamicTreatments">
                        <div class="treatment-item hover-card-item" data-url="weight-loss">
                            <div class="card-face">🎯</div>
                            <div class="card-info">
                                <h4>Weight Loss</h4>
                                <p>Medical-grade programs tailored to your specific health goals and lifestyle.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" data-url="hormone-therapy">
                            <div class="card-face">⚖️</div>
                            <div class="card-info">
                                <h4>Hormone Therapy</h4>
                                <p>Personalized hormone optimization for energy, vitality, and overall wellness.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" data-url="anti-aging">
                            <div class="card-face">🌟</div>
                            <div class="card-info">
                                <h4>Anti-Aging</h4>
                                <p>Advanced treatments to restore your youthful vitality and appearance.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item" data-url="sexual-wellness">
                            <div class="card-face">💪</div>
                            <div class="card-info">
                                <h4>Sexual Wellness</h4>
                                <p>Restore confidence with our specialized wellness programs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="service-card service-card-enhanced scroll-animate">
                    <span class="service-icon">💧</span>
                    <h3>Mobile IV Therapy - Scottsdale</h3>
                    <div class="category-subtitle">#1 Rated Mobile IV Service</div>
                    <p>Licensed medical professionals deliver premium IV therapy directly to your location in Scottsdale, AZ. Same-day availability with hospital-grade treatments.</p>

                    <div class="treatments-grid hover-treatment-grid">
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">💧</div>
                            <div class="card-info">
                                <h4>Hydration Boost - $150</h4>
                                <p>Essential electrolytes & fluids for optimal hydration and energy.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">🍺</div>
                            <div class="card-info">
                                <h4>Hangover Recovery - $180</h4>
                                <p>Fast relief & rehydration with anti-nausea and headache relief.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">⚡</div>
                            <div class="card-info">
                                <h4>Energy & B-Complex - $175</h4>
                                <p>B-vitamins & energy boost for mental clarity and physical vitality.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">✨</div>
                            <div class="card-info">
                                <h4>Beauty & Glow - $220</h4>
                                <p>Anti-aging nutrients & glutathione for radiant skin and wellness.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">🛡️</div>
                            <div class="card-info">
                                <h4>Immunity Support - $200</h4>
                                <p>Vitamin C & immune boosters to strengthen your natural defenses.</p>
                            </div>
                        </div>
                        <div class="treatment-item hover-card-item">
                            <div class="card-face">🏃</div>
                            <div class="card-info">
                                <h4>Athletic Performance - $250</h4>
                                <p>Recovery & performance optimization for athletes and active individuals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Advanced Visual Effects Showcase -->
    <section id="effects" class="shadow-showcase">
        <div class="container">
            <h1 class="shadow-title">Advanced Visual Effects</h1>
            <p class="shadow-description">Experience the power of advanced CSS with stunning text shadows, interactive hover effects, and 3D glassmorphism elements</p>
            
            <div class="shadow-section">
                <h1 class="shadow-text elegantshadow">Elegant Shadow</h1>
                <div class="effect-description">
                    <h3>Elegant Text Shadow</h3>
                    <p>A sophisticated multi-layered shadow effect creating depth and elegance with 28 progressive shadow layers for natural lighting simulation.</p>
                </div>
            </div>

            <div class="shadow-section">
                <h1 class="shadow-text deepshadow">Deep Shadow</h1>
                <div class="effect-description">
                    <h3>Deep 3D Shadow</h3>
                    <p>Dramatic depth effect with multiple vertical shadow layers creating a bold, three-dimensional appearance that seems to lift off the page.</p>
                </div>
            </div>

            <div class="shadow-section">
                <h1 class="shadow-text insetshadow">Inset Shadow</h1>
                <div class="effect-description">
                    <h3>Inset Text Shadow</h3>
                    <p>Subtle carved-in effect using carefully positioned shadows to create the illusion of text pressed into the surface.</p>
                </div>
            </div>

            <div class="shadow-section">
                <h1 class="shadow-text retroshadow">Retro Shadow</h1>
                <div class="effect-description">
                    <h3>Retro Style Shadow</h3>
                    <p>Classic vintage look with offset shadows creating a nostalgic, old-school aesthetic perfect for retro-themed designs.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Interactive Hover Effects -->
    <section class="interactive-section">
        <div class="container">
            <h2 class="interactive-title">Direction-Aware Hover Effects</h2>
            <p class="interactive-description">Hover from different directions to see the 3D flip effect in action</p>
            
            <div class="hover-container">
                <ul class="hover-grid">
                    <li>
                        <a href="#" class="normal">🏥</a>
                        <div class="info">
                            <h3>Medical Wellness</h3>
                            <p>Comprehensive hormone therapy and anti-aging treatments for optimal health.</p>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="normal">💧</a>
                        <div class="info">
                            <h3>IV Therapy</h3>
                            <p>Premium mobile IV therapy delivered directly to your location.</p>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="normal">🎯</a>
                        <div class="info">
                            <h3>Weight Management</h3>
                            <p>Medical-grade weight loss programs tailored to your needs.</p>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="normal">⚡</a>
                        <div class="info">
                            <h3>Energy Boost</h3>
                            <p>Revitalize your energy levels with our specialized treatments.</p>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="normal">🌟</a>
                        <div class="info">
                            <h3>Anti-Aging</h3>
                            <p>Advanced treatments to restore your youthful vitality.</p>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="normal">💪</a>
                        <div class="info">
                            <h3>Sexual Wellness</h3>
                            <p>Restore confidence with our specialized wellness programs.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <!-- 3D Glassmorphism Icon -->
    <section class="icon-section">
        <div class="icon-main">
            <div class="icon">
                <div class="icon__glyph">
                    <div class="icon__glyph-part"></div>
                    <div class="icon__glyph-part"></div>
                    <div class="icon__glyph-part"></div>
                    <div class="icon__glyph-part"></div>
                </div>
            </div>
        </div>
        <div class="effect-description" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 600px;">
            <h3>3D Glassmorphism Icon</h3>
            <p>A stunning 3D icon featuring layered shadows, gradients, and backdrop blur for a modern, premium appearance.</p>
        </div>
    </section>

    <!-- IV Therapy Section -->
    <section id="iv-therapy" class="iv-section">
        <div class="container">
            <div class="iv-content">
                <div class="scroll-animate">
                    <h2 class="shadow-text deepshadow">Mobile IV Therapy - Scottsdale</h2>
                    <h3>Wellness Delivered, Anytime, Anywhere</h3>
                    <p>Experience the convenience of professional IV therapy in the comfort of your home, office, or hotel. Our licensed medical professionals bring hospital-grade treatments directly to you in Scottsdale, AZ.</p>
                    
                    <ul class="iv-features">
                        <li>Licensed medical professionals</li>
                        <li>Same-day availability in Scottsdale area</li>
                        <li>FDA-approved medications and vitamins</li>
                        <li>Sterile, hospital-grade equipment</li>
                        <li>Customized treatments for your needs</li>
                        <li>Group bookings and events available</li>
                    </ul>

                    <a href="#contact" class="btn btn-iv-therapy">📱 Book Mobile IV Session</a>
                </div>
                <div class="scroll-animate">
                    <div style="position: relative; overflow: hidden; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);">
                        <img src="https://cdn.builder.io/o/assets%2F8b73c477407048d0945425bdc93ba34d%2F8c310cc2e156430ab69fb00c617ff790?alt=media&token=bf089e67-ece4-4858-9e69-9acf5a132296&apiKey=8b73c477407048d0945425bdc93ba34d" alt="Stay Dripped IV & Wellness Co. - Premium Mobile IV Therapy" style="width: 100%; height: 500px; object-fit: cover; transition: transform 0.4s ease;">
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(61, 156, 210, 0.1), rgba(16, 185, 129, 0.1)); opacity: 0; transition: opacity 0.3s ease;" class="image-overlay"></div>
                    </div>
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
                    <p style="margin-bottom: 24px; line-height: 1.6; opacity: 0.8;">Leading provider of personalized health solutions, specializing in hormone therapy, weight management, anti-aging treatments, and premium mobile IV therapy in Scottsdale, AZ.</p>
                    <div>
                        <p style="margin-bottom: 8px;">📞 (480) 602-0444</p>
                        <p style="margin-bottom: 8px;">✉️ info@vitabella.com</p>
                        <p>📍 7014 E Camelback Rd suite b100 a, Scottsdale, AZ 85251</p>
                    </div>
                </div>
                <div>
                    <h4>WELLNESS TREATMENTS</h4>
                    <ul>
                        <li><a href="#">Hormone Therapy</a></li>
                        <li><a href="#">Weight Loss</a></li>
                        <li><a href="#">Anti-Aging</a></li>
                        <li><a href="#">Sexual Wellness</a></li>
                        <li><a href="#">Cognitive Health</a></li>
                        <li><a href="#">Hair Loss Treatment</a></li>
                    </ul>
                </div>
                <div>
                    <h4>MOBILE IV THERAPY</h4>
                    <ul>
                        <li><a href="#">Hydration Boost - $150</a></li>
                        <li><a href="#">Energy & Immunity - $175</a></li>
                        <li><a href="#">Hangover Recovery - $180</a></li>
                        <li><a href="#">Beauty & Glow - $220</a></li>
                        <li><a href="#">Athletic Performance - $250</a></li>
                        <li><a href="#">Group Bookings</a></li>
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
                    closeModal();
                }
            });
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

        // Loading animation with enhanced effects
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';

            // Initialize all enhanced visual effects
            initScrollAnimations();
            initDirectionalHovers();
            addSparkleEffect();
            enhanceButtons();

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
