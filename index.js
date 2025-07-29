const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Serve the main HTML file for all routes
  if (req.method === 'GET') {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stay Dripped IV & Wellness Co. - Mobile IV Therapy & Wellness Services</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-links a:hover {
            color: #667eea;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #667eea;
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .auth-buttons {
            display: flex;
            gap: 1rem;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .btn-secondary {
            background: transparent;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .btn-secondary:hover {
            background: #667eea;
            color: white;
        }

        .mobile-menu {
            display: none;
            cursor: pointer;
            background: none;
            border: none;
            color: #333;
        }

        .mobile-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem;
        }

        .mobile-nav.active {
            display: block;
        }

        .mobile-nav ul {
            list-style: none;
            padding: 0;
        }

        .mobile-nav ul li {
            margin: 0.5rem 0;
        }

        .mobile-nav ul li a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            display: block;
            padding: 0.5rem;
        }

        /* Hero Section */
        .hero {
            margin-top: 80px;
            padding: 4rem 0;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%),
                        url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Fb89394712c7344c8b110d19ff9a1157a?alt=media&token=65804092-fa18-4862-91d3-27dde5b0907a&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover no-repeat;
            background-attachment: fixed;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.1"><polygon points="0,0 1000,100 1000,0"/></svg>');
            pointer-events: none;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #fff, #f0f0ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Search Section */
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
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        /* Features Section */
        .features {
            padding: 4rem 0;
            background: white;
        }

        .features h2 {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 3rem;
            color: #333;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            text-align: center;
            padding: 2rem;
            border-radius: 20px;
            background: linear-gradient(135deg, #f8f9ff, #f0f4ff);
            transition: all 0.3s ease;
            border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            color: white;
            font-size: 2rem;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }

        .feature-card p {
            color: #666;
            line-height: 1.6;
        }

        /* Car Grid */
        .cars-section {
            padding: 4rem 0;
            background: #f8f9ff;
        }

        .cars-section h2 {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 3rem;
            color: #333;
        }

        .filter-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 0.5rem 1rem;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .filter-btn.active,
        .filter-btn:hover {
            border-color: #667eea;
            background: #667eea;
            color: white;
        }

        .cars-grid, .packages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .car-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
        }

        .car-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .car-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), 
                        url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2F0929ad20ec73438485e2a2cd329e0294?alt=media&token=6d8d55aa-c1a6-43fe-90d1-4489ea26d289&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            position: relative;
            overflow: hidden;
        }

        .car-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
        }

        .favorite-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .favorite-btn:hover {
            background: white;
            transform: scale(1.1);
        }

        .favorite-btn.active {
            color: #ff4757;
        }

        .car-info {
            padding: 1.5rem;
        }

        .car-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
        }

        .car-name-year {
            flex: 1;
        }

        .car-name {
            font-size: 1.25rem;
            font-weight: 600;
            color: #333;
            margin: 0;
        }

        .car-year {
            color: #666;
            font-size: 0.9rem;
            margin: 0;
        }

        .car-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #667eea;
            text-align: right;
        }

        .car-price small {
            font-size: 0.7rem;
            color: #999;
            display: block;
        }

        .car-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .stars {
            display: flex;
            color: #ffd700;
        }

        .rating-text {
            color: #666;
            font-size: 0.9rem;
        }

        .car-specs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #666;
        }

        .spec-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .car-features {
            margin-bottom: 1.5rem;
        }

        .features-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .feature-tag {
            background: #f0f4ff;
            color: #667eea;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .car-actions {
            display: flex;
            gap: 1rem;
        }

        .btn-rent {
            flex: 1;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-rent:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        /* Neumorphic Modal Styles */
        @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500&display=swap");

        :root {
            --primary: #e5e8ef;
            --primary-dark: #e1e4ea;
            --secondary-lime: #e1ff2d;
            --secondary-lavender: #d3b7f8;
            --primary-box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001;
            --secondary-box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
                -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
                inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
                inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
            --font: "Nunito Sans", sans-serif;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--primary);
            display: grid;
            place-items: center;
            z-index: 2000;
            font-family: "Nunito Sans", sans-serif;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal {
            display: flex;
            flex-direction: column;
            padding-block: 24px;
            border-radius: 20px;
            background: linear-gradient(145deg, #f1f4fa, #cbcdd3);
            box-shadow: var(--primary-box-shadow);
            height: 360px;
            width: 300px;
            justify-content: space-between;
            align-items: center;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .modal-overlay.active .modal {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #5a5a5a;
            z-index: 101;
        }

        .modal input {
            border: none;
            height: 32px;
            border-radius: 10px;
            background: linear-gradient(145deg, #f1f4fa, #cbcdd3);
            outline: none;
            font-family: "Nunito Sans", sans-serif;
        }

        .modal input[type="text"],
        .modal input[type="email"],
        .modal input[type="password"] {
            box-shadow: var(--secondary-box-shadow);
            padding-inline: 20px;
            height: 49px;
            width: 60%;
        }

        .modal input[type="submit"] {
            box-shadow: var(--primary-box-shadow);
            cursor: pointer;
            font-weight: 800;
            letter-spacing: 0.8px;
            height: 50px;
            font-size: 1rem;
            color: #5a5a5a;
            position: relative;
            z-index: 100;
            width: 100%;
        }

        #title {
            color: #5a5a5a;
            font-weight: 800;
            font-size: 1.1rem;
            line-height: 1;
            letter-spacing: 0.8px;
        }

        #linksParent {
            display: flex;
            gap: 8px;
            flex-direction: column;
            align-items: center;
        }

        #linksParent > a {
            font-family: "Nunito Sans", sans-serif;
            font-size: 0.8rem;
            color: gray;
            text-decoration: underline;
            cursor: pointer;
        }

        .rip1,
        .rip2 {
            filter: blur(1px);
            width: 100%;
            position: absolute;
            height: 50px;
            left: 0;
            bottom: 0;
        }

        .rip1 {
            box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7, -0.4rem -0.4rem 0.8rem #fff;
            background: linear-gradient(to bottom right, #fff 0%, #c8d0e7 100%);
            animation: waves 2s linear infinite;
        }

        .rip2 {
            box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7, -0.4rem -0.4rem 0.8rem #fff;
            animation: waves 2s linear 1s infinite;
        }

        @keyframes waves {
            0% {
                transform: scale(0.7);
                opacity: 1;
                border-radius: 10px;
            }

            50% {
                opacity: 1;
                border-radius: 15px;
            }

            100% {
                transform: scale(2);
                opacity: 0;
                border-radius: 20px;
            }
        }

        #button {
            width: 40%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .alert {
            padding: 0.75rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 500;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        /* Footer */
        .footer {
            background: #333;
            color: white;
            padding: 3rem 0 1rem;
            text-align: center;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
            text-align: left;
        }

        .footer-section h3 {
            margin-bottom: 1rem;
            color: #667eea;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
            color: #ccc;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
            color: #667eea;
        }

        .footer-bottom {
            border-top: 1px solid #555;
            padding-top: 1rem;
            text-align: center;
            color: #999;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
        }

        .social-links a {
            color: #ccc;
            transition: color 0.3s ease;
        }

        .social-links a:hover {
            color: #667eea;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .mobile-menu {
                display: block;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .search-form {
                grid-template-columns: 1fr;
            }

            .cars-grid {
                grid-template-columns: 1fr;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .car-specs {
                grid-template-columns: 1fr;
            }

            .filter-controls {
                flex-direction: column;
                align-items: center;
            }

            .premium-showcase .container > div {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }

            .showcase-image {
                height: 300px !important;
            }

            .showcase-content h2 {
                font-size: 2rem !important;
            }
        }

        /* Loading Animation */
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Animations */
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .slide-in {
            animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #333;
            font-weight: 500;
        }

        .hidden {
            display: none !important;
        }

        /* Icon replacements */
        .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="logo">Stay Dripped IV & Wellness Co.</div>
            <ul class="nav-links">
                <li><a href="#home" onclick="scrollToSection('home')">Home</a></li>
                <li><a href="#packages" onclick="scrollToSection('packages')">IV Packages</a></li>
                <li><a href="#services" onclick="scrollToSection('services')">Services</a></li>
                <li><a href="#wellness" onclick="scrollToSection('wellness')">Wellness</a></li>
                <li><a href="#about" onclick="scrollToSection('about')">About</a></li>
                <li><a href="#" onclick="showFAQ()">FAQ</a></li>
                <li><a href="#contact" onclick="scrollToSection('contact')">Contact</a></li>
            </ul>
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
                    <div class="user-info">
                        <span class="icon">👤</span>
                        <span id="userWelcome">Welcome, User!</span>
                        <button class="btn btn-secondary" onclick="logout()" style="margin-left: 1rem;">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <button class="mobile-menu" onclick="toggleMenu()">
                <span class="icon" id="menuIcon">☰</span>
            </button>
            <div class="mobile-nav" id="mobileNav">
                <ul>
                    <li><a href="#home" onclick="scrollToSection('home'); toggleMenu();">Home</a></li>
                    <li><a href="#packages" onclick="scrollToSection('packages'); toggleMenu();">IV Packages</a></li>
                    <li><a href="#services" onclick="scrollToSection('services'); toggleMenu();">Wellness</a></li>
                    <li><a href="#about" onclick="scrollToSection('about'); toggleMenu();">About</a></li>
                    <li><a href="#" onclick="showFAQ(); toggleMenu();">FAQ</a></li>
                    <li><a href="#contact" onclick="scrollToSection('contact'); toggleMenu();">Contact</a></li>
                </ul>
                <div style="margin-top: 1rem; display: flex; gap: 1rem;">
                    <button class="btn btn-secondary" onclick="showLogin(); toggleMenu();">Login</button>
                    <button class="btn btn-primary" onclick="showSignup(); toggleMenu();">Sign Up</button>
                </div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content fade-in">
                <h1>Premium Mobile IV Therapy</h1>
                <p>Experience top-rated mobile IV therapy in Scottsdale, AZ. From hydration boosts to hangover cures, we bring wellness directly to you. Professional, convenient, and effective.</p>
                <div class="search-section">
                    <div class="search-form">
                        <div class="form-group">
                            <label for="service-location">
                                <span class="icon">📍</span>
                                Service Location
                            </label>
                            <input type="text" id="service-location" placeholder="Enter your address in Scottsdale, AZ">
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
                                <option value="all">All Treatments</option>
                                <option value="hydration">Hydration</option>
                                <option value="energy">Energy Boost</option>
                                <option value="immunity">Immunity</option>
                                <option value="recovery">Recovery</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" onclick="bookService()" style="width: 100%; margin-top: 1.5rem;">
                                <span class="icon">💉</span>
                                Book IV Therapy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Showcase Section -->
    <section class="premium-showcase" style="padding: 4rem 0; background: #fff; position: relative; overflow: hidden;">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; min-height: 400px;">
                <div class="showcase-content" style="z-index: 2; position: relative;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #333; line-height: 1.2;">
                        Premium Mobile IV Therapy <br>Delivered to You
                    </h2>
                    <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin-bottom: 2rem;">
                        Our licensed medical professionals bring high-quality IV therapy directly to your location.
                        Experience the convenience of premium wellness treatments in the comfort of your home, office, or hotel.
                    </p>
                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">1000+</h3>
                            <p style="color: #666; font-size: 0.9rem;">Happy Clients</p>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">24/7</h3>
                            <p style="color: #666; font-size: 0.9rem;">Availability</p>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">5.0</h3>
                            <p style="color: #666; font-size: 0.9rem;">Rating</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="scrollToSection('services')" style="padding: 1rem 2rem; font-size: 1rem;">
                        View Our Services
                        <span class="icon">→</span>
                    </button>
                </div>
                <div class="showcase-image" style="position: relative; height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
                    <img src="https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Fb89394712c7344c8b110d19ff9a1157a?alt=media&token=65804092-fa18-4862-91d3-27dde5b0907a&apiKey=d86ad443e90f49f6824eddb927a8e06f"
                         alt="Mobile IV therapy service"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                    <div style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.9); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #667eea;">
                        Mobile IV Therapy
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="services">
        <div class="container">
            <h2>Why Choose Stay Dripped IV & Wellness Co.?</h2>
            <div class="features-grid">
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        👨‍⚕️
                    </div>
                    <h3>Licensed Professionals</h3>
                    <p>All our IV therapies are administered by licensed medical professionals ensuring safety and efficacy.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        🏠
                    </div>
                    <h3>Mobile Service</h3>
                    <p>We come to you! Experience premium IV therapy in the comfort of your home, office, or hotel.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        ⚡
                    </div>
                    <h3>Fast Relief</h3>
                    <p>Feel better quickly with our high-quality IV treatments designed for rapid absorption and results.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        🛡️
                    </div>
                    <h3>Safe & Sterile</h3>
                    <p>We use only pharmaceutical-grade ingredients and maintain strict sterile protocols for your safety.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        📱
                    </div>
                    <h3>Easy Booking</h3>
                    <p>Simple online booking system with flexible scheduling to fit your busy lifestyle.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        🎯
                    </div>
                    <h3>Customized Treatments</h3>
                    <p>Personalized IV formulations tailored to your specific health and wellness goals.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- IV Therapy Packages Section -->
    <section class="therapy-packages-section" id="packages" style="padding: 4rem 0; background: #f8f9ff;">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">IV Therapy Packages</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                Choose from our comprehensive selection of IV therapy treatments designed to boost your health, energy, and wellness.
                All treatments are administered by licensed medical professionals.
            </p>
            <div class="filter-controls">
                <button class="filter-btn active" onclick="filterPackages('all')">All Packages</button>
                <button class="filter-btn" onclick="filterPackages('hydration')">Hydration</button>
                <button class="filter-btn" onclick="filterPackages('energy')">Energy</button>
                <button class="filter-btn" onclick="filterPackages('immunity')">Immunity</button>
                <button class="filter-btn" onclick="filterPackages('recovery')">Recovery</button>
                <button class="filter-btn" onclick="filterPackages('beauty')">Beauty</button>
            </div>
            <div class="packages-grid" id="packages-grid">
                <!-- IV Therapy packages will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Wellness Section -->
    <section class="wellness-section" style="padding: 4rem 0; background: linear-gradient(135deg, #f8f9ff 0%, #e8f4f8 100%);">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; color: #333;">Complete Wellness Experience</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; min-height: 400px; margin-bottom: 3rem;">
                <div class="wellness-content">
                    <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; color: #333;">
                        Travel Better, <span style="color: #667eea;">Feel Better</span>
                    </h3>
                    <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin-bottom: 2rem;">
                        Your journey doesn't end with premium transportation. Discover our comprehensive wellness programs designed to enhance your travel experience and overall well-being.
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                        <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                            <h4 style="color: #667eea; margin-bottom: 0.5rem;">🧘‍♂️ Travel Wellness</h4>
                            <p style="color: #666; font-size: 0.9rem;">Maintain your health routine while traveling</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                            <h4 style="color: #667eea; margin-bottom: 0.5rem;">💊 Health Solutions</h4>
                            <p style="color: #666; font-size: 0.9rem;">Convenient healthcare on-the-go</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1rem;">
                        Explore Wellness
                        <span class="icon">→</span>
                    </button>
                </div>
                <div class="wellness-image" style="position: relative; height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
                    <img src="https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2F582c53edf9ad408e849c4a3b19f126c0?alt=media&token=eb3e2ece-0a84-4573-a9a6-58d401ee1713&apiKey=d86ad443e90f49f6824eddb927a8e06f"
                         alt="Wellness experience"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                    <div style="position: absolute; top: 20px; left: 20px; background: rgba(102, 126, 234, 0.9); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: white;">
                        Premium Wellness
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Health Experts Section -->
    <section class="health-experts" style="padding: 4rem 0; background: #fff;">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">Backed by Health Experts</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                Our wellness programs are developed and supervised by licensed medical professionals and health experts.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                        👨‍⚕️
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Dr. Robert Lieske</h3>
                        <p style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">Chief Medical Officer</p>
                        <p style="color: #666; font-size: 0.9rem;">Anti-aging and Hormone specialist with decades of experience in wellness medicine.</p>
                    </div>
                </div>
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #764ba2, #667eea); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                        👩‍⚕️
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Dr. Brooke Blumetti</h3>
                        <p style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">Chief of Dermatology</p>
                        <p style="color: #666; font-size: 0.9rem;">Dermatologist and Advanced Skin-Care Specialist focused on travel wellness.</p>
                    </div>
                </div>
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                        👨‍⚕️
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Dr. Daniel Bryan</h3>
                        <p style="color: #667eea; font-weight: 600; margin-bottom: 0.5rem;">Medical Advisor</p>
                        <p style="color: #666; font-size: 0.9rem;">Specialized in travel medicine and wellness optimization for frequent travelers.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Wellness Categories -->
    <section class="wellness-categories" style="padding: 4rem 0; background: #f8f9ff;">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; color: #333;">Complete Wellness Solutions</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                <!-- Sexual Wellness -->
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Fe6c13a7f6a944f5991ab32046cd46508?alt=media&token=342f325b-a5ac-4336-bfbb-78139d14438b&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover; position: relative;">
                        <div style="position: absolute; inset: 0; background: rgba(102, 126, 234, 0.8); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                            💗 Sexual Wellness
                        </div>
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Sexual Wellness Options</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Under proper supervision of a Vita Bella medical professional, our medicine can safely boost both mental and physical capabilities.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Hormone Therapy</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Enhancement</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Confidence</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
                <!-- Weight Loss -->
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #28a745, #20c997); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        ⚖️ Weight Loss
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Weight Loss Options</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Doctor-trusted solutions for sustainable weight management. Clinically-proven treatments to help you achieve your fitness goals.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">GLP-1</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Metabolism</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Fitness</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2F245d596b8190417a9d9c08b8abe228e4?alt=media&token=32301967-14aa-4c71-b5e2-1727a52b1b0f&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover; position: relative;">
                        <div style="position: absolute; inset: 0; background: rgba(102, 126, 234, 0.8); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                            🧬 Anti-Aging
                        </div>
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Anti-Aging Solutions</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Science-backed therapies to help you look and feel younger, longer. Perfect for maintaining vitality during travel.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">NAD+ Therapy</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Peptides</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Supplements</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #764ba2, #667eea); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        🧠 Cognitive Health
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Cognitive Enhancement</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Optimize mental clarity and focus for peak performance during business travel and demanding schedules.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Nootropics</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Brain Training</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Memory</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        💪 Wellness Recovery
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Travel Recovery</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Advanced treatments to help you recover from jet lag, travel fatigue, and maintain peak energy levels.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">IV Therapy</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Recovery</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Energy</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
                <!-- Hair Loss Treatment -->
                <div style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="height: 200px; background: linear-gradient(135deg, #6f42c1, #5a6acf); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        💇‍♂️ Hair Loss
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Hair Loss Treatment</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Advanced hair restoration solutions to help you regain confidence and maintain a professional appearance.</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Finasteride</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Growth</span>
                            <span style="background: #f0f4ff; color: #667eea; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Confidence</span>
                        </div>
                        <button style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 600; cursor: pointer; width: 100%;">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Treatment Process Section -->
    <section class="treatment-process" style="padding: 4rem 0; background: #fff;">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">How You Get Your Treatments</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                After becoming a member, you will onboard and have a consultation with a licensed provider.
                During this consultation, you can discuss your goals and explore all treatments available.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: 700;">
                        1
                    </div>
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Select Program and Labs</h3>
                    <p style="color: #666; font-size: 0.9rem;">Choose the membership and labs that are best tailored to your unique health needs and goals.</p>
                </div>
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: 700;">
                        2
                    </div>
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Meet With Provider</h3>
                    <p style="color: #666; font-size: 0.9rem;">Have a virtual 1-on-1 with a licensed provider, at your convenience, to review your health history.</p>
                </div>
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: 700;">
                        3
                    </div>
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Begin Treatment</h3>
                    <p style="color: #666; font-size: 0.9rem;">Your prescriptions will be promptly shipped from our U.S.-based pharmacies in discreet packaging.</p>
                </div>
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: 700;">
                        4
                    </div>
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Monitor, Adjust, Optimize</h3>
                    <p style="color: #666; font-size: 0.9rem;">Your provider will be there with personalized quarterly check-ins included in your membership.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Wellness Benefits Section -->
    <section class="wellness-benefits" style="padding: 4rem 0; background: linear-gradient(135deg, #f8f9ff 0%, #e8f4f8 100%);">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">One Simple Process. A Lifetime of Benefits.</h2>
            <p style="text-align: center; color: #666; margin-bottom: 3rem; max-width: 800px; margin-left: auto; margin-right: auto; font-size: 1.1rem;">
                Whether you're looking to unlock your body's full potential, elevate your fitness, or reclaim your confidence,
                we're here to guide and support you every step of the way.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                <div style="background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                    <h3 style="font-size: 1.3rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Personalized Treatment Plans</h3>
                    <p style="color: #666; line-height: 1.6;">Tailored wellness solutions designed specifically for your health goals and travel lifestyle.</p>
                </div>
                <div style="background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍⚕️</div>
                    <h3 style="font-size: 1.3rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Licensed Medical Professionals</h3>
                    <p style="color: #666; line-height: 1.6;">All treatments supervised by qualified healthcare providers ensuring safety and efficacy.</p>
                </div>
                <div style="background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🚚</div>
                    <h3 style="font-size: 1.3rem; font-weight: 600; color: #333; margin-bottom: 1rem;">Convenient Delivery</h3>
                    <p style="color: #666; line-height: 1.6;">Discreet, direct-to-door shipping with express delivery options for busy travelers.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Customer Testimonials -->
    <section class="testimonials" style="padding: 4rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <div class="container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">What Our Customers Say</h2>
                <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <span style="color: #ffd700; font-size: 1.5rem;">★★★★★</span>
                    <span style="font-size: 1.1rem;">4.9 out of 5 stars</span>
                </div>
                <p style="opacity: 0.9;">From 10,000+ verified customers</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(10px);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #ffd700, #ffed4e); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                            👨‍💼
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600;">Jonathan M.</h4>
                            <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">Business Traveler</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic;">"The combination of premium car service and wellness support has transformed my business travel experience. I arrive refreshed and ready to perform."</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(255, 255, 255, 0.2); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Customer</span>
                    </div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(10px);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #ffd700, #ffed4e); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                            👩‍💼
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600;">Ashley P.</h4>
                            <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">Frequent Traveler</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic;">"Amazing service! The wellness programs help me maintain my energy and health despite constant travel. The car service is just the cherry on top."</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(255, 255, 255, 0.2); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Customer</span>
                    </div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; backdrop-filter: blur(10px);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #ffd700, #ffed4e); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                            👨
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600;">Brad O.</h4>
                            <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">Executive</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic;">"The complete package - luxury transportation and cutting-edge wellness solutions. This is the future of premium travel services."</p>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(255, 255, 255, 0.2); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Customer</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced Newsletter Signup -->
    <section class="newsletter" style="padding: 4rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" fill=\"white\" opacity=\"0.05\"><circle cx=\"20\" cy=\"20\" r=\"2\"/><circle cx=\"80\" cy=\"20\" r=\"2\"/><circle cx=\"20\" cy=\"80\" r=\"2\"/><circle cx=\"80\" cy=\"80\" r=\"2\"/><circle cx=\"50\" cy=\"50\" r=\"3\"/></svg>'); pointer-events: none;"></div>
        <div class="container" style="position: relative; z-index: 2;">
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.8rem; font-weight: 700; margin-bottom: 1rem; color: white;">Never Miss a Deal or Update</h2>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.2rem; line-height: 1.6;">
                    Subscribe to our newsletter to stay in front of all the future deals, promotions and new treatments.
                    Stay up-to-date with the future you.
                </p>
                <div style="display: flex; gap: 1rem; max-width: 500px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 50px; backdrop-filter: blur(10px);">
                    <input
                        type="email"
                        placeholder="Enter your e-mail address"
                        style="flex: 1; padding: 1rem 1.5rem; border: none; border-radius: 25px; font-size: 1rem; background: white; outline: none;"
                        id="newsletter-email"
                    >
                    <button
                        onclick="handleNewsletterSignup()"
                        style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'"
                    >
                        Sign Up Now
                    </button>
                </div>
                <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 1.5rem;">
                    Join 10,000+ members receiving exclusive wellness tips and travel health insights.
                    <br>Unsubscribe at any time.
                </p>
                <div style="display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 2rem; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">✓</span>
                        <span style="font-size: 0.9rem;">Exclusive Deals</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">✓</span>
                        <span style="font-size: 0.9rem;">Wellness Tips</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">✓</span>
                        <span style="font-size: 0.9rem;">New Treatment Updates</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="features" id="about" style="background: #f8f9ff;">
        <div class="container">
            <h2>About Stay Dripped IV & Wellness Co.</h2>
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <p style="font-size: 1.1rem; color: #666; line-height: 1.8; margin-bottom: 2rem;">
                    Founded in 2020, Stay Dripped IV & Wellness Co. is Scottsdale's premier mobile IV therapy and wellness service. We're committed to bringing high-quality, medically supervised treatments directly to you, wherever you need them most.
                </p>
                <p style="font-size: 1rem; color: #666; line-height: 1.8; margin-bottom: 2rem;">
                    Our licensed medical professionals use only pharmaceutical-grade ingredients and FDA-approved medications to ensure your safety and optimal results. Whether you're recovering from a night out, boosting your immune system, or enhancing your performance, we provide personalized wellness solutions tailored to your lifestyle.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem;">
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">5,000+</h3>
                        <p style="color: #666;">Treatments Delivered</p>
                    </div>
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">100%</h3>
                        <p style="color: #666;">Licensed Professionals</p>
                    </div>
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">Scottsdale</h3>
                        <p style="color: #666;">Service Area</p>
                    </div>
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">24/7</h3>
                        <p style="color: #666;">Customer Support</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Stay Dripped IV & Wellness Co.</h3>
                    <p>Premier mobile IV therapy and wellness services in Scottsdale, AZ. Licensed medical professionals bringing personalized health and wellness treatments directly to you.</p>
                    <div class="social-links">
                        <a href="#">📘</a>
                        <a href="#">🐦</a>
                        <a href="#">📷</a>
                        <a href="#">💼</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#packages">IV Packages</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#packages">IV Therapy</a></li>
                        <li><a href="#services">Wellness Programs</a></li>
                        <li><a href="#services">Mobile Services</a></li>
                        <li><a href="#services">Health Consultations</a></li>
                        <li><a href="#" onclick="showFAQ()">FAQ</a></li>
                        <li><a href="#services">24/7 Support</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <ul>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>✉️ info@ridex.com</li>
                        <li>📍 123 Business Ave, City, State 12345</li>
                        <li>🕒 24/7 Customer Support</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Ridex. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </footer>

    <!-- Login Modal -->
    <div id="loginModal" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div id="title">LOGIN</div>
            <input type="email" id="loginEmail" placeholder="Email">
            <input type="password" id="loginPassword" placeholder="Password">
            <div id="button">
                <div class="rip1"></div>
                <div class="rip2"></div>
                <input type="submit" value="LOGIN" onclick="handleLogin()">
            </div>
            <div id="linksParent">
                <a onclick="showSignup()">Don't have an account? Sign up</a>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
    </div>

    <!-- Signup Modal -->
    <div id="signupModal" class="modal-overlay">
        <div class="modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div id="title">SIGN UP</div>
            <input type="text" id="signupName" placeholder="Full Name">
            <input type="email" id="signupEmail" placeholder="Email">
            <input type="password" id="signupPassword" placeholder="Password">
            <div id="button">
                <div class="rip1"></div>
                <div class="rip2"></div>
                <input type="submit" value="SIGN UP" onclick="handleSignup()">
            </div>
            <div id="linksParent">
                <a onclick="showLogin()">Already have an account? Login</a>
            </div>
        </div>
    </div>

    <script>
        // IV Therapy Packages data
        const ivPackages = [
            {
                id: 1,
                name: "The Classic Hydration",
                type: "hydration",
                price: 150,
                duration: "30-45 mins",
                rating: 4.9,
                reviews: 324,
                description: "Perfect for dehydration, hangovers, and general wellness",
                ingredients: ["Normal Saline", "Electrolytes", "B-Complex", "Vitamin C"],
                benefits: ["Rapid rehydration", "Hangover relief", "Energy boost", "Improved skin"],
                favorite: false,
                popular: true
            },
            {
                id: 2,
                name: "Energy & Performance",
                type: "energy",
                price: 225,
                duration: "45-60 mins",
                rating: 4.8,
                reviews: 198,
                description: "Boost energy levels and enhance athletic performance",
                ingredients: ["Amino Acids", "B-Complex", "Vitamin C", "Magnesium", "Taurine"],
                benefits: ["Increased energy", "Enhanced focus", "Muscle recovery", "Endurance boost"],
                favorite: false,
                popular: false
            },
            {
                id: 3,
                name: "Immunity Boost",
                type: "immunity",
                price: 200,
                duration: "45 mins",
                rating: 4.9,
                reviews: 267,
                description: "Strengthen your immune system and fight off illness",
                ingredients: ["High-dose Vitamin C", "Zinc", "Glutathione", "B-Complex"],
                benefits: ["Immune support", "Antioxidant boost", "Faster recovery", "Illness prevention"],
                favorite: false,
                popular: true
            },
            {
                id: 4,
                name: "Recovery & Detox",
                type: "recovery",
                price: 275,
                duration: "60 mins",
                rating: 4.7,
                reviews: 156,
                description: "Accelerate recovery and eliminate toxins",
                ingredients: ["Glutathione", "NAD+", "Vitamin C", "B-Complex", "Magnesium"],
                benefits: ["Cellular repair", "Toxin elimination", "Anti-aging", "Mental clarity"],
                favorite: false,
                popular: false
            },
            {
                id: 5,
                name: "Beauty Glow",
                type: "beauty",
                price: 250,
                duration: "45 mins",
                rating: 4.8,
                reviews: 189,
                description: "Enhance skin radiance and promote healthy hair and nails",
                ingredients: ["Biotin", "Glutathione", "Vitamin C", "Collagen precursors"],
                benefits: ["Glowing skin", "Hair growth", "Nail strength", "Anti-aging"],
                favorite: false,
                popular: true
            },
            {
                id: 6,
                name: "The Executive",
                type: "energy",
                price: 300,
                duration: "60 mins",
                rating: 4.9,
                reviews: 142,
                description: "Premium package for busy professionals",
                ingredients: ["NAD+", "B-Complex", "Vitamin C", "Magnesium", "Amino Acids", "Glutathione"],
                benefits: ["Mental clarity", "Stress relief", "Energy boost", "Immune support"],
                favorite: false,
                popular: false
            },
            {
                id: 7,
                name: "Hangover Cure",
                type: "recovery",
                price: 175,
                duration: "30 mins",
                rating: 4.8,
                reviews: 412,
                description: "Fast relief from hangover symptoms",
                ingredients: ["Normal Saline", "B-Complex", "Anti-nausea medication", "Electrolytes"],
                benefits: ["Nausea relief", "Rehydration", "Headache relief", "Energy restoration"],
                favorite: false,
                popular: true
            },
            {
                id: 8,
                name: "Athletic Recovery",
                type: "recovery",
                price: 225,
                duration: "45 mins",
                rating: 4.9,
                reviews: 178,
                description: "Optimize recovery for athletes and fitness enthusiasts",
                ingredients: ["Amino Acids", "Magnesium", "B-Complex", "Vitamin C", "Electrolytes"],
                benefits: ["Muscle recovery", "Reduced inflammation", "Energy restoration", "Performance enhancement"],
                favorite: false,
                popular: false
            }
        ];

        let currentFilter = 'all';
        let currentUser = null;

        // Initialize the page
        function initializePage() {
            loadPackages();
            setMinDate();
            checkUserSession();
        }

        // Use DOMContentLoaded for initialization
        document.addEventListener('DOMContentLoaded', initializePage);

        // Set minimum date to today for date inputs
        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            const serviceDateInput = document.getElementById('service-date');
            if (serviceDateInput) {
                serviceDateInput.min = today;
            }
        }

        // Load IV therapy packages into the grid
        function loadPackages() {
            const packagesGrid = document.getElementById('packages-grid');
            const filteredPackages = currentFilter === 'all' ? ivPackages : ivPackages.filter(pkg => pkg.type === currentFilter);

            packagesGrid.innerHTML = '';

            if (filteredPackages.length === 0) {
                packagesGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No packages found for the selected filter.</p>';
                return;
            }

            filteredPackages.forEach(pkg => {
                const packageCard = createPackageCard(pkg);
                packagesGrid.appendChild(packageCard);
            });
        }

        // Create package card element
        function createPackageCard(pkg) {
            const card = document.createElement('div');
            card.className = 'car-card fade-in'; // Reusing car-card styles
            const packageTypeIcons = {
                'hydration': '💧',
                'energy': '⚡',
                'immunity': '🛡️',
                'recovery': '🔄',
                'beauty': '✨'
            };

            card.innerHTML =
                '<div class="car-image" style="position: relative;">' +
                    '<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 4rem; z-index: 1;">' +
                        (packageTypeIcons[pkg.type] || '💉') +
                    '</div>' +
                    (pkg.popular ? '<div style="position: absolute; top: 10px; left: 10px; background: #ff4757; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; z-index: 2;">POPULAR</div>' : '') +
                    '<button class="favorite-btn ' + (pkg.favorite ? 'active' : '') + '" onclick="toggleFavorite(' + pkg.id + ')" style="z-index: 2;">♥</button>' +
                '</div>' +
                '<div class="car-info">' +
                    '<div class="car-header">' +
                        '<div class="car-name-year">' +
                            '<h3 class="car-name">' + pkg.name + '</h3>' +
                            '<p class="car-year">' + pkg.duration + '</p>' +
                        '</div>' +
                        '<div class="car-price">$' + pkg.price + '<small>per session</small></div>' +
                    '</div>' +
                    '<div class="car-rating">' +
                        '<div class="stars">' + generateStars(pkg.rating) + '</div>' +
                        '<span class="rating-text">' + pkg.rating + ' (' + pkg.reviews + ' reviews)</span>' +
                    '</div>' +
                    '<div style="margin: 1rem 0; padding: 1rem; background: #f8f9ff; border-radius: 10px;">' +
                        '<p style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">' + pkg.description + '</p>' +
                    '</div>' +
                    '<div class="car-features">' +
                        '<h4 style="font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Key Benefits:</h4>' +
                        '<div class="features-list">' +
                            pkg.benefits.map(benefit => '<span class="feature-tag">' + benefit + '</span>').join('') +
                        '</div>' +
                    '</div>' +
                    '<div class="car-actions" style="margin-top: 1rem;">' +
                        '<button class="btn-rent" onclick="bookPackage(' + pkg.id + ')">Book Now</button>' +
                    '</div>' +
                '</div>';
            return card;
        }

        // Generate star rating
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '⭐';
            }
            
            if (hasHalfStar) {
                stars += '��';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '☆';
            }
            
            return stars;
        }

        // Filter IV therapy packages
        function filterPackages(type) {
            currentFilter = type;

            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            loadPackages();
        }

        // Toggle favorite
        function toggleFavorite(packageId) {
            const pkg = ivPackages.find(p => p.id === packageId);
            if (pkg) {
                pkg.favorite = !pkg.favorite;
                loadPackages();
            }
        }

        // Book service
        function bookService() {
            const location = document.getElementById('service-location').value;
            const serviceDate = document.getElementById('service-date').value;
            const serviceTime = document.getElementById('service-time').value;
            const ivType = document.getElementById('iv-type-search').value;

            if (!location || !serviceDate || !serviceTime) {
                alert('Please fill in all required fields');
                return;
            }

            if (new Date(serviceDate) < new Date()) {
                alert('Service date cannot be in the past');
                return;
            }

            alert('IV Therapy booking confirmed! Details: ' + location + ', ' + serviceDate + ', ' + serviceTime);
        }

        // Book IV therapy package
        function bookPackage(packageId) {
            if (!currentUser) {
                alert('Please login to book a treatment');
                showLogin();
                return;
            }

            const pkg = ivPackages.find(p => p.id === packageId);
            if (pkg) {
                alert('Booking confirmed for ' + pkg.name + '! You will be redirected to payment. Our team will contact you to schedule your appointment.');
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

        function checkUserSession() {
            // Check if user was logged in (in a real app, this would check localStorage or session)
            // For demo purposes, we'll keep them logged out
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
            const menuIcon = document.getElementById('menuIcon');
            
            mobileNav.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                menuIcon.textContent = '✕';
            } else {
                menuIcon.textContent = '☰';
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

        // Handle service date validation
        const serviceDateInput = document.getElementById('service-date');
        if (serviceDateInput) {
            serviceDateInput.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    alert('Please select a future date for your service.');
                    this.value = '';
                }
            });
        }

        // Newsletter signup functionality
        function handleNewsletterSignup() {
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate newsletter signup
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return emailRegex.test(email);
        }

        // FAQ functionality
        const faqs = [
            {
                question: "What is IV therapy and how does it work?",
                answer: "IV therapy delivers vitamins, minerals, and medications directly into your bloodstream through a small catheter. This allows for 100% absorption and faster results compared to oral supplements. Our treatments are administered by licensed medical professionals in the comfort of your chosen location."
            },
            {
                question: "Is IV therapy safe?",
                answer: "Yes, our IV therapy treatments are very safe when administered by our licensed medical professionals. We use only pharmaceutical-grade ingredients and FDA-approved medications. All equipment is sterile and single-use to ensure your safety."
            },
            {
                question: "How long does an IV therapy session take?",
                answer: "Most IV therapy sessions take between 30-60 minutes, depending on the specific treatment you choose. Our medical professional will stay with you throughout the entire process to monitor your comfort and wellbeing."
            },
            {
                question: "What areas do you serve?",
                answer: "We provide mobile IV therapy services throughout Scottsdale, AZ and surrounding areas. We come to your home, office, hotel, or any location where you're comfortable receiving treatment."
            },
            {
                question: "Who can receive IV therapy?",
                answer: "Most healthy adults can safely receive IV therapy. However, we require a brief health screening before each treatment. Certain medical conditions or medications may prevent you from receiving specific treatments, which our medical professionals will assess."
            },
            {
                question: "How often can I get IV therapy?",
                answer: "The frequency depends on your specific needs and the type of treatment. Some clients receive treatments weekly for ongoing wellness, while others use our services occasionally for recovery or specific health goals. Our medical professionals will recommend the best schedule for you."
            },
            {
                question: "Do you accept insurance?",
                answer: "Currently, most IV therapy treatments are not covered by insurance as they are considered elective wellness services. However, we offer competitive pricing and package deals to make our services accessible. We can provide receipts for potential HSA/FSA reimbursement."
            },
            {
                question: "What should I expect during my first treatment?",
                answer: "Our medical professional will arrive at your location with all necessary equipment. They'll review your health history, explain the treatment, and answer any questions. The IV insertion is typically painless, and you can relax, work, or watch TV during your treatment."
            },
            {
                question: "Can I customize my IV treatment?",
                answer: "Absolutely! While we offer popular pre-designed packages, our medical professionals can customize treatments based on your specific health goals, lifestyle, and needs. We'll work with you to create the perfect blend of nutrients and medications."
            },
            {
                question: "How quickly will I feel the effects?",
                answer: "Many clients feel the effects immediately or within a few hours of treatment. Energy boosts and hydration effects are typically felt quickly, while immune and beauty benefits may take 24-48 hours to fully manifest. Results vary by individual and treatment type."
            }
        ];

        function showFAQ() {
            const existingModal = document.querySelector('.faq-overlay');
            if (existingModal) {
                existingModal.remove();
                return;
            }

            const faqContainer = document.createElement('div');
            faqContainer.className = 'faq-overlay';
            faqContainer.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 2rem;';

            let faqHTML = '<div style="background: white; border-radius: 20px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; padding: 2rem;"><div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;"><h2 style="margin: 0; color: #333;">Frequently Asked Questions</h2><button onclick="this.closest(\\".faq-overlay\\").remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button></div>';

            faqs.forEach((faq, index) => {
                faqHTML += '<div style="border-bottom: 1px solid #eee; margin-bottom: 1rem; padding-bottom: 1rem;"><h3 style="color: #667eea; margin-bottom: 0.5rem; cursor: pointer;" onclick="toggleFAQ(' + index + ')">' + faq.question + ' <span id="faq-icon-' + index + '">+</span></h3><div id="faq-answer-' + index + '" style="display: none; color: #666; line-height: 1.6;">' + faq.answer + '</div></div>';
            });

            faqHTML += '</div>';
            faqContainer.innerHTML = faqHTML;
            document.body.appendChild(faqContainer);
        }

        function toggleFAQ(index) {
            const answer = document.getElementById('faq-answer-' + index);
            const icon = document.getElementById('faq-icon-' + index);

            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                icon.textContent = '-';
            } else {
                answer.style.display = 'none';
                icon.textContent = '+';
            }
        }
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
  console.log(`Ridex Car Rental Server running on http://localhost:${PORT}`);
});
