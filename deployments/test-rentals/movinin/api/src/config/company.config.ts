/**
 * Company Configuration
 * 
 * This file contains all customizable company/brand settings.
 * Modify these values to customize the application for a specific property company.
 */

/**
 * Company Information
 */
export const COMPANY = {
  "NAME": "Test Rental Company",
  "CONTACT": {
    "EMAIL": "test@rentals.com",
    "PHONE": "7064610121",
    "ADDRESS": ""
  },
  "SOCIAL": {
    "FACEBOOK": "https://facebook.com/",
    "INSTAGRAM": "https://instagram.com/",
    "TWITTER": "https://twitter.com/",
    "LINKEDIN": "https://linkedin.com/"
  },
  "LOGO": {
    "FULL": "cdn/company/logo-full.png",
    "ICON": "cdn/company/logo-icon.png",
    "FAVICON": "cdn/company/favicon.ico"
  }
};

/**
 * Brand Colors
 */
export const COLORS = {
  "PRIMARY": "#1976d2",
  "SECONDARY": "#dc004e",
  "SUCCESS": "#4caf50",
  "ERROR": "#f44336"
};

/**
 * External Service Integrations
 */
export const INTEGRATIONS = {
  "VRBO": {
    "ENABLED": false,
    "API_KEY": "",
    "API_SECRET": "",
    "ENDPOINT": "https://vrbo.com/api"
  },
  "PAYMENT": {
    "STRIPE": {
      "ENABLED": false,
      "PUBLIC_KEY": "",
      "SECRET_KEY": "",
      "WEBHOOK_SECRET": ""
    },
    "PAYPAL": {
      "ENABLED": false,
      "CLIENT_ID": "",
      "CLIENT_SECRET": "",
      "MODE": "sandbox"
    }
  },
  "EMAIL": {
    "SERVICE": "",
    "CONFIG": {
      "HOST": "",
      "PORT": 587,
      "SECURE": false,
      "AUTH": {
        "USER": "",
        "PASS": ""
      }
    },
    "FROM": "",
    "CONTACT": "jerred@axisaffiliates.com"
  }
};

/**
 * Booking Settings
 */
export const BOOKING = {
  "MIN_DAYS_BEFORE_CHECK_IN": 2,
  "MAX_DAYS_IN_ADVANCE": 365,
  "CANCELLATION_OPTIONS": [
    24,
    48,
    72,
    168
  ],
  "DEFAULT_CANCELLATION_PERIOD": 48,
  "MIN_RENTAL_DAYS": 1
};

/**
 * Feature Flags
 */
export const FEATURES = {
  "SOCIAL_LOGIN": true,
  "APPLE_PAY": false,
  "GOOGLE_PAY": false,
  "NOTIFICATIONS": true,
  "MULTI_LANGUAGE": false,
  "TFA_ENABLED": true,
  "GDPR_COMPLIANCE": false
};

export default {
  COMPANY,
  COLORS,
  INTEGRATIONS,
  BOOKING,
  FEATURES,
};