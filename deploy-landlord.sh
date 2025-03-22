#!/bin/bash
# Usage: ./deploy-landlord.sh landlord-slug "Company Name" contact@email.com password

LANDLORD_SLUG=$1
COMPANY_NAME=$2
CONTACT_EMAIL=$3
DB_PASSWORD=$4  # Password passed as parameter for security

# Construct MongoDB URI with password and specific database for this landlord
MONGO_URI="mongodb+srv://jrogero578:${DB_PASSWORD}@rentaltemplate.cww9u.mongodb.net/${LANDLORD_SLUG}?retryWrites=true&w=majority&appName=RentalTemplate"

# Create deployment directory
mkdir -p deployments/$LANDLORD_SLUG
cd deployments/$LANDLORD_SLUG

# Copy project files
cp -r ../../movinin .

# Update company configuration file
sed -i '' "s/\"NAME\": \".*\"/\"NAME\": \"$COMPANY_NAME\"/g" movinin/api/src/config/company.config.ts
sed -i '' "s/\"EMAIL\": \".*\"/\"EMAIL\": \"$CONTACT_EMAIL\"/g" movinin/api/src/config/company.config.ts

# Create a new .env file with the correct MongoDB URI
cat > movinin/api/.env.docker << EOF
MI_PORT=4004
MI_DB_URI=${MONGO_URI}
MI_OPENAI_SECRET_KEY=
MI_OPENAI_ORGANIZATION=
MI_JWT_SECRET=m0v1n1n
MI_BACKEND_HOST=http://localhost:3003/
MI_FRONTEND_HOST=http://localhost/
MI_ADMIN_EMAIL=admin@movinin.io
MI_ADMIN_PASSWORD=M00vinin
MI_SMTP_HOST=
MI_SMTP_PORT=587
MI_SMTP_USER=
MI_SMTP_PASS=
MI_SMTP_FROM=
MI_SMTP_SECURE=false
MI_CONTACT_EMAIL=${CONTACT_EMAIL}
MI_COMPANY_NAME=${COMPANY_NAME}
MI_LANGUAGE=en
MI_CURRENCIES=USD,EUR,GBP
MI_DEFAULT_CURRENCY=USD
MI_RECAPTCHA_ENABLED=false
MI_RECAPTCHA_SITE_KEY=
MI_RECAPTCHA_SECRET_KEY=
EOF

echo "Deployment files prepared for $COMPANY_NAME"
echo "MongoDB configured to use database: $LANDLORD_SLUG"
echo "Ready to deploy to Render.com"
