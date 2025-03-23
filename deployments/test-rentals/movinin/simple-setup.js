#!/usr/bin/env node

/**
 * Movin' In Simple Setup Wizard
 * 
 * This is a simplified version of the setup wizard that doesn't use any external dependencies.
 * Use this if you have issues with the main setup-wizard.js.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Setup the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Config paths
const API_COMPANY_CONFIG = './api/src/config/company.config.ts';
const ENV_API = './api/.env';
const ENV_FRONTEND = './frontend/.env';
const ENV_BACKEND = './backend/.env';
const TEMPLATE_API = './api/.env.template';
const TEMPLATE_FRONTEND = './frontend/.env.template';
const TEMPLATE_BACKEND = './backend/.env.template';
const CDN_DIR = './cdn/company';

// Helper functions
const question = (query) => new Promise((resolve) => rl.question(query, resolve));
const updateFile = (filePath, searchValue, newValue) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(searchValue, newValue);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

// Function to create directory if it doesn't exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

// Function to copy template files if env files don't exist
const createEnvFromTemplate = (templatePath, envPath) => {
  if (!fs.existsSync(envPath) && fs.existsSync(templatePath)) {
    fs.copyFileSync(templatePath, envPath);
    console.log(`Created ${envPath} from template`);
    return true;
  }
  return false;
};

// Function to validate email
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Function to validate hex color
const isValidHexColor = (color) => {
  // Allow both with and without '#' prefix
  const re = /^#?([0-9A-F]{3}){1,2}$/i;
  return re.test(color);
};

// Function to ensure a hex color has # prefix
const formatHexColor = (color) => {
  if (!color.startsWith('#')) {
    return `#${color}`;
  }
  return color;
};

// Function to strip # from hex color for env variables
const stripHexPrefix = (color) => {
  return color.replace('#', '');
};

// Main configuration function
async function configure() {
  console.log('\n===== MOVIN\' IN SETUP WIZARD =====\n');
  console.log('This wizard will help you configure the Movin\' In platform for your property company.\n');
  
  // Create .env files from templates if they don't exist
  const createdApiEnv = createEnvFromTemplate(TEMPLATE_API, ENV_API);
  const createdFrontendEnv = createEnvFromTemplate(TEMPLATE_FRONTEND, ENV_FRONTEND);
  const createdBackendEnv = createEnvFromTemplate(TEMPLATE_BACKEND, ENV_BACKEND);
  
  if (createdApiEnv || createdFrontendEnv || createdBackendEnv) {
    console.log('Created .env files from templates.');
  }
  
  // Ensure the CDN directory exists
  ensureDirectoryExists(CDN_DIR);
  
  // Company Information
  console.log('\n=== COMPANY INFORMATION ===');
  let companyName = '';
  while (!companyName) {
    companyName = await question('Enter your company name: ');
    if (!companyName) console.log('Company name is required');
  }
  
  let companyEmail = '';
  while (!companyEmail || !isValidEmail(companyEmail)) {
    companyEmail = await question('Enter contact email: ');
    if (!isValidEmail(companyEmail)) console.log('Please enter a valid email address');
  }
  
  const companyPhone = await question('Enter contact phone: ');
  const companyAddress = await question('Enter company address: ');
  
  // Social Media
  console.log('\n=== SOCIAL MEDIA (Optional) ===');
  const facebookUrl = await question('Facebook URL (leave blank if none): ');
  const instagramUrl = await question('Instagram URL (leave blank if none): ');
  const twitterUrl = await question('Twitter URL (leave blank if none): ');
  const linkedinUrl = await question('LinkedIn URL (leave blank if none): ');
  
  // Brand Colors
  console.log('\n=== BRAND COLORS ===');
  
  let primaryColor = '';
  while (!primaryColor || !isValidHexColor(primaryColor)) {
    primaryColor = await question('Enter primary color (hex, e.g. #1976d2): ');
    if (!isValidHexColor(primaryColor)) console.log('Please enter a valid hex color');
  }
  primaryColor = formatHexColor(primaryColor);
  
  let secondaryColor = '';
  while (!secondaryColor || !isValidHexColor(secondaryColor)) {
    secondaryColor = await question('Enter secondary color (hex, e.g. #dc004e): ');
    if (!isValidHexColor(secondaryColor)) console.log('Please enter a valid hex color');
  }
  secondaryColor = formatHexColor(secondaryColor);
  
  let successColor = '#4caf50'; // Default
  let errorColor = '#f44336'; // Default
  
  const customizeMoreColors = (await question('Customize success/error colors? (y/n): ')).toLowerCase() === 'y';
  
  if (customizeMoreColors) {
    let valid = false;
    while (!valid) {
      successColor = await question('Enter success color (hex, e.g. #4caf50): ');
      valid = isValidHexColor(successColor);
      if (!valid) console.log('Please enter a valid hex color');
    }
    successColor = formatHexColor(successColor);
    
    valid = false;
    while (!valid) {
      errorColor = await question('Enter error color (hex, e.g. #f44336): ');
      valid = isValidHexColor(errorColor);
      if (!valid) console.log('Please enter a valid hex color');
    }
    errorColor = formatHexColor(errorColor);
  }
  
  // Languages
  console.log('\n=== LANGUAGES ===');
  const supportedLanguages = ['en', 'fr'];
  const defaultLanguage = 'en';
  
  console.log(`Supported languages: ${supportedLanguages.join(', ')}`);
  const languages = await question(`Enter enabled languages (comma-separated, default: ${supportedLanguages.join(',')}): `) || supportedLanguages.join(',');
  const language = await question(`Enter default language (default: ${defaultLanguage}): `) || defaultLanguage;
  
  // Currency
  console.log('\n=== CURRENCY ===');
  const defaultCurrency = 'USD';
  const currency = await question(`Enter default currency (default: ${defaultCurrency}): `) || defaultCurrency;
  
  // VRBO Integration
  console.log('\n=== VRBO INTEGRATION ===');
  const vrboEnabled = (await question('Enable VRBO integration? (y/n): ')).toLowerCase() === 'y';
  let vrboApiKey = '';
  let vrboApiSecret = '';
  
  if (vrboEnabled) {
    vrboApiKey = await question('Enter VRBO API Key: ');
    vrboApiSecret = await question('Enter VRBO API Secret: ');
  }
  
  // Payment Processing
  console.log('\n=== PAYMENT PROCESSING ===');
  
  // Stripe
  const stripeEnabled = (await question('Enable Stripe payments? (y/n): ')).toLowerCase() === 'y';
  let stripePublicKey = '';
  let stripeSecretKey = '';
  let stripeWebhookSecret = '';
  
  if (stripeEnabled) {
    stripePublicKey = await question('Enter Stripe Public Key: ');
    stripeSecretKey = await question('Enter Stripe Secret Key: ');
    stripeWebhookSecret = await question('Enter Stripe Webhook Secret: ');
  }
  
  // PayPal
  const paypalEnabled = (await question('Enable PayPal payments? (y/n): ')).toLowerCase() === 'y';
  let paypalClientId = '';
  let paypalClientSecret = '';
  let paypalMode = '';
  
  if (paypalEnabled) {
    paypalClientId = await question('Enter PayPal Client ID: ');
    paypalClientSecret = await question('Enter PayPal Client Secret: ');
    paypalMode = (await question('PayPal mode (sandbox/live): ')).toLowerCase();
    if (paypalMode !== 'sandbox' && paypalMode !== 'live') {
      console.log('Invalid PayPal mode. Setting to sandbox by default.');
      paypalMode = 'sandbox';
    }
  }
  
  // Email Configuration
  console.log('\n=== EMAIL CONFIGURATION ===');
  const emailService = await question('Email service (smtp/sendgrid/mailchimp): ');
  const emailHost = await question('SMTP Host: ');
  const emailPort = await question('SMTP Port: ');
  const emailUser = await question('SMTP Username: ');
  const emailPass = await question('SMTP Password: ');
  const emailFrom = await question('From Email Address: ');
  
  // MongoDB Configuration
  console.log('\n=== DATABASE CONFIGURATION ===');
  const mongoUser = await question('MongoDB Username (default: movinin): ') || 'movinin';
  const mongoPass = await question('MongoDB Password (default: movinin): ') || 'movinin';
  const mongoHost = await question('MongoDB Host (default: localhost): ') || 'localhost';
  const mongoPort = await question('MongoDB Port (default: 27017): ') || '27017';
  const mongoDbName = await question('MongoDB Database Name (default: movinin): ') || 'movinin';
  
  // Booking Settings
  console.log('\n=== BOOKING SETTINGS ===');
  const minDaysBeforeCheckIn = parseInt(await question('Minimum days before check-in (default: 2): ') || '2', 10);
  const maxDaysInAdvance = parseInt(await question('Maximum days in advance for booking (default: 365): ') || '365', 10);
  const minRentalDays = parseInt(await question('Minimum rental period in days (default: 1): ') || '1', 10);
  
  // Feature Flags
  console.log('\n=== FEATURE FLAGS ===');
  const socialLoginEnabled = (await question('Enable social login? (y/n): ')).toLowerCase() === 'y';
  const notificationsEnabled = (await question('Enable notifications? (y/n): ')).toLowerCase() === 'y';
  const tfaEnabled = (await question('Enable two-factor authentication? (y/n): ')).toLowerCase() === 'y';
  const gdprComplianceEnabled = (await question('Enable GDPR compliance? (y/n): ')).toLowerCase() === 'y';
  
  // Write configuration to files
  console.log('\n=== APPLYING CONFIGURATION ===');
  
  // 1. Update company.config.ts
  try {
    console.log('Updating company configuration...');
    const companyConfig = {
      COMPANY: {
        NAME: companyName,
        CONTACT: {
          EMAIL: companyEmail,
          PHONE: companyPhone,
          ADDRESS: companyAddress,
        },
        SOCIAL: {
          FACEBOOK: facebookUrl || 'https://facebook.com/',
          INSTAGRAM: instagramUrl || 'https://instagram.com/',
          TWITTER: twitterUrl || 'https://twitter.com/',
          LINKEDIN: linkedinUrl || 'https://linkedin.com/',
        },
        LOGO: {
          FULL: 'cdn/company/logo-full.png',
          ICON: 'cdn/company/logo-icon.png',
          FAVICON: 'cdn/company/favicon.ico',
        },
      },
      COLORS: {
        PRIMARY: primaryColor,
        SECONDARY: secondaryColor,
        SUCCESS: successColor,
        ERROR: errorColor,
      },
      INTEGRATIONS: {
        VRBO: {
          ENABLED: vrboEnabled,
          API_KEY: vrboApiKey,
          API_SECRET: vrboApiSecret,
          ENDPOINT: 'https://vrbo.com/api',
        },
        PAYMENT: {
          STRIPE: {
            ENABLED: stripeEnabled,
            PUBLIC_KEY: stripePublicKey,
            SECRET_KEY: stripeSecretKey,
            WEBHOOK_SECRET: stripeWebhookSecret,
          },
          PAYPAL: {
            ENABLED: paypalEnabled,
            CLIENT_ID: paypalClientId,
            CLIENT_SECRET: paypalClientSecret,
            MODE: paypalMode || 'sandbox',
          },
        },
        EMAIL: {
          SERVICE: emailService,
          CONFIG: {
            HOST: emailHost,
            PORT: parseInt(emailPort, 10) || 587,
            SECURE: parseInt(emailPort, 10) === 465,
            AUTH: {
              USER: emailUser,
              PASS: emailPass,
            },
          },
          FROM: emailFrom,
          CONTACT: companyEmail,
        },
      },
      BOOKING: {
        MIN_DAYS_BEFORE_CHECK_IN: minDaysBeforeCheckIn,
        MAX_DAYS_IN_ADVANCE: maxDaysInAdvance,
        CANCELLATION_OPTIONS: [24, 48, 72, 168],
        DEFAULT_CANCELLATION_PERIOD: 48,
        MIN_RENTAL_DAYS: minRentalDays,
      },
      FEATURES: {
        SOCIAL_LOGIN: socialLoginEnabled,
        APPLE_PAY: false,
        GOOGLE_PAY: false,
        NOTIFICATIONS: notificationsEnabled,
        MULTI_LANGUAGE: true,
        TFA_ENABLED: tfaEnabled,
        GDPR_COMPLIANCE: gdprComplianceEnabled,
      },
    };
    
    // Write the configuration file
    fs.writeFileSync(
      API_COMPANY_CONFIG,
      `/**
 * Company Configuration
 * 
 * This file contains all customizable company/brand settings.
 * Modify these values to customize the application for a specific property company.
 */

