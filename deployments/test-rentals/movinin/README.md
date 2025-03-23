# Movin' In - Property Rental Management Platform

Movin' In is a comprehensive property rental management platform designed to help property companies manage their rental inventory, bookings, and customers. The platform includes features for property owners, agencies, and renters with a focus on ease of use and flexibility.

![Movin' In](cdn/company/logo-full.png)

## Features

### For Property Companies
- Customizable branding and configuration
- Multi-language support (English and French)
- Property management dashboard
- Booking management tools
- Customer relationship management
- Revenue reporting and analytics
- Optional VRBO integration for calendar sync
- Multiple payment gateway options

### For Property Owners
- Custom dashboard for managing properties
- Booking overview and calendar
- Property listing management
- Revenue tracking
- Communication with renters

### For Renters
- Search and browse available properties
- Booking and reservation system
- Secure payment processing
- Account management
- Booking history and receipts

## Additional Features
- Agency management
- Property scheduler
- Multiple login options (Google, Facebook, Apple, Email)
- Multiple payment methods (Credit Card, PayPal, Google Pay, Apple Pay)
- Multiple currency support
- Responsive admin dashboard and frontend
- Native mobile app for Android and iOS
- Push notifications
- Security features against XSS, XST, CSR, MITM, and DDoS

## Technology Stack

- **Frontend**: React, Material-UI
- **Backend Admin Panel**: React, Material-UI
- **API Server**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Processing**: Stripe, PayPal (optional)
- **Mobile**: React Native

## Setup Instructions

For detailed setup instructions, please see the [Plug and Play Setup Guide](PLUG_AND_PLAY_SETUP.md).

### Quick Start

1. Clone the repository
2. Run the setup wizard:
   ```bash
   node setup-wizard.js
   ```
3. Start the application:
   ```bash
   docker-compose up -d
   ```
4. Access the applications:
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3003

## Directory Structure

- `api/` - API server
- `frontend/` - Customer-facing web application
- `backend/` - Admin dashboard
- `cdn/` - Static assets and uploads
- `packages/` - Shared packages and types
- `mobile/` - Mobile app (React Native)

## Configuration

The platform is designed to be easily configurable for different property companies. All customizable elements are centralized in a few configuration files:

- `api/src/config/company.config.ts` - Main company configuration
- `.env` files in each application directory for environment-specific settings

## Demo Credentials

### Frontend
- Email: jdoe@movinin.io
- Password: M00vinin

### Admin Dashboard
- Email: admin@movinin.io
- Password: M00vinin

## License

© 2023 Movin' In. All rights reserved.

## Support

For technical support or customization help, contact our team at support@example.com.
