/**
 * IntakeQ Widget Integration for Stay Dripped IV & Wellness Co.
 * Manages different service category widgets and patient portal functionality
 */

class IntakeQIntegration {
    constructor() {
        this.practiceId = "68460f36bc104b6aa9da43e0";
        this.widgets = new Map();
        this.categoryMappings = this.getCategoryMappings();
        this.loadedWidgets = new Set();
    }

    getCategoryMappings() {
        return {
            'basic-iv': {
                id: '17d0bbca-0d95-4e32-8a8b-3ae8ae2c1152',
                name: 'Basic IV Therapy Treatments'
            },
            'standard-iv': {
                id: '2f8be24a-d5ad-40c7-aa8c-5172eed7df3e',
                name: 'Standard IV Therapy Treatments'
            },
            'specialty-iv': {
                id: 'db6a4c57-2e06-4530-a598-899f20c96a04',
                name: 'Specialty IV Therapy Treatments'
            },
            'premium-iv': {
                id: '50438982-ce89-47d1-a5f9-453ea9de5e49',
                name: 'Premium IV Therapy Treatments'
            },
            'nad-iv': {
                id: 'ddf30134-b441-4226-bfe9-27eed5368949',
                name: 'NAD+ IV Therapy Treatments'
            },
            'membership': {
                id: '55411eac-3c23-47e3-bd15-b5357d784a85',
                name: 'Membership Plans'
            },
            'vitamin-shots': {
                id: 'abff01b9-9274-4984-b601-8e188086ef2f',
                name: 'Vitamin Injection Shots'
            },
            'peptides': {
                id: '7b76bb12-b381-407c-8d7d-2f351634a4cd',
                name: 'Peptide Therapy Treatments'
            },
            'weight-management': {
                id: '4ea1716b-d9c0-47b5-9ef4-fb1953bae01a',
                name: 'Weight Management Therapy Treatments'
            },
            'hormone-therapy': {
                id: '0761b369-264b-4d3e-8ead-dfe26708f4ce',
                name: 'Hormone Replacement Therapy Treatments'
            }
        };
    }

    /**
     * Load patient portal widget (for returning clients)
     * @param {string} containerId - ID of container element
     */
    loadPatientPortal(containerId = 'intakeq') {
        if (this.loadedWidgets.has('portal')) {
            console.warn('Patient portal widget already loaded');
            return;
        }

        // Clear any existing window properties
        this.clearWindowProperties();

        // Set portal configuration
        window.intakeq = this.practiceId;
        window.intakeqClientArea = true;

        this.loadWidget(containerId, 'portal');
    }

    /**
     * Load service category widget
     * @param {string} category - Category key from mappings
     * @param {string} containerId - ID of container element
     */
    loadServiceWidget(category, containerId = 'intakeq') {
        const categoryData = this.categoryMappings[category];
        
        if (!categoryData) {
            console.error(`Unknown category: ${category}`);
            return;
        }

        if (this.loadedWidgets.has(category)) {
            console.warn(`Widget for category ${category} already loaded`);
            return;
        }

        // Clear any existing window properties
        this.clearWindowProperties();

        // Set category configuration
        window.intakeq = this.practiceId;
        window.intakeqCategoryId = categoryData.id;

        this.loadWidget(containerId, category);
    }

