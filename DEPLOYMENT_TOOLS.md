# Deployment Tools

This document provides an overview of the deployment tools available in this repository for managing multi-tenant landlord deployments.

## Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `deploy-landlord.sh` | Creates a new deployment directory for a landlord | `./deploy-landlord.sh <landlord-slug> "Company Name" "contact@email.com" "mongodb_password"` |
| `render-deploy.sh` | Creates a deployment and generates Render.com configuration | `./render-deploy.sh <landlord-slug> "Company Name" "contact@email.com" "mongodb_password"` |
| `list-deployments.sh` | Lists all current deployments with their details | `./list-deployments.sh` |
| `cleanup-deployment.sh` | Removes a deployment directory | `./cleanup-deployment.sh <landlord-slug>` |

## Workflow

### Creating a New Landlord Deployment

1. Run the deployment script:
   ```bash
   ./render-deploy.sh my-landlord "My Landlord Company" "contact@example.com" "secure_password"
   ```

2. Push the code to a Git repository:
   ```bash
   git add deployments/my-landlord
   git commit -m "Add deployment for My Landlord Company"
   git push
   ```

3. Deploy to Render.com using the generated `render.yaml` file
   (See `RENDER_DEPLOYMENT.md` for detailed instructions)

### Viewing Existing Deployments

To view all current deployments:
```bash
./list-deployments.sh
```

This will show:
- Landlord slug
- Company name
- Contact email

### Removing a Deployment

To remove a deployment:
```bash
./cleanup-deployment.sh my-landlord
```

This will:
- Ask for confirmation
- Remove the deployment directory
- Remind you to manually delete the services on Render.com

## Directory Structure

After running the deployment scripts, you'll have a structure like:

```
.
├── deploy-landlord.sh          # Base deployment script
├── render-deploy.sh            # Render.com deployment script
├── list-deployments.sh         # List deployments script
├── cleanup-deployment.sh       # Cleanup script
├── README.md                   # Main documentation
├── RENDER_DEPLOYMENT.md        # Render.com deployment guide
├── DEPLOYMENT_TOOLS.md         # This file
└── deployments/                # All landlord deployments
    ├── landlord1/              # Deployment for landlord1
    │   ├── render.yaml         # Render.com configuration
    │   └── movinin/            # Application code
    │       ├── api/
    │       ├── backend/
    │       └── frontend/
    ├── landlord2/
    └── ...
```

## Notes

- Each landlord gets their own MongoDB database (using the slug as the database name)
- Configuration changes are applied to:
  - MongoDB connection string
  - Company name and contact email
  - API endpoints for the backend and frontend
- The default admin credentials are:
  - Email: `admin@movinin.io`
  - Password: `M00vinin`
  
These should be changed after the first login. 