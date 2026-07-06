# Guard Eye - CCTV Vulnerability Assessment Platform

## Overview

Guard Eye is a cybersecurity-focused web application that provides automated vulnerability assessment and penetration testing capabilities for CCTV cameras and DVR systems. The platform features a futuristic, dark-themed interface with two primary operational modes: Authority Mode for direct camera management and scanning, and Research Mode for global vulnerability trend analysis.

The application is designed as a front-end prototype/demo showcasing cybersecurity dashboard design patterns with simulated vulnerability scanning and data visualization capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML/CSS/JavaScript (no frameworks)
- Chart.js for data visualization
- Custom CSS with CSS variables for theming
- Google Fonts (Orbitron & Rajdhani) for cybersecurity aesthetic

**Design System:**
- Dark theme with neon accent colors (blue, green, purple, red, orange, yellow)
- Glassmorphism UI components with semi-transparent backgrounds
- Custom cyber-themed animations (grid overlays, scan lines, glowing effects)
- Responsive card-based layouts

**Page Structure:**
The application uses a multi-page architecture with dedicated HTML files:

1. **index.html** - Landing page with mode selection
2. **authority.html** - Camera management and vulnerability scanning interface
3. **research.html** - Global analytics and trend visualization
4. **about.html** - Application information and documentation

Each page shares common navigation and styling but has dedicated JavaScript files for page-specific functionality.

### Component Architecture

**Shared Components:**
- Navigation bar with active state management (script.js)
- Cyber-themed background with animated grid overlay and scan line
- Glass panel design system for content containers

**Authority Mode Components (authority.js):**
- Camera registry system with in-memory data storage
- Simulated vulnerability scanning with predefined vulnerability templates
- Dashboard statistics tracking (total cameras, scanned count, vulnerabilities, risk levels)
- Dynamic camera card rendering with status badges
- Modal system for vulnerability reports

**Research Mode Components (research.js):**
- Chart.js integration for multiple visualization types
- Global threat distribution (bar chart)
- Firmware vulnerability analysis
- Risk prediction trends
- Anomaly detection visualization

### Data Management

**In-Memory State Management:**
The application uses JavaScript arrays and objects to maintain state:
- Camera registry stored in `cameras` array
- Vulnerability data generated from predefined templates
- No persistence layer - all data resets on page reload

**Vulnerability Classification System:**
- Critical: Severe security risks (default credentials, buffer overflow)
- High: Significant vulnerabilities (outdated firmware, open Telnet)
- Medium: Moderate risks (weak encryption, exposed streams)
- Low: Information disclosure issues

**Simulated Scanning:**
The penetration testing functionality is simulated client-side, randomly assigning vulnerabilities from templates to create realistic demo scenarios.

### Styling Architecture

**CSS Architecture:**
- CSS custom properties (variables) for consistent theming
- BEM-like naming conventions for component styles
- Utility-first approach for animations and effects
- Mobile-responsive design patterns

**Visual Theme:**
- Primary colors defined as CSS variables for easy theming
- Glassmorphism achieved through backdrop-filter and rgba backgrounds
- Neon glow effects using box-shadow and text-shadow
- Animated cybersecurity elements (grid overlays, scan lines)

**Animation Strategy:**
- CSS keyframe animations for ambient effects
- Transition-based interactions for user feedback
- Chart.js animations for data visualization
- Performance-optimized with GPU-accelerated transforms

## External Dependencies

### Third-Party Libraries

**Chart.js:**
- Purpose: Data visualization for research mode analytics
- Used for: Bar charts, line charts, and other statistical visualizations
- Loaded via CDN: `https://cdn.jsdelivr.net/npm/chart.js`

**Google Fonts:**
- Orbitron: Display font for headings and titles (cybersecurity aesthetic)
- Rajdhani: Body font for content and UI elements
- Loaded via Google Fonts API

### Browser APIs

**Client-Side APIs:**
- DOM Manipulation: Dynamic content rendering and updates
- Local Storage: Not currently implemented but could be added for data persistence
- Canvas API: Used by Chart.js for rendering visualizations

### No Backend Dependencies

The application is entirely client-side with:
- No server-side processing
- No database connections
- No authentication system
- No external API integrations
- All data is simulated and generated client-side

This architecture makes the application fully portable and suitable for static hosting environments.