    /**
     * Load the IntakeQ script and initialize widget
     * @param {string} containerId - Container element ID
     * @param {string} widgetType - Type of widget being loaded
     */
    loadWidget(containerId, widgetType) {
        // Ensure container exists
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container element with ID '${containerId}' not found`);
            return;
        }

        // Add loading indicator
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748B;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top: 3px solid #0066CC; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 16px;"></div>
                <div>Loading appointment system...</div>
            </div>
        `;

        // Add spinner animation if not already present
        if (!document.querySelector('#intakeq-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'intakeq-spinner-style';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove any existing IntakeQ scripts
        const existingScripts = document.querySelectorAll('script[src*="intakeq.com"]');
        existingScripts.forEach(script => script.remove());

        // Create and load new script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://intakeq.com/js/widget.min.js?1';
        
        script.onload = () => {
            this.loadedWidgets.add(widgetType);
            console.log(`IntakeQ widget loaded successfully: ${widgetType}`);
        };

        script.onerror = () => {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #dc3545; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
                    <h4 style="margin-bottom: 16px;">Booking System Temporarily Unavailable</h4>
                    <p style="margin-bottom: 20px;">We're experiencing technical difficulties with our online booking system.</p>
                    <div style="margin-bottom: 20px;">
                        <strong>Please call us directly:</strong><br>
                        <a href="tel:+1-602-688-9825" style="color: #0066CC; text-decoration: none; font-size: 18px; font-weight: 600;">(602) 688-9825</a>
                    </div>
                    <button onclick="location.reload()" style="background: #0066CC; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Try Again
                    </button>
                </div>
            `;
            console.error('Failed to load IntakeQ widget');
        };

        document.head.appendChild(script);
    }

    /**
     * Clear IntakeQ window properties to prevent conflicts
     */
    clearWindowProperties() {
        delete window.intakeq;
        delete window.intakeqCategoryId;
        delete window.intakeqClientArea;
    }

    /**
     * Get available categories
     */
    getAvailableCategories() {
        return Object.keys(this.categoryMappings);
    }

    /**
     * Get category name by key
     */
    getCategoryName(category) {
        return this.categoryMappings[category]?.name || 'Unknown Category';
    }

    /**
     * Create a styled container for IntakeQ widget
     * @param {string} containerId - ID for the container
     * @param {string} title - Title for the widget section
     * @returns {HTMLElement} - Created container element
     */
    createStyledContainer(containerId, title = 'Book Your Appointment') {
        const container = document.createElement('div');
        container.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 32px;
            margin: 32px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid #E2E8F0;
        `;

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.cssText = `
            margin: 0 0 24px 0;
            color: #1A2B3A;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
        `;

        const widgetContainer = document.createElement('div');
        widgetContainer.id = containerId;
        widgetContainer.style.cssText = `
            max-width: 720px;
            width: 100%;
            margin: 0 auto;
        `;

        container.appendChild(titleElement);
        container.appendChild(widgetContainer);

        return container;
    }

    /**
     * Auto-detect and load appropriate widget based on page context
     */
    autoDetectAndLoad() {
        const path = window.location.pathname.toLowerCase();
        const containerId = 'intakeq';

        // Check if container exists
        if (!document.getElementById(containerId)) {
            console.log('IntakeQ container not found, skipping auto-detection');
            return;
        }

        // Determine widget type based on URL
        if (path.includes('iv-therapy') || path.includes('book-ivtherapy')) {
            this.loadServiceWidget('standard-iv', containerId);
        } else if (path.includes('nad') || path.includes('peptide')) {
            if (path.includes('nad')) {
                this.loadServiceWidget('nad-iv', containerId);
            } else {
                this.loadServiceWidget('peptides', containerId);
            }
        } else if (path.includes('vitamin') || path.includes('injection')) {
            this.loadServiceWidget('vitamin-shots', containerId);
        } else if (path.includes('weight')) {
            this.loadServiceWidget('weight-management', containerId);
        } else if (path.includes('hormone') || path.includes('sexual-wellness')) {
            this.loadServiceWidget('hormone-therapy', containerId);
        } else if (path.includes('booking') || path.includes('unified-booking')) {
            this.loadPatientPortal(containerId);
        } else {
            // Default to patient portal for unknown pages
            this.loadPatientPortal(containerId);
        }
    }
}

// Create global instance
window.intakeQIntegration = new IntakeQIntegration();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => window.intakeQIntegration.autoDetectAndLoad(), 1000);
    });
} else {
    setTimeout(() => window.intakeQIntegration.autoDetectAndLoad(), 1000);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntakeQIntegration;
}
