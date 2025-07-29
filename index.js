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
        :root {
            /* Vita Bella Color System */
            --e-global-color-dark-green: #012B27;
            --e-global-color-green: #10B981;
            --e-global-color-lightgreen: #6EE7B7;
            --e-global-color-white: #ffffff;
            --e-global-color-text: #012B27;
            --e-global-color-grey2: #596D74;
            --e-global-color-accent: #F8FBFF;

            /* Extended palette */
            --primary-emerald: #10B981;
            --primary-emerald-dark: #059669;
            --primary-emerald-light: #6EE7B7;
            --primary-blue: #3B82F6;
            --primary-blue-dark: #1D4ED8;
            --accent-purple: #8B5CF6;
            --accent-purple-light: #C4B5FD;
            --white: #ffffff;
            --light-gray: #f8fafc;
            --dark-gray: #1f2937;
            --text-gray: #374151;
            --border-gray: #e5e7eb;
            --gold: #f59e0b;
            --success: #22c55e;
            --warning: #f59e0b;
            --error: #ef4444;

            /* Spacing system */
            --space-4x: 4rem;
            --space-3x: 3rem;
            --border-radius: 20px;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&family=Switzer:wght@300;400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Switzer', 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--e-global-color-text);
            background-color: var(--e-global-color-white);
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
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
            color: var(--e-global-color-dark-green);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo::before {
            content: "💧";
            font-size: 24px;
        }

        .logo-subtitle {
            font-size: 12px;
            color: var(--e-global-color-grey2);
            font-weight: 400;
            font-family: 'Switzer', sans-serif;
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
            color: var(--e-global-color-text);
            font-weight: 500;
            font-size: 15px;
            font-family: 'Switzer', sans-serif;
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
            background: var(--e-global-color-green);
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-links a:hover {
            color: var(--e-global-color-green);
        }

        .auth-buttons {
            display: flex;
            gap: 1rem;
        }

        /* Enhanced Button Styles */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.6s;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn-primary {
            background: var(--e-global-color-dark-green);
            color: var(--e-global-color-white);
            font-family: 'Switzer', Arial, Helvetica, sans-serif;
            font-weight: 700;
            border-radius: 2rem;
            padding: 0.6rem 1.4rem;
            box-shadow: 0 2px 8px rgba(44, 60, 50, 0.07);
            transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        }

        .btn-primary:hover {
            background: var(--e-global-color-lightgreen);
            color: var(--e-global-color-dark-green);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .btn-secondary {
            background: var(--e-global-color-white);
            color: var(--e-global-color-green);
            border: 2px solid var(--e-global-color-green);
            font-family: 'Switzer', Arial, Helvetica, sans-serif;
            font-weight: 700;
            border-radius: 2rem;
        }

        .btn-secondary:hover {
            background: var(--e-global-color-green);
            color: var(--e-global-color-white);
        }

        .btn-gradient {
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
            color: var(--white);
            box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
        }

        .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px 0 rgba(59, 130, 246, 0.4);
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

        /* Hero Section with enhanced animations */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg,
                rgba(16, 185, 129, 0.05) 0%,
                rgba(59, 130, 246, 0.05) 50%,
                rgba(139, 92, 246, 0.05) 100%);
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            margin-top: 80px;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
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
            color: var(--e-global-color-text);
            margin-bottom: 24px;
            background: linear-gradient(135deg, var(--e-global-color-text), var(--e-global-color-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: 18px;
            color: var(--e-global-color-grey2);
            font-family: 'Switzer', sans-serif;
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
            color: var(--primary-emerald);
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
            background: linear-gradient(135deg, var(--primary-emerald), var(--primary-blue));
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
        }

        .floating-card {
            position: absolute;
            background: var(--white);
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            animation: floatCard 6s ease-in-out infinite;
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

        /* Professional Animations */
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

        /* Vita Bella Button Styles */
        .vitabella-button:hover {
            background: var(--e-global-color-lightgreen) !important;
            color: var(--e-global-color-dark-green) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(44, 60, 50, 0.15);
        }

        .vitabella-button:hover .arrow-circle {
            fill: var(--e-global-color-dark-green);
        }

        .vitabella-button:hover .arrow-path {
            fill: var(--e-global-color-lightgreen);
        }

        .vitabella-arrow {
            transition: transform 0.3s ease;
        }

        .vitabella-button:hover .vitabella-arrow {
            transform: translateX(3px);
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
    <header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="logo">
                Stay Dripped IV
                <span class="logo-subtitle">Wellness Delivered</span>
            </a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#packages">IV Packages</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#wellness">Wellness</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="auth-buttons">
                <div id="authSection">
                    <button class="btn btn-secondary" onclick="showLogin()">
                        <span class="icon">👤</span>
                        Login
                    </button>
                    <a href="#packages" class="btn btn-primary">Get Started</a>
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
            <button class="mobile-menu-toggle" onclick="toggleMenu()">☰</button>
            <div class="mobile-nav" id="mobileNav">
                <ul>
                    <li><a href="#home" onclick="toggleMenu();">Home</a></li>
                    <li><a href="#packages" onclick="toggleMenu();">IV Packages</a></li>
                    <li><a href="#services" onclick="toggleMenu();">Services</a></li>
                    <li><a href="#wellness" onclick="toggleMenu();">Wellness</a></li>
                    <li><a href="#about" onclick="toggleMenu();">About</a></li>
                    <li><a href="#contact" onclick="toggleMenu();">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text fade-in-up">
                    <h1>Your Health, Our Priority</h1>
                    <p class="hero-subtitle">
                        Experience comprehensive wellness with our professional mobile IV therapy services in Scottsdale, AZ. From hydration boosts to hangover recovery, we bring premium wellness directly to you with care, precision, and convenience.
                    </p>
                    <div class="hero-cta">
                        <a href="#packages" class="vitabella-button" style="background:var(--e-global-color-dark-green);color:var(--e-global-color-white);font-family:Switzer, Arial, Helvetica, sans-serif;font-weight:700;font-size:16px;border:none;border-radius:2rem;padding:0.4rem 0.4rem 0.4rem 1.4rem;min-width:180px;text-decoration:none;display:flex;align-items:center;justify-content:space-between;gap:1.2rem;box-shadow:0 2px 8px rgba(44, 60, 50, 0.07);transition:background 0.18s, color 0.18s, box-shadow 0.18s;position:relative;cursor:pointer;--arrow-circle-color:var(--e-global-color-lightgreen);--arrow-path-color:var(--e-global-color-dark-green);">
                            <span style="flex:1;text-align:left;text-decoration:none">Start Your Journey</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730.01 730.01" width="30" height="30" class="vitabella-arrow" style="margin-left:0.7em;margin-right:0.2em;width:30px;height:30px">
                                <circle cx="365.01" cy="365.01" r="365.01" fill="var(--arrow-circle-color, var(--e-global-color-dark-green))" class="arrow-circle"></circle>
                                <path d="M250.42,511.01l215.63-215.63v193.17h44.92V219.01H241.44v44.92h193.17l-215.63,215.63,31.45,31.45Z" fill="var(--arrow-path-color, var(--e-global-color-green))" class="arrow-path"></path>
                            </svg>
                        </a>
                        <a href="#services" class="vitabella-button" style="background:var(--e-global-color-white);color:var(--e-global-color-dark-green);font-family:Switzer, Arial, Helvetica, sans-serif;font-weight:700;font-size:16px;border:2px solid var(--e-global-color-dark-green);border-radius:2rem;padding:0.4rem 0.4rem 0.4rem 1.4rem;min-width:150px;text-decoration:none;display:flex;align-items:center;justify-content:space-between;gap:1.2rem;box-shadow:0 2px 8px rgba(44, 60, 50, 0.07);transition:background 0.18s, color 0.18s, box-shadow 0.18s;position:relative;cursor:pointer;--arrow-circle-color:var(--e-global-color-dark-green);--arrow-path-color:var(--e-global-color-lightgreen);">
                            <span style="flex:1;text-align:left;text-decoration:none">Explore Services</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730.01 730.01" width="30" height="30" class="vitabella-arrow" style="margin-left:0.7em;margin-right:0.2em;width:30px;height:30px">
                                <circle cx="365.01" cy="365.01" r="365.01" fill="var(--arrow-circle-color, var(--e-global-color-dark-green))" class="arrow-circle"></circle>
                                <path d="M250.42,511.01l215.63-215.63v193.17h44.92V219.01H241.44v44.92h193.17l-215.63,215.63,31.45,31.45Z" fill="var(--arrow-path-color, var(--e-global-color-green))" class="arrow-path"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">5k+</span>
                            <span class="stat-label">Treatments Delivered</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4.9/5</span>
                            <span class="stat-label">Star Reviews</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">24/7</span>
                            <span class="stat-label">Available</span>
                        </div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-image">
                        <img src="https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Ff96175d3016d4dcabebe3476dce4dde4?alt=media&token=f36db875-37a9-4cfd-a8f4-7dc096173254&apiKey=d86ad443e90f49f6824eddb927a8e06f" alt="Professional IV Therapy">
                    </div>
                    <div class="floating-card floating-card-1">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 12px; height: 12px; background: var(--success); border-radius: 50%;"></div>
                            <span style="font-size: 14px; font-weight: 600;">24/7 Available</span>
                        </div>
                    </div>
                    <div class="floating-card floating-card-2">
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: 700; color: var(--primary-emerald);">1000+</div>
                            <div style="font-size: 12px; opacity: 0.7;">Happy Clients</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Form Section -->
        <div class="search-section" style="margin-top: 4rem;">
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
                        <span class="icon">💧</span>
                        Book IV Therapy
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Professional Stats Section -->
    <section class="stats-section" style="padding: 150px 0 100px; background: white; position: relative;">
        <div class="container">
            <!-- Section Header -->
            <div style="text-align: center; margin-bottom: 55px;">
                <div style="background: #F5F7F9; padding: 6px 15px; border-radius: 100px; display: inline-block; margin-bottom: 25px;">
                    <span style="color: #1A2B3B; font-size: 14px; font-weight: 500; text-transform: capitalize;">📊 Our Impact</span>
                </div>
                <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0; color: #333;">Trusted by Thousands in Scottsdale</h2>
            </div>

            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 50px 0; padding: 50px 0;">
                <!-- Stat 1 -->
                <div style="text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="margin-bottom: 10px; font-family: 'Caveat', cursive; font-size: 52px; font-weight: 700; line-height: 1.8; letter-spacing: 0.1em; color: #000;">
                        <span class="counter" data-target="5000">0</span>+
                    </div>
                    <div style="background: #F8FBFF; padding: 5px 10px; border-radius: 8px; display: inline-block;">
                        <span style="color: #596D74; font-size: 13px; font-weight: 500; text-transform: capitalize;">Treatments Delivered</span>
                    </div>
                </div>

                <!-- Stat 2 -->
                <div style="text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="margin-bottom: 10px; font-family: 'Caveat', cursive; font-size: 52px; font-weight: 700; line-height: 1.8; letter-spacing: 0.1em; color: #000;">
                        <span class="counter" data-target="98">0</span>%
                    </div>
                    <div style="background: #F8FBFF; padding: 5px 10px; border-radius: 8px; display: inline-block;">
                        <span style="color: #596D74; font-size: 13px; font-weight: 500; text-transform: capitalize;">Client Satisfaction</span>
                    </div>
                </div>

                <!-- Stat 3 -->
                <div style="text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="margin-bottom: 10px; font-family: 'Caveat', cursive; font-size: 52px; font-weight: 700; line-height: 1.8; letter-spacing: 0.1em; color: #000;">
                        <span class="counter" data-target="24">0</span>/7
                    </div>
                    <div style="background: #F8FBFF; padding: 5px 10px; border-radius: 8px; display: inline-block;">
                        <span style="color: #596D74; font-size: 13px; font-weight: 500; text-transform: capitalize;">Available</span>
                    </div>
                </div>

                <!-- Stat 4 -->
                <div style="text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="margin-bottom: 10px; font-family: 'Caveat', cursive; font-size: 52px; font-weight: 700; line-height: 1.8; letter-spacing: 0.1em; color: #000;">
                        <span class="counter" data-target="30">0</span> min
                    </div>
                    <div style="background: #F8FBFF; padding: 5px 10px; border-radius: 8px; display: inline-block;">
                        <span style="color: #596D74; font-size: 13px; font-weight: 500; text-transform: capitalize;">Average Response</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Showcase Section -->
    <section class="premium-showcase" style="padding: 4rem 0; background: #f8f9ff; position: relative; overflow: hidden;">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; min-height: 400px;">
                <div class="showcase-content" style="z-index: 2; position: relative;">
                    <div style="background: #F5F7F9; padding: 6px 15px; border-radius: 100px; display: inline-block; margin-bottom: 20px;">
                        <span style="color: #1A2B3B; font-size: 14px; font-weight: 500; text-transform: capitalize;">💫 Premium Service</span>
                    </div>
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #333; line-height: 1.2;">
                        Premium Mobile IV Therapy <br>Delivered to You
                    </h2>
                    <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin-bottom: 2rem;">
                        Our licensed medical professionals bring high-quality IV therapy directly to your location.
                        Experience the convenience of premium wellness treatments in the comfort of your home, office, or hotel.
                    </p>
                    <button class="btn btn-primary" onclick="scrollToSection('packages')" style="padding: 1rem 2rem; font-size: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px;">
                        View Our Packages
                        <span class="icon">→</span>
                    </button>
                </div>
                <div class="showcase-image" style="position: relative; height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
                    <img src="https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Ff7e6ef4fec9349c89da8ae7db64c41fa?alt=media&token=78858111-7b34-474d-93ff-9dcada4f51d7&apiKey=d86ad443e90f49f6824eddb927a8e06f"
                         alt="Mobile IV therapy service"
                         style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                    <div style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.9); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #667eea;">
                        Mobile IV Therapy
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced Features Section -->
    <section class="features" id="services" style="padding: 80px 0; background: white;">
        <div class="container">
            <!-- Section Header -->
            <div class="scroll-animate" style="text-align: center; margin-bottom: 3rem;">
                <div style="background: #F5F7F9; padding: 6px 15px; border-radius: 100px; display: inline-block; margin-bottom: 20px;">
                    <span style="color: #1A2B3B; font-size: 14px; font-weight: 500; text-transform: capitalize;">🌟 Our Services</span>
                </div>
                <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">Why Choose Stay Dripped IV & Wellness Co.?</h2>
                <p style="color: #666; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Professional mobile IV therapy services delivered with care, expertise, and convenience directly to your location.</p>
            </div>

            <!-- Service Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                <!-- Card 1 -->
                <div class="feature-card scroll-animate" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(66, 196, 106, 0.2)'; this.querySelector('.service-icon').style.color='#42C46A'; this.querySelector('h3').style.color='#42C46A';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        👨‍⚕️
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Licensed Professionals</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">All our IV therapies are administered by licensed medical professionals ensuring safety and efficacy.</p>
                </div>

                <!-- Card 2 -->
                <div class="feature-card slide-in" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(196, 116, 66, 0.15)'; this.querySelector('.service-icon').style.color='#C45B42'; this.querySelector('h3').style.color='#C45B42';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        🏠
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Mobile Service</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">We come to you! Experience premium IV therapy in the comfort of your home, office, or hotel.</p>
                </div>

                <!-- Card 3 -->
                <div class="feature-card slide-in" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(143, 114, 237, 0.17)'; this.querySelector('.service-icon').style.color='#8F72ED'; this.querySelector('h3').style.color='#8F72ED';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        ⚡
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Fast Relief</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">Feel better quickly with our high-quality IV treatments designed for rapid absorption and results.</p>
                </div>

                <!-- Card 4 -->
                <div class="feature-card slide-in" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(249, 223, 104, 0.22)'; this.querySelector('.service-icon').style.color='#DBBC32'; this.querySelector('h3').style.color='#DBBC32';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        🛡️
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Safe & Sterile</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">We use only pharmaceutical-grade ingredients and maintain strict sterile protocols for your safety.</p>
                </div>

                <!-- Card 5 -->
                <div class="feature-card slide-in" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(196, 66, 132, 0.15)'; this.querySelector('.service-icon').style.color='#C44284'; this.querySelector('h3').style.color='#C44284';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        📱
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Easy Booking</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">Simple online booking system with flexible scheduling to fit your busy lifestyle.</p>
                </div>

                <!-- Card 6 -->
                <div class="feature-card slide-in" style="text-align: center; background: #F8FBFF; padding: 30px; border-radius: 15px; transition: all 0.3s ease; border: 1px solid #e0e0e0;" onmouseover="this.style.background='rgba(47, 178, 187, 0.15)'; this.querySelector('.service-icon').style.color='#2FB2BB'; this.querySelector('h3').style.color='#2FB2BB';" onmouseout="this.style.background='#F8FBFF'; this.querySelector('.service-icon').style.color='#8EA4AF'; this.querySelector('h3').style.color='#596D74';">
                    <div class="service-icon" style="font-size: 50px; color: #8EA4AF; margin-bottom: 15px; transition: all 0.3s ease;">
                        🎯
                    </div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #596D74; margin-bottom: 10px; transition: all 0.3s ease;">Customized Treatments</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.5;">Personalized IV formulations tailored to your specific health and wellness goals.</p>
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
                        ��️ Weight Loss
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

    <!-- Enhanced Testimonials Section -->
    <section class="testimonials" style="padding: 80px 0; background: white; position: relative;">
        <!-- Background Image -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://cdn.builder.io/o/assets%2Fd86ad443e90f49f6824eddb927a8e06f%2Ffa81e77e45bc4c259725235c334d252b?alt=media&token=290f1b50-3f42-4a60-b6f9-dedebe3dd384&apiKey=d86ad443e90f49f6824eddb927a8e06f') center/cover; opacity: 0.05; z-index: 1;"></div>

        <div class="container" style="position: relative; z-index: 2;">
            <!-- Section Header -->
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="background: #F5F7F9; padding: 6px 15px; border-radius: 100px; display: inline-block; margin-bottom: 20px;">
                    <span style="color: #1A2B3B; font-size: 14px; font-weight: 500; text-transform: capitalize;">💬 Client Stories</span>
                </div>
                <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #333;">What Our Customers Say</h2>
                <div style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <span style="color: #ffd700; font-size: 1.5rem;">★★★★★</span>
                    <span style="font-size: 1.1rem; color: #333;">4.9 out of 5 stars</span>
                </div>
                <p style="color: #666;">From 5,000+ verified treatments</p>
            </div>

            <!-- Testimonials Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                <!-- Testimonial 1 -->
                <div style="background: #F8FBFF; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white;">
                            👩‍💼
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600; color: #333;">Sarah M.</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">Wellness Enthusiast</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic; color: #555; line-height: 1.6;">"The convenience of having professional IV therapy at home is incredible. The team is knowledgeable, professional, and made me feel completely comfortable throughout the treatment."</p>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <span style="color: #ffd700;">★★★★★</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Client</span>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div style="background: #F8FBFF; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white;">
                            👨‍💻
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600; color: #333;">Mike R.</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">Business Executive</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic; color: #555; line-height: 1.6;">"After a long week of meetings, the Energy & Performance IV was exactly what I needed. I felt rejuvenated within hours and ready to tackle my weekend plans."</p>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <span style="color: #ffd700;">★★★★★</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Client</span>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div style="background: #F8FBFF; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white;">
                            👩‍⚕️
                        </div>
                        <div>
                            <h4 style="margin: 0; font-weight: 600; color: #333;">Dr. Lisa K.</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">Healthcare Professional</p>
                        </div>
                    </div>
                    <p style="margin-bottom: 1rem; font-style: italic; color: #555; line-height: 1.6;">"As a healthcare professional, I appreciate the quality and safety standards. The team uses proper protocols and the results speak for themselves. Highly recommended!"</p>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <span style="color: #ffd700;">★★★★★</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ Verified Client</span>
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
                <div>
                    <h4>STAY DRIPPED IV & WELLNESS</h4>
                    <p style="margin-bottom: 24px; line-height: 1.6; opacity: 0.8;">Leading provider of personalized mobile IV therapy and wellness services in Scottsdale, AZ. Professional, convenient, and effective treatments delivered directly to you.</p>
                    <div>
                        <p style="margin-bottom: 8px;">📞 (480) 555-0123</p>
                        <p style="margin-bottom: 8px;">✉️ info@staydrippediv.com</p>
                        <p>📍 Scottsdale, AZ - Mobile Service Area</p>
                    </div>
                </div>
                <div>
                    <h4>IV THERAPY</h4>
                    <ul>
                        <li><a href="#packages">Classic Hydration</a></li>
                        <li><a href="#packages">Energy & Performance</a></li>
                        <li><a href="#packages">Immunity Boost</a></li>
                        <li><a href="#packages">Recovery & Detox</a></li>
                        <li><a href="#packages">Beauty Glow</a></li>
                        <li><a href="#packages">Hangover Cure</a></li>
                    </ul>
                </div>
                <div>
                    <h4>WELLNESS SERVICES</h4>
                    <ul>
                        <li><a href="#wellness">Sexual Wellness</a></li>
                        <li><a href="#wellness">Weight Loss</a></li>
                        <li><a href="#wellness">Anti-Aging</a></li>
                        <li><a href="#wellness">Cognitive Health</a></li>
                        <li><a href="#wellness">Hair Loss Treatment</a></li>
                        <li><a href="#wellness">Travel Recovery</a></li>
                    </ul>
                </div>
                <div>
                    <h4>COMPANY</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#" onclick="showFAQ()">FAQ</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
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

        // Video modal functionality
        function showVideoModal() {
            const modal = document.createElement('div');
            modal.className = 'video-modal-overlay';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 2rem;';

            const modalContent = document.createElement('div');
            modalContent.style.cssText = 'position: relative; max-width: 800px; width: 100%;';

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; z-index: 10000;';
            closeBtn.onclick = () => modal.remove();

            // Video iframe (placeholder - replace with actual video)
            const videoFrame = document.createElement('iframe');
            videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Replace with actual video
            videoFrame.style.cssText = 'width: 100%; height: 450px; border: none; border-radius: 10px;';
            videoFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoFrame.allowFullscreen = true;

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(videoFrame);
            modal.appendChild(modalContent);

            // Close on background click
            modal.onclick = (e) => {
                if (e.target === modal) modal.remove();
            };

            document.body.appendChild(modal);
        }

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }

        // Intersection Observer for counter animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe stats section when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                counterObserver.observe(statsSection);
            }

            // Initialize all scroll animations
            initScrollAnimations();

            // Initialize enhanced interactions
            initEnhancedInteractions();
        });

        // Header scroll effect
        function initScrollAnimations() {
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
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
        }

        // Enhanced button interactions
        function initEnhancedInteractions() {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });

                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Service card hover effects
            document.querySelectorAll('.service-card, .feature-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px)';
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        }

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
