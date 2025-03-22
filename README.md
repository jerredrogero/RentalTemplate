# Vacation Rental Management System Deployment

This repository contains a multi-tenant deployment setup for the Vacation Rental Management System based on MoveInIn.

## Deployment Instructions

### Prerequisites

1. MongoDB Atlas account
2. Render.com account (or similar hosting service)
3. Basic knowledge of Node.js and Docker

### Deploying a New Landlord Instance

The `deploy-landlord.sh` script creates a new deployment directory for each landlord with their own configuration.

```bash
./deploy-landlord.sh <landlord-slug> "Company Name" "contact@email.com" "mongodb_password"
```

For example:

```bash
./deploy-landlord.sh athens1 "Athens Property Management" "info@athens1.com" "your_mongodb_password"
```

This will:
1. Create a new directory at `deployments/<landlord-slug>`
2. Copy the MoveInIn project files
3. Configure the MongoDB connection to use a database named after the landlord slug
4. Update the company name and contact email in configuration files
5. Prepare the deployment for hosting on Render.com

### Automated Render.com Deployment

For easier deployment to Render.com, use the `render-deploy.sh` script:

```bash
./render-deploy.sh <landlord-slug> "Company Name" "contact@email.com" "mongodb_password"
```

This script:
1. Runs the regular deployment script
2. Generates a `render.yaml` configuration file for Render's Blueprint deployment
3. Configures all necessary environment variables for each service

After running this script, you can:
1. Push your code to a Git repository
2. Connect to Render.com and use their Blueprint feature with the generated YAML file
3. Deploy all three services (API, Backend, Frontend) with a single click

See `RENDER_DEPLOYMENT.md` for detailed instructions on Render.com deployment.

### Deployment Structure

After running the deployment script, you'll find the following structure:

```
deployments/
└── <landlord-slug>/
    ├── render.yaml
    └── movinin/
        ├── api/
        ├── backend/
        ├── frontend/
        └── ...
```

### Hosting on Render.com

For each landlord deployment:

1. Create a new Web Service on Render.com
2. Point to the `deployments/<landlord-slug>/movinin` directory
3. Configure environment variables as needed
4. Deploy the service

### MongoDB Configuration

Each landlord instance uses its own database in the MongoDB Atlas cluster, with the database name set to the landlord slug.

The MongoDB URI format in the deployment is:
```
mongodb+srv://username:password@cluster.mongodb.net/<landlord-slug>?retryWrites=true&w=majority&appName=RentalTemplate
```

## Administration

After deployment, you can access the admin panel with these default credentials:
- Email: `admin@movinin.io`
- Password: `M00vinin`

You should change these credentials after the first login for security.

## Support

For support, contact the development team at jerred@axisaffiliates.com. 