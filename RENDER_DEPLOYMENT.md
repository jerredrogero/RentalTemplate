# Deploying to Render.com

This guide provides step-by-step instructions for deploying the Vacation Rental Management System to Render.com.

## Prerequisites

- A Render.com account
- Your deployment files prepared using the `deploy-landlord.sh` script
- MongoDB Atlas cluster configured

## Deployment Steps

### 1. Setting Up MongoDB Atlas

1. Log in to your MongoDB Atlas account: https://cloud.mongodb.com/
2. Create a new cluster if you don't have one already
3. Under "Security" → "Database Access", create a database user with read/write permissions
4. Under "Security" → "Network Access", add your IP address or allow access from anywhere (0.0.0.0/0)
5. Note your connection string (replace the password placeholder with your actual password)

### 2. Deploying the API Service

1. Log in to Render.com
2. Navigate to "Dashboard" and click "New" → "Web Service"
3. Choose "Deploy from Git repository" and connect your Git repository
4. Navigate to the repository containing your deployments
5. Configure the service:
   - **Name**: `<landlord-slug>-api`
   - **Root Directory**: `deployments/<landlord-slug>/movinin/api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose an appropriate plan (e.g., Starter)

6. Add the following environment variables:
   - `NODE_ENV` = `production`
   - `MI_DB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/<landlord-slug>?retryWrites=true&w=majority&appName=RentalTemplate`
   - Add any other environment variables from `.env.docker` that need to be customized

7. Click "Create Web Service"

### 3. Deploying the Backend Service

1. In Render.com dashboard, click "New" → "Web Service"
2. Configure the service:
   - **Name**: `<landlord-slug>-backend`
   - **Root Directory**: `deployments/<landlord-slug>/movinin/backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose an appropriate plan (e.g., Starter)

3. Add the following environment variables:
   - `NODE_ENV` = `production`
   - `REACT_APP_API_HOST` = URL of your API service (e.g., `https://<landlord-slug>-api.onrender.com`)

4. Click "Create Web Service"

### 4. Deploying the Frontend Service

1. In Render.com dashboard, click "New" → "Web Service"
2. Configure the service:
   - **Name**: `<landlord-slug>-frontend`
   - **Root Directory**: `deployments/<landlord-slug>/movinin/frontend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose an appropriate plan (e.g., Starter)

3. Add the following environment variables:
   - `NODE_ENV` = `production`
   - `REACT_APP_API_HOST` = URL of your API service (e.g., `https://<landlord-slug>-api.onrender.com`)

4. Click "Create Web Service"

### 5. Setting Up Custom Domains (Optional)

1. For each service, go to the service settings in Render.com
2. Navigate to the "Custom Domain" section
3. Click "Add Custom Domain"
4. Enter your domain (e.g., `api.yourdomain.com`, `admin.yourdomain.com`, `www.yourdomain.com`)
5. Follow the DNS instructions provided by Render.com

### 6. Verifying the Deployment

1. Access the API service: `https://<landlord-slug>-api.onrender.com`
2. Access the backend admin panel: `https://<landlord-slug>-backend.onrender.com`
3. Access the frontend: `https://<landlord-slug>-frontend.onrender.com`

### 7. First-time Login

Access the admin panel and log in with:
   - Email: `admin@movinin.io`
   - Password: `M00vinin`

Change these credentials after the first login for security.

## Troubleshooting

### API Connection Issues

- Verify that the MongoDB URI is correct and that network access is properly configured
- Check the API logs in Render.com for any connection errors

### Frontend Not Connecting to API

- Ensure that CORS is properly configured in the API
- Verify that the `REACT_APP_API_HOST` is correctly set

### Deployment Failures

- Check the build logs in Render.com for any errors
- Ensure that Node.js version compatibility is maintained across services

## Scaling Considerations

- Consider using Render.com's autoscaling options for high-traffic instances
- Set up a database backup plan in MongoDB Atlas
- Implement a CI/CD pipeline for automated deployments

## Cost Management

- Render.com charges based on service usage
- Consider using sleep modes for non-production environments
- Monitor your usage to avoid unexpected charges 