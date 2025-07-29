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
    <title>Vita Bella Health | Complete Wellness & Mobile IV Therapy</title>
    <meta name="description" content="Experience comprehensive wellness with Vita Bella's hormone therapy, weight management, anti-aging treatments, and premium mobile IV therapy services. Book online today!">
    
    <style>
        :root {
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
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--text-gray);
            background-color: var(--white);
            overflow-x: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
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
            color: var(--primary-emerald);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo::before {
            content: "✨";
            font-size: 24px;
        }

        .logo-subtitle {
            font-size: 12px;
            color: var(--text-gray);
            font-weight: 400;
            font-family: 'Inter', sans-serif;
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
            background: var(--primary-emerald);
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-links a:hover {
            color: var(--primary-emerald);
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
            background: linear-gradient(135deg, var(--primary-emerald), var(--primary-emerald-dark));
            color: var(--white);
            box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px 0 rgba(16, 185, 129, 0.4);
        }

        .btn-secondary {
            background: var(--white);
            color: var(--primary-emerald);
            border: 2px solid var(--primary-emerald);
        }

        .btn-secondary:hover {
            background: var(--primary-emerald);
            color: var(--white);
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
            color: var(--dark-gray);
            margin-bottom: 24px;
            background: linear-gradient(135deg, var(--dark-gray), var(--primary-emerald));
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
            background-color: rgba(26, 188, 156, 0.9);
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
            color: var(--primary-emerald);
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
            background: linear-gradient(90deg, var(--primary-emerald), var(--primary-blue));
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
            color: var(--primary-emerald);
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
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .treatment-item {
            background: var(--light-gray);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .treatment-item:hover {
            background: var(--primary-emerald);
            color: var(--white);
            transform: translateY(-4px);
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

        /* IV Therapy Section */
        .iv-section {
            padding: 120px 0;
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
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
            content: "💧";
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
            border-color: var(--primary-emerald);
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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

        /* Responsive Design */
        @media (max-width: 1024px) {
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
        }

        @media (max-width: 768px) {
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

            .hero-text h1 {
                font-size: 40px;
            }

            .hero-cta {
                justify-content: center;
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
            }

            .footer-content {
                grid-template-columns: 1fr;
                gap: 40px;
                text-align: center;
            }

            .container {
                padding: 0 16px;
            }

            .section-header {
                margin-bottom: 40px;
            }

            .services-section,
            .iv-section,
            .shadow-showcase,
            .interactive-section,
            .icon-section {
                padding: 80px 0;
            }

            .shadow-text {
                font-size: 32px;
                padding: 40px 20px;
            }

            .search-form {
                grid-template-columns: 1fr;
            }
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
            border-color: var(--primary-emerald);
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
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="logo">
                Vita Bella
                <span class="logo-subtitle">Wellness Delivered</span>
            </a>
            <ul class="nav-links">
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
                    <h1>Your Health, Our Priority</h1>
                    <p class="hero-subtitle">
                        Experience comprehensive wellness with our hormone optimization, weight management, anti-aging treatments, and premium mobile IV therapy. Delivered with care, precision, and convenience.
                    </p>
                    <div class="hero-cta">
                        <a href="#services" class="btn btn-primary">Start Your Journey</a>
                        <a href="#iv-therapy" class="btn btn-gradient">Book IV Therapy</a>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">15k+</span>
                            <span class="stat-label">Lives Transformed</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4.9/5</span>
                            <span class="stat-label">Star Reviews</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">60%</span>
                            <span class="stat-label">More Affordable</span>
                        </div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-image">
                        <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=600&fit=crop&auto=format&q=80" alt="Wellness professional">
                    </div>
                    <div class="floating-card floating-card-1">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 12px; height: 12px; background: var(--success); border-radius: 50%;"></div>
                            <span style="font-size: 14px; font-weight: 600;">24/7 Available</span>
                        </div>
                    </div>
                    <div class="floating-card floating-card-2">
                        <div style="text-align: center;">
                            <div style="font-size: 20px; font-weight: 700; color: var(--primary-emerald);">500+</div>
                            <div style="font-size: 12px; opacity: 0.7;">Happy Clients</div>
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
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="container">
            <div class="section-header scroll-animate">
                <div class="section-subtitle">Our Services</div>
                <h2 class="section-title">Comprehensive Wellness Care</h2>
                <p class="section-description">
                    Combining advanced medical treatments with convenient mobile services to support your optimal health and vitality.
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card scroll-animate">
                    <span class="service-icon">🏥</span>
                    <h3>Medical Wellness</h3>
                    <div class="category-subtitle">Hormone & Anti-Aging Therapy</div>
                    <p>Personalized hormone optimization, weight management, and anti-aging treatments designed to restore your vitality and enhance your quality of life.</p>
                    
                    <div class="treatments-grid">
                        <div class="treatment-item">
                            <h4>Weight Loss</h4>
                            <p>Medical-grade programs</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Hormone Therapy</h4>
                            <p>Personalized optimization</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Anti-Aging</h4>
                            <p>Advanced treatments</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Sexual Wellness</h4>
                            <p>Restore confidence</p>
                        </div>
                    </div>
                </div>

                <div class="service-card scroll-animate">
                    <span class="service-icon">💧</span>
                    <h3>Mobile IV Therapy</h3>
                    <div class="category-subtitle">Premium Hydration & Wellness</div>
                    <p>Professional IV therapy delivered to your location. From hydration boosts to hangover recovery, we bring wellness directly to you.</p>
                    
                    <div class="treatments-grid">
                        <div class="treatment-item">
                            <h4>Hydration Boost</h4>
                            <p>Essential electrolytes</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Energy & Immunity</h4>
                            <p>B-vitamins and nutrients</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Recovery & Detox</h4>
                            <p>Fast hangover relief</p>
                        </div>
                        <div class="treatment-item">
                            <h4>Beauty & Glow</h4>
                            <p>Anti-aging nutrients</p>
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
                <h1 class="shadow-text elegantshadow">Vita Bella</h1>
                <div class="effect-description">
                    <h3>Elegant Text Shadow</h3>
                    <p>A sophisticated multi-layered shadow effect creating depth and elegance with 28 progressive shadow layers for natural lighting simulation.</p>
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
                    <h2>Mobile IV Therapy</h2>
                    <h3>Wellness Delivered, Anytime, Anywhere</h3>
                    <p>Experience the convenience of professional IV therapy in the comfort of your home, office, or hotel. Our licensed medical professionals bring hospital-grade treatments directly to you.</p>
                    
                    <ul class="iv-features">
                        <li>Licensed medical professionals</li>
                        <li>Same-day availability in Scottsdale area</li>
                        <li>FDA-approved medications and vitamins</li>
                        <li>Sterile, hospital-grade equipment</li>
                        <li>Customized treatments for your needs</li>
                        <li>Group bookings and events available</li>
                    </ul>

                    <a href="#contact" class="btn btn-secondary">Book IV Session</a>
                </div>
                <div class="scroll-animate">
                    <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=500&fit=crop&auto=format&q=80" alt="Mobile IV Therapy" style="width: 100%; height: 500px; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);">
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="contact">
        <div class="container">
            <div class="footer-content">
                <div>
                    <h4>VITA BELLA HEALTH</h4>
                    <p style="margin-bottom: 24px; line-height: 1.6; opacity: 0.8;">Leading provider of personalized health solutions, specializing in hormone therapy, weight management, anti-aging treatments, and premium mobile IV therapy.</p>
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
                    <h4>IV THERAPY</h4>
                    <ul>
                        <li><a href="#">Hydration Boost</a></li>
                        <li><a href="#">Energy & Immunity</a></li>
                        <li><a href="#">Hangover Recovery</a></li>
                        <li><a href="#">Beauty & Glow</a></li>
                        <li><a href="#">Athletic Performance</a></li>
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
                <p>&copy; 2025 Vita Bella Health. All rights reserved. | Privacy Policy | Terms of Service</p>
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
                Don't have an account? <a href="#" onclick="showSignup()" style="color: var(--primary-emerald);">Sign up</a>
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
                Already have an account? <a href="#" onclick="showLogin()" style="color: var(--primary-emerald);">Login</a>
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
            
            alert(\`IV Therapy booking confirmed!\nLocation: \${location}\nDate: \${date}\nTime: \${time}\nType: \${type || 'All Treatments'}\n\nOur team will contact you to confirm the appointment.\`);
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
        });

        // Loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            document.querySelector('.fade-in-up').style.animationDelay = '0.2s';
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
  console.log(`Vita Bella Health Server running on http://localhost:${PORT}`);
});
