# Movin' In: Plug and Play Setup Guide

This guide will walk you through setting up Movin' In as a plug-and-play property rental platform for different property companies.

## Overview

The Movin' In platform has been configured to be easily customizable for different property companies. All customizable elements are centralized in a few configuration files, and a setup wizard is provided to help you quickly configure the platform.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 14+ installed
- MongoDB database (local or remote)
- VRBO API credentials (optional)
- Payment gateway credentials (optional)
- SMTP email server credentials

## Quick Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movinin.git
   cd movinin
   ```

2. Run the setup wizard:
   ```bash
   node setup-wizard.js
   ```
   
   Follow the prompts to configure the platform for your property company.

3. Start the application:
   ```bash
   docker-compose up -d
   ```

4. Access the applications:
   - Frontend: http://localhost
   - Admin Dashboard: http://localhost:3003

## Manual Configuration

If you prefer to configure the platform manually, here are the files you need to modify:

### 1. Company Configuration

Edit `api/src/config/company.config.ts` to customize:
- Company name and contact information
- Brand colors
- Integration settings (VRBO, payment gateways, email)
- Booking settings
- Feature flags

### 2. Environment Variables

The following `.env` files contain environment-specific configurations:

#### API (.env)
- `api/.env`
- Key settings:
  - `MI_WEBSITE_NAME`: Your company name
  - `MI_DB_URI`: MongoDB connection string
  - `MI_VRBO_ENABLED`: Enable/disable VRBO integration
  - `MI_VRBO_API_KEY`: VRBO API key
  - `MI_SMTP_*`: Email settings

#### Frontend (.env)
- `frontend/.env`
- Key settings:
  - `VITE_APP_COMPANY_NAME`: Your company name
  - `VITE_APP_STRIPE_KEY`: Stripe public key for payment processing

#### Backend (.env)
- `backend/.env`
- Key settings:
  - `VITE_APP_COMPANY_NAME`: Your company name

### 3. Logo and Brand Assets

Replace the logo files in the CDN directory:
- `cdn/company/logo-full.png`: Full logo
- `cdn/company/logo-icon.png`: Icon logo
- `cdn/company/favicon.ico`: Favicon

## VRBO Integration

To enable VRBO calendar synchronization:

1. Obtain VRBO API credentials
2. Set `MI_VRBO_ENABLED=true` in `api/.env`
3. Set `MI_VRBO_API_KEY` and `MI_VRBO_API_SECRET` in `api/.env`
4. Configure the VRBO settings in `company.config.ts`

## Payment Processing

### Stripe

1. Set up a Stripe account and obtain API keys
2. Configure Stripe settings in `company.config.ts`
3. Set `VITE_APP_STRIPE_KEY` in `frontend/.env`

### PayPal

1. Set up a PayPal Developer account and create an app
2. Configure PayPal settings in `company.config.ts`

## Customizing Email Templates

Email templates are located in `api/src/emails/`. Customize these templates to match your company branding.

## Multi-Language Support

The platform supports English and French by default. Translations are stored in:
- `frontend/src/lang/`
- `backend/src/lang/`
- `api/src/lang/`

## Troubleshooting

### Database Connection Issues
- Verify MongoDB credentials
- Ensure MongoDB is running and accessible

### VRBO Integration Issues
- Verify VRBO API credentials
- Check network connectivity to VRBO API endpoints

### Payment Processing Issues
- Verify payment gateway credentials
- Check for proper configuration in both backend and frontend

### Email Sending Issues
- Verify SMTP server credentials
- Test email connectivity from your server

## Support

For technical support or customization help, contact our team at support@example.com.

Happy property renting! 