/**
 * Company Information
 */
export const COMPANY = ${JSON.stringify(companyConfig.COMPANY, null, 2)};

/**
 * Brand Colors
 */
export const COLORS = ${JSON.stringify(companyConfig.COLORS, null, 2)};

/**
 * External Service Integrations
 */
export const INTEGRATIONS = ${JSON.stringify(companyConfig.INTEGRATIONS, null, 2)};

/**
 * Booking Settings
 */
export const BOOKING = ${JSON.stringify(companyConfig.BOOKING, null, 2)};

/**
 * Feature Flags
 */
export const FEATURES = ${JSON.stringify(companyConfig.FEATURES, null, 2)};

export default {
  COMPANY,
  COLORS,
  INTEGRATIONS,
  BOOKING,
  FEATURES,
};`,
      'utf8'
    );
    console.log('Company configuration updated successfully!');
    
    // 2. Update .env files
    console.log('Updating environment files...');
    
    // API .env
    if (fs.existsSync(ENV_API)) {
      let envContent = fs.readFileSync(ENV_API, 'utf8');
      envContent = envContent
        .replace(/MI_WEBSITE_NAME=.*/g, `MI_WEBSITE_NAME=${companyName}`)
        .replace(/MI_DEFAULT_LANGUAGE=.*/g, `MI_DEFAULT_LANGUAGE=${language}`)
        .replace(/MI_TFA_ENABLED=.*/g, `MI_TFA_ENABLED=${tfaEnabled}`)
        .replace(/MI_USER_DEFAULT_CURRENCY=.*/g, `MI_USER_DEFAULT_CURRENCY=${currency}`)
        .replace(/MI_DB_URI=.*/g, `MI_DB_URI=mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}`)
        .replace(/MI_VRBO_ENABLED=.*/g, `MI_VRBO_ENABLED=${vrboEnabled}`)
        .replace(/MI_VRBO_API_KEY=.*/g, `MI_VRBO_API_KEY=${vrboApiKey}`)
        .replace(/MI_VRBO_API_SECRET=.*/g, `MI_VRBO_API_SECRET=${vrboApiSecret}`)
        .replace(/MI_STRIPE_ENABLED=.*/g, `MI_STRIPE_ENABLED=${stripeEnabled}`)
        .replace(/MI_STRIPE_SECRET_KEY=.*/g, `MI_STRIPE_SECRET_KEY=${stripeSecretKey}`)
        .replace(/MI_STRIPE_WEBHOOK_SECRET=.*/g, `MI_STRIPE_WEBHOOK_SECRET=${stripeWebhookSecret}`)
        .replace(/MI_PAYPAL_ENABLED=.*/g, `MI_PAYPAL_ENABLED=${paypalEnabled}`)
        .replace(/MI_PAYPAL_CLIENT_ID=.*/g, `MI_PAYPAL_CLIENT_ID=${paypalClientId}`)
        .replace(/MI_PAYPAL_CLIENT_SECRET=.*/g, `MI_PAYPAL_CLIENT_SECRET=${paypalClientSecret}`)
        .replace(/MI_PAYPAL_ENVIRONMENT=.*/g, `MI_PAYPAL_ENVIRONMENT=${paypalMode || 'sandbox'}`)
        .replace(/MI_SMTP_HOST=.*/g, `MI_SMTP_HOST=${emailHost}`)
        .replace(/MI_SMTP_PORT=.*/g, `MI_SMTP_PORT=${emailPort}`)
        .replace(/MI_SMTP_USER=.*/g, `MI_SMTP_USER=${emailUser}`)
        .replace(/MI_SMTP_PASS=.*/g, `MI_SMTP_PASS=${emailPass}`)
        .replace(/MI_SMTP_FROM=.*/g, `MI_SMTP_FROM=${emailFrom}`);
      
      fs.writeFileSync(ENV_API, envContent, 'utf8');
      console.log('API environment file updated successfully!');
    } else {
      console.log('API environment file not found. Skipping...');
    }
    
    // Frontend .env
    if (fs.existsSync(ENV_FRONTEND)) {
      let envContent = fs.readFileSync(ENV_FRONTEND, 'utf8');
      envContent = envContent
        .replace(/VITE_APP_COMPANY_NAME=.*/g, `VITE_APP_COMPANY_NAME=${companyName}`)
        .replace(/VITE_APP_OWNER_MODE=.*/g, `VITE_APP_OWNER_MODE=true`)
        .replace(/VITE_APP_LANGUAGES=.*/g, `VITE_APP_LANGUAGES=${languages}`)
        .replace(/VITE_APP_DEFAULT_LANGUAGE=.*/g, `VITE_APP_DEFAULT_LANGUAGE=${language}`)
        .replace(/VITE_APP_DEFAULT_CURRENCY=.*/g, `VITE_APP_DEFAULT_CURRENCY=${currency}`)
        .replace(/VITE_APP_STRIPE_ENABLED=.*/g, `VITE_APP_STRIPE_ENABLED=${stripeEnabled}`)
        .replace(/VITE_APP_STRIPE_KEY=.*/g, `VITE_APP_STRIPE_KEY=${stripePublicKey}`)
        .replace(/VITE_APP_PAYPAL_ENABLED=.*/g, `VITE_APP_PAYPAL_ENABLED=${paypalEnabled}`)
        .replace(/VITE_APP_PAYPAL_CLIENT_ID=.*/g, `VITE_APP_PAYPAL_CLIENT_ID=${paypalClientId}`)
        .replace(/VITE_APP_PAYPAL_CURRENCY=.*/g, `VITE_APP_PAYPAL_CURRENCY=${currency}`)
        .replace(/VITE_APP_PRIMARY_COLOR=.*/g, `VITE_APP_PRIMARY_COLOR=${stripHexPrefix(primaryColor)}`)
        .replace(/VITE_APP_SECONDARY_COLOR=.*/g, `VITE_APP_SECONDARY_COLOR=${stripHexPrefix(secondaryColor)}`)
        .replace(/VITE_APP_SUCCESS_COLOR=.*/g, `VITE_APP_SUCCESS_COLOR=${stripHexPrefix(successColor)}`)
        .replace(/VITE_APP_ERROR_COLOR=.*/g, `VITE_APP_ERROR_COLOR=${stripHexPrefix(errorColor)}`)
        .replace(/VITE_APP_TFA_ENABLED=.*/g, `VITE_APP_TFA_ENABLED=${tfaEnabled}`);
      
      fs.writeFileSync(ENV_FRONTEND, envContent, 'utf8');
      console.log('Frontend environment file updated successfully!');
    } else {
      console.log('Frontend environment file not found. Skipping...');
    }
    
    // Backend .env
    if (fs.existsSync(ENV_BACKEND)) {
      let envContent = fs.readFileSync(ENV_BACKEND, 'utf8');
      envContent = envContent
        .replace(/VITE_APP_COMPANY_NAME=.*/g, `VITE_APP_COMPANY_NAME=${companyName}`)
        .replace(/VITE_APP_LANGUAGES=.*/g, `VITE_APP_LANGUAGES=${languages}`)
        .replace(/VITE_APP_DEFAULT_LANGUAGE=.*/g, `VITE_APP_DEFAULT_LANGUAGE=${language}`)
        .replace(/VITE_APP_DEFAULT_CURRENCY=.*/g, `VITE_APP_DEFAULT_CURRENCY=${currency}`)
        .replace(/VITE_APP_PRIMARY_COLOR=.*/g, `VITE_APP_PRIMARY_COLOR=${stripHexPrefix(primaryColor)}`)
        .replace(/VITE_APP_SECONDARY_COLOR=.*/g, `VITE_APP_SECONDARY_COLOR=${stripHexPrefix(secondaryColor)}`)
        .replace(/VITE_APP_SUCCESS_COLOR=.*/g, `VITE_APP_SUCCESS_COLOR=${stripHexPrefix(successColor)}`)
        .replace(/VITE_APP_ERROR_COLOR=.*/g, `VITE_APP_ERROR_COLOR=${stripHexPrefix(errorColor)}`)
        .replace(/VITE_APP_TFA_ENABLED=.*/g, `VITE_APP_TFA_ENABLED=${tfaEnabled}`);
      
      fs.writeFileSync(ENV_BACKEND, envContent, 'utf8');
      console.log('Backend environment file updated successfully!');
    } else {
      console.log('Backend environment file not found. Skipping...');
    }
    
    console.log('\n=== LOGO FILES ===');
    console.log('Please place your company logo files in the following directory:');
    console.log(CDN_DIR);
    console.log('Required files:');
    console.log('- logo-full.png (Full logo)');
    console.log('- logo-icon.png (Icon logo)');
    console.log('- favicon.ico (Favicon)');
    
    console.log('\n=== SETUP COMPLETE ===');
    console.log('\nYour Movin\' In platform has been configured for:');
    console.log(companyName);
    
    console.log('\nNext steps:');
    console.log('1. docker-compose up -d - Start the application');
    console.log('2. Access the frontend at: http://localhost:3000');
    console.log('3. Access the admin panel at: http://localhost:3003');
    
    if (!vrboEnabled) {
      console.log('\nNote: VRBO integration is currently disabled. You can enable it later by updating the configuration.');
    }
    
    if (!stripeEnabled && !paypalEnabled) {
      console.log('\nNote: Payment processing is currently disabled. You can enable it later by updating the configuration.');
    }
    
  } catch (err) {
    console.error('An error occurred while applying configuration:');
    console.error(err);
  }
  
  rl.close();
}

// Run the configuration
configure().catch(err => {
  console.error('Error during configuration:', err);
  rl.close();
}); 