#!/bin/bash
# Render.com deployment helper script
# This script helps with setting up deployment configuration for Render.com

# Check if correct number of parameters is provided
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <landlord-slug> \"Company Name\" <contact@email.com> <mongodb_password>"
    exit 1
fi

LANDLORD_SLUG=$1
COMPANY_NAME=$2
CONTACT_EMAIL=$3
MONGODB_PASSWORD=$4

# First run the main deployment script
./deploy-landlord.sh "$LANDLORD_SLUG" "$COMPANY_NAME" "$CONTACT_EMAIL" "$MONGODB_PASSWORD"

# Create Render.com YAML configuration
echo "Creating Render.com configuration files for $COMPANY_NAME ($LANDLORD_SLUG)..."

# Create render.yaml file in the deployment directory
cat > deployments/$LANDLORD_SLUG/render.yaml << EOL
services:
  - type: web
    name: $LANDLORD_SLUG-api
    env: node
    rootDir: movinin/api
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MI_DB_URI
        value: mongodb+srv://jrogero578:$MONGODB_PASSWORD@rentaltemplate.cww9u.mongodb.net/$LANDLORD_SLUG?retryWrites=true&w=majority&appName=RentalTemplate
      - key: MI_CONTACT_EMAIL
        value: $CONTACT_EMAIL
      - key: MI_COMPANY_NAME
        value: $COMPANY_NAME
      - key: MI_BACKEND_HOST
        value: https://$LANDLORD_SLUG-backend.onrender.com/
      - key: MI_FRONTEND_HOST
        value: https://$LANDLORD_SLUG-frontend.onrender.com/
      - key: MI_JWT_SECRET
        value: m0v1n1n
      
  - type: web
    name: $LANDLORD_SLUG-backend
    env: node
    rootDir: movinin/backend
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: REACT_APP_API_HOST
        value: https://$LANDLORD_SLUG-api.onrender.com
      
  - type: web
    name: $LANDLORD_SLUG-frontend
    env: node
    rootDir: movinin/frontend
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: REACT_APP_API_HOST
        value: https://$LANDLORD_SLUG-api.onrender.com
EOL

echo "Render.com configuration created successfully at deployments/$LANDLORD_SLUG/render.yaml"
echo ""
echo "To deploy to Render.com:"
echo "1. Push your code to a Git repository"
echo "2. Connect your repository to Render.com"
echo "3. Use the Blueprint feature with the render.yaml file"
echo "   or manually create each service as described in RENDER_DEPLOYMENT.md"
echo ""
echo "Deployment for $COMPANY_NAME ($LANDLORD_SLUG) is ready!"

# Print instructions for Render.com deployment
echo "============================================"
echo "Deployment Instructions for Render.com"
echo "============================================"
echo
echo "1. Create API Service"
echo "---------------------"
echo "- Name: $LANDLORD_SLUG-api"
echo "- Repository: https://github.com/jerredrogero/RentalTemplate"
echo "- Root Directory: deployments/$LANDLORD_SLUG/movinin/api"
echo "- Runtime: Node"
echo "- Build Command: npm install"
echo "- Start Command: npm start"
echo "- Environment Variables:"
echo "  - NODE_ENV = production"
echo "  - Load remaining variables from deployments/$LANDLORD_SLUG/movinin/api/.env.docker"
echo
echo "2. Create Backend Service"
echo "------------------------"
echo "- Name: $LANDLORD_SLUG-backend"
echo "- Repository: https://github.com/jerredrogero/RentalTemplate"
echo "- Root Directory: deployments/$LANDLORD_SLUG/movinin/backend"
echo "- Runtime: Node"
echo "- Build Command: npm install && npm run build"
echo "- Start Command: npm start"
echo "- Environment Variables:"
echo "  - NODE_ENV = production"
echo "  - REACT_APP_API_HOST = https://$LANDLORD_SLUG-api.onrender.com"
echo
echo "3. Create Frontend Service"
echo "-------------------------"
echo "- Name: $LANDLORD_SLUG-frontend"
echo "- Repository: https://github.com/jerredrogero/RentalTemplate"
echo "- Root Directory: deployments/$LANDLORD_SLUG/movinin/frontend"
echo "- Runtime: Node"
echo "- Build Command: npm install && npm run build"
echo "- Start Command: npm start"
echo "- Environment Variables:"
echo "  - NODE_ENV = production"
echo "  - REACT_APP_API_HOST = https://$LANDLORD_SLUG-api.onrender.com"
echo
echo "4. First-time Login"
echo "------------------"
echo "- Access admin panel: https://$LANDLORD_SLUG-backend.onrender.com"
echo "- Email: admin@movinin.io"
echo "- Password: M00vinin"
echo "- Change these credentials after first login"
echo
echo "5. Verify Deployment"
echo "-------------------"
echo "- API: https://$LANDLORD_SLUG-api.onrender.com"
echo "- Admin: https://$LANDLORD_SLUG-backend.onrender.com"
echo "- Frontend: https://$LANDLORD_SLUG-frontend.onrender.com"
echo
echo "Once all services are deployed, push your changes to GitHub:"
echo "git add deployments/$LANDLORD_SLUG"
echo "git commit -m \"Add $LANDLORD_SLUG deployment\""
echo "git push origin main"
echo
echo "============================================" 