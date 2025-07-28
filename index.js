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
    <title>Ridex - Premium Car Rental Service</title>
    <script>
        // Fallback icons if Lucide fails to load
        window.fallbackIcons = {
            'user': '👤', 'arrow-right': '→', 'menu': '☰', 'x': '✕', 'map-pin': '📍',
            'calendar': '📅', 'search': '🔍', 'shield': '🛡️', 'clock': '🕒', 'award': '🏆',
            'dollar-sign': '$', 'zap': '⚡', 'settings': '⚙️', 'facebook': 'f', 'twitter': 't',
            'instagram': 'i', 'linkedin': 'in', 'phone': '📞', 'mail': '✉️', 'heart': '♥',
            'fuel': '⛽', 'users': '👥', 'car': '🚗', 'star': '⭐', 'star-half': '⭐'
        };

        // Try to load Lucide from multiple CDNs
        function loadLucide() {
            const scripts = [
                'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
                'https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/umd/lucide.js',
                'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.js'
            ];

            let scriptIndex = 0;

            function tryLoadScript() {
                if (scriptIndex >= scripts.length) {
                    console.warn('Lucide failed to load, using fallback icons');
                    window.lucide = { createIcons: function() {} };
                    return;
                }

                const script = document.createElement('script');
                script.src = scripts[scriptIndex];
                script.onload = function() {
                    console.log('Lucide loaded successfully');
                };
                script.onerror = function() {
                    scriptIndex++;
                    tryLoadScript();
                };
                document.head.appendChild(script);
            }

            tryLoadScript();
        }

        loadLucide();
    </script>
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
            font-size: 2rem;
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
                        url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Ff2c45894cc9548b7b2ffb21ee76f74a2?alt=media&token=867b4b8c-9961-473a-a12a-79f66e61a9dc&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover no-repeat;
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
            max-width: 600px;
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

        .cars-grid {
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
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="logo">Ridex</div>
            <ul class="nav-links">
                <li><a href="#home" onclick="scrollToSection('home')">Home</a></li>
                <li><a href="#cars" onclick="scrollToSection('cars')">Cars</a></li>
                <li><a href="#services" onclick="scrollToSection('services')">Services</a></li>
                <li><a href="#about" onclick="scrollToSection('about')">About</a></li>
                <li><a href="#contact" onclick="scrollToSection('contact')">Contact</a></li>
            </ul>
            <div class="auth-buttons">
                <div id="authSection">
                    <button class="btn btn-secondary" onclick="showLogin()">
                        <i data-lucide="user"></i>
                        Login
                    </button>
                    <button class="btn btn-primary" onclick="showSignup()">
                        Sign Up
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
                <div id="userSection" class="hidden">
                    <div class="user-info">
                        <i data-lucide="user"></i>
                        <span id="userWelcome">Welcome, User!</span>
                        <button class="btn btn-secondary" onclick="logout()" style="margin-left: 1rem;">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <button class="mobile-menu" onclick="toggleMenu()">
                <i data-lucide="menu" id="menuIcon"></i>
            </button>
            <div class="mobile-nav" id="mobileNav">
                <ul>
                    <li><a href="#home" onclick="scrollToSection('home'); toggleMenu();">Home</a></li>
                    <li><a href="#cars" onclick="scrollToSection('cars'); toggleMenu();">Cars</a></li>
                    <li><a href="#services" onclick="scrollToSection('services'); toggleMenu();">Services</a></li>
                    <li><a href="#about" onclick="scrollToSection('about'); toggleMenu();">About</a></li>
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
                <h1>Find Your Perfect Ride</h1>
                <p>Discover premium car rentals with unmatched comfort, style, and reliability. Your journey starts here.</p>
                <div class="search-section">
                    <div class="search-form">
                        <div class="form-group">
                            <label for="pickup-location">
                                <i data-lucide="map-pin" style="width: 16px; height: 16px;"></i>
                                Pickup Location
                            </label>
                            <input type="text" id="pickup-location" placeholder="Enter city or airport">
                        </div>
                        <div class="form-group">
                            <label for="pickup-date">
                                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                                Pickup Date
                            </label>
                            <input type="date" id="pickup-date">
                        </div>
                        <div class="form-group">
                            <label for="return-date">
                                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                                Return Date
                            </label>
                            <input type="date" id="return-date">
                        </div>
                        <div class="form-group">
                            <label for="car-type-search">Car Type</label>
                            <select id="car-type-search">
                                <option value="all">All Types</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="luxury">Luxury</option>
                                <option value="compact">Compact</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" onclick="searchCars()" style="width: 100%; margin-top: 1.5rem;">
                                <i data-lucide="search"></i>
                                Search Cars
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
                        Experience Luxury <br>Like Never Before
                    </h2>
                    <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin-bottom: 2rem;">
                        Our premium fleet features the latest models with cutting-edge technology,
                        unmatched comfort, and superior performance. Every journey becomes an unforgettable experience.
                    </p>
                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">500+</h3>
                            <p style="color: #666; font-size: 0.9rem;">Premium Cars</p>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">50+</h3>
                            <p style="color: #666; font-size: 0.9rem;">Locations</p>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-size: 1.8rem; color: #667eea; font-weight: 700; margin-bottom: 0.5rem;">4.9</h3>
                            <p style="color: #666; font-size: 0.9rem;">Rating</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="scrollToSection('cars')" style="padding: 1rem 2rem; font-size: 1rem;">
                        Explore Our Fleet
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
                <div class="showcase-image" style="position: relative; height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
                    <img src="https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2F0929ad20ec73438485e2a2cd329e0294?alt=media&token=6d8d55aa-c1a6-43fe-90d1-4489ea26d289&apiKey=d86ad443e90f49f6824eddb927a8e06f"
                         alt="Premium car showcase"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                    <div style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.9); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #667eea;">
                        Premium Collection
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="services">
        <div class="container">
            <h2>Why Choose Ridex?</h2>
            <div class="features-grid">
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="shield"></i>
                    </div>
                    <h3>Fully Insured</h3>
                    <p>All our vehicles come with comprehensive insurance coverage for your peace of mind during every journey.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="clock"></i>
                    </div>
                    <h3>24/7 Support</h3>
                    <p>Round-the-clock customer support to assist you whenever you need help, wherever you are.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="award"></i>
                    </div>
                    <h3>Premium Quality</h3>
                    <p>Meticulously maintained fleet of premium vehicles ensuring comfort, safety, and reliability.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="dollar-sign"></i>
                    </div>
                    <h3>Best Prices</h3>
                    <p>Competitive pricing with transparent fees and no hidden charges. Get the best value for your money.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="zap"></i>
                    </div>
                    <h3>Instant Booking</h3>
                    <p>Quick and easy booking process with instant confirmation. Reserve your car in just a few clicks.</p>
                </div>
                <div class="feature-card slide-in">
                    <div class="feature-icon">
                        <i data-lucide="settings"></i>
                    </div>
                    <h3>Easy Management</h3>
                    <p>Manage your bookings, view history, and modify reservations through our user-friendly platform.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Cars Section -->
    <section class="cars-section" id="cars">
        <div class="container">
            <h2>Our Premium Fleet</h2>
            <div class="filter-controls">
                <button class="filter-btn active" onclick="filterCars('all')">All Cars</button>
                <button class="filter-btn" onclick="filterCars('sedan')">Sedan</button>
                <button class="filter-btn" onclick="filterCars('suv')">SUV</button>
                <button class="filter-btn" onclick="filterCars('luxury')">Luxury</button>
                <button class="filter-btn" onclick="filterCars('compact')">Compact</button>
            </div>
            <div class="cars-grid" id="cars-grid">
                <!-- Cars will be loaded here -->
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="features" id="about" style="background: #f8f9ff;">
        <div class="container">
            <h2>About Ridex</h2>
            <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <p style="font-size: 1.1rem; color: #666; line-height: 1.8; margin-bottom: 2rem;">
                    Founded in 2020, Ridex has become the leading premium car rental service, trusted by thousands of customers worldwide. We're committed to providing exceptional vehicles and outstanding customer service for all your transportation needs.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem;">
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">10,000+</h3>
                        <p style="color: #666;">Happy Customers</p>
                    </div>
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">500+</h3>
                        <p style="color: #666;">Premium Vehicles</p>
                    </div>
                    <div style="text-align: center;">
                        <h3 style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;">50+</h3>
                        <p style="color: #666;">Locations</p>
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
                    <h3>Ridex</h3>
                    <p>Premium car rental service providing comfortable, reliable, and affordable transportation solutions worldwide.</p>
                    <div class="social-links">
                        <a href="#"><i data-lucide="facebook"></i></a>
                        <a href="#"><i data-lucide="twitter"></i></a>
                        <a href="#"><i data-lucide="instagram"></i></a>
                        <a href="#"><i data-lucide="linkedin"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cars">Our Cars</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#cars">Car Rental</a></li>
                        <li><a href="#services">Airport Transfer</a></li>
                        <li><a href="#services">Corporate Rental</a></li>
                        <li><a href="#services">Long Term Rental</a></li>
                        <li><a href="#services">24/7 Support</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <ul>
                        <li><i data-lucide="phone"></i> +1 (555) 123-4567</li>
                        <li><i data-lucide="mail"></i> info@ridex.com</li>
                        <li><i data-lucide="map-pin"></i> 123 Business Ave, City, State 12345</li>
                        <li><i data-lucide="clock"></i> 24/7 Customer Support</li>
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
        // Car data
        const cars = [
            {
                id: 1,
                name: "BMW 3 Series",
                year: 2023,
                type: "sedan",
                price: 89,
                rating: 4.8,
                reviews: 124,
                transmission: "Automatic",
                fuel: "Petrol",
                seats: 5,
                doors: 4,
                features: ["GPS", "Bluetooth", "AC", "Leather"],
                favorite: false
            },
            {
                id: 2,
                name: "Mercedes-Benz GLC",
                year: 2023,
                type: "suv",
                price: 125,
                rating: 4.9,
                reviews: 89,
                transmission: "Automatic",
                fuel: "Petrol",
                seats: 7,
                doors: 5,
                features: ["GPS", "Sunroof", "AC", "Premium Audio"],
                favorite: false
            },
            {
                id: 3,
                name: "Audi A4",
                year: 2022,
                type: "luxury",
                price: 110,
                rating: 4.7,
                reviews: 156,
                transmission: "Automatic",
                fuel: "Petrol",
                seats: 5,
                doors: 4,
                features: ["GPS", "Bluetooth", "AC", "Premium Interior"],
                favorite: false
            },
            {
                id: 4,
                name: "Toyota Corolla",
                year: 2023,
                type: "compact",
                price: 45,
                rating: 4.5,
                reviews: 203,
                transmission: "Manual",
                fuel: "Petrol",
                seats: 5,
                doors: 4,
                features: ["GPS", "AC", "Bluetooth"],
                favorite: false
            },
            {
                id: 5,
                name: "Tesla Model 3",
                year: 2023,
                type: "luxury",
                price: 135,
                rating: 4.9,
                reviews: 78,
                transmission: "Automatic",
                fuel: "Electric",
                seats: 5,
                doors: 4,
                features: ["Autopilot", "Supercharging", "Premium Interior", "Tech Package"],
                favorite: false
            },
            {
                id: 6,
                name: "Honda CR-V",
                year: 2023,
                type: "suv",
                price: 75,
                rating: 4.6,
                reviews: 142,
                transmission: "Automatic",
                fuel: "Petrol",
                seats: 7,
                doors: 5,
                features: ["GPS", "AC", "Bluetooth", "Safety Package"],
                favorite: false
            }
        ];

        let currentFilter = 'all';
        let currentUser = null;

        // Safe icon initialization
        function initializeIcons() {
            let attempts = 0;
            const maxAttempts = 10;

            function tryInitIcons() {
                attempts++;
                if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
                    try {
                        window.lucide.createIcons();
                        console.log('Icons initialized successfully');
                        return true;
                    } catch (error) {
                        console.warn('Error initializing icons:', error);
                    }
                }

                if (attempts < maxAttempts) {
                    setTimeout(tryInitIcons, 100);
                } else {
                    console.warn('Failed to initialize icons after', maxAttempts, 'attempts');
                }
                return false;
            }

            tryInitIcons();
        }

        // Initialize the page
        function initializePage() {
            loadCars();
            setMinDate();
            checkUserSession();
            initializeIcons();
        }

        // Use multiple initialization methods for maximum compatibility
        document.addEventListener('DOMContentLoaded', initializePage);

        // Backup initialization
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializePage);
        } else {
            setTimeout(initializePage, 10);
        }

        // Final fallback
        window.addEventListener('load', function() {
            initializeIcons();
        });

        // Set minimum date to today for date inputs
        function setMinDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('pickup-date').min = today;
            document.getElementById('return-date').min = today;
        }

        // Load cars into the grid
        function loadCars() {
            const carsGrid = document.getElementById('cars-grid');
            const filteredCars = currentFilter === 'all' ? cars : cars.filter(car => car.type === currentFilter);
            
            carsGrid.innerHTML = '';
            
            if (filteredCars.length === 0) {
                carsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No cars found for the selected filter.</p>';
                return;
            }
            
            filteredCars.forEach(car => {
                const carCard = createCarCard(car);
                carsGrid.appendChild(carCard);
            });

            // Safely initialize Lucide icons
            setTimeout(() => {
                if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
                    try {
                        window.lucide.createIcons();
                    } catch (error) {
                        console.warn('Error in loadCars icon initialization:', error);
                    }
                }
            }, 10);
        }

        // Create car card element
        function createCarCard(car) {
            const card = document.createElement('div');
            card.className = 'car-card fade-in';
            const carTypeIcons = {
                'sedan': '🚗',
                'suv': '🚙',
                'luxury': '🏎️',
                'compact': '🚘'
            };
            card.innerHTML = \`
                <div class="car-image" style="position: relative;">
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 4rem; z-index: 1;">
                        \${carTypeIcons[car.type] || '🚗'}
                    </div>
                    <button class="favorite-btn \${car.favorite ? 'active' : ''}" onclick="toggleFavorite(\${car.id})" style="z-index: 2;">
                        <i data-lucide="heart"></i>
                    </button>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <div class="car-name-year">
                            <h3 class="car-name">\${car.name}</h3>
                            <p class="car-year">\${car.year}</p>
                        </div>
                        <div class="car-price">
                            \${car.price}
                            <small>per day</small>
                        </div>
                    </div>
                    <div class="car-rating">
                        <div class="stars">
                            \${generateStars(car.rating)}
                        </div>
                        <span class="rating-text">\${car.rating} (\${car.reviews} reviews)</span>
                    </div>
                    <div class="car-specs">
                        <div class="spec-item">
                            <i data-lucide="settings"></i>
                            \${car.transmission}
                        </div>
                        <div class="spec-item">
                            <i data-lucide="fuel"></i>
                            \${car.fuel}
                        </div>
                        <div class="spec-item">
                            <i data-lucide="users"></i>
                            \${car.seats} Seats
                        </div>
                        <div class="spec-item">
                            <i data-lucide="car"></i>
                            \${car.doors} Doors
                        </div>
                    </div>
                    <div class="car-features">
                        <div class="features-list">
                            \${car.features.map(feature => \`<span class="feature-tag">\${feature}</span>\`).join('')}
                        </div>
                    </div>
                    <div class="car-actions">
                        <button class="btn-rent" onclick="rentCar(\${car.id})">
                            Rent Now
                        </button>
                    </div>
                </div>
            \`;
            return card;
        }

        // Generate star rating
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i data-lucide="star" style="fill: currentColor;"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i data-lucide="star-half" style="fill: currentColor;"></i>';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i data-lucide="star"></i>';
            }
            
            return stars;
        }

        // Filter cars
        function filterCars(type) {
            currentFilter = type;
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            loadCars();
        }

        // Toggle favorite
        function toggleFavorite(carId) {
            const car = cars.find(c => c.id === carId);
            if (car) {
                car.favorite = !car.favorite;
                loadCars();
            }
        }

        // Search cars
        function searchCars() {
            const location = document.getElementById('pickup-location').value;
            const pickupDate = document.getElementById('pickup-date').value;
            const returnDate = document.getElementById('return-date').value;
            const carType = document.getElementById('car-type-search').value;
            
            if (!location || !pickupDate || !returnDate) {
                alert('Please fill in all search fields');
                return;
            }
            
            if (new Date(returnDate) <= new Date(pickupDate)) {
                alert('Return date must be after pickup date');
                return;
            }
            
            // Filter cars and scroll to cars section
            if (carType !== 'all') {
                filterCars(carType);
            }
            scrollToSection('cars');
        }

        // Rent car
        function rentCar(carId) {
            if (!currentUser) {
                alert('Please login to rent a car');
                showLogin();
                return;
            }
            
            const car = cars.find(c => c.id === carId);
            if (car) {
                alert(\`Booking confirmed for \${car.name}! You will be redirected to payment.\`);
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
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                menuIcon.setAttribute('data-lucide', 'menu');
            }

            // Safely initialize Lucide icons
            setTimeout(() => {
                if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
                    try {
                        window.lucide.createIcons();
                    } catch (error) {
                        console.warn('Error in toggleMenu icon initialization:', error);
                    }
                }
            }, 10);
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

        // Handle date validation
        document.getElementById('pickup-date').addEventListener('change', function() {
            const pickupDate = this.value;
            const returnDateInput = document.getElementById('return-date');
            
            if (pickupDate) {
                const nextDay = new Date(pickupDate);
                nextDay.setDate(nextDay.getDate() + 1);
                returnDateInput.min = nextDay.toISOString().split('T')[0];
                
                if (returnDateInput.value && returnDateInput.value <= pickupDate) {
                    returnDateInput.value = nextDay.toISOString().split('T')[0];
                }
            }
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
  console.log(`Ridex Car Rental Server running on http://localhost:${PORT}`);
});
