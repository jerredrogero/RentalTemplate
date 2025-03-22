#!/bin/bash
# List deployments script
# This script lists all current landlord deployments

# Check if deployments directory exists
if [ ! -d "deployments" ]; then
    echo "No deployments found."
    exit 0
fi

# Count deployments
deployment_count=$(find deployments -maxdepth 1 -type d | grep -v "^deployments$" | wc -l)

if [ "$deployment_count" -eq 0 ]; then
    echo "No deployments found."
    exit 0
fi

echo "Current deployments ($deployment_count):"
echo "----------------------------------------"
echo "SLUG          | COMPANY NAME            | CONTACT EMAIL"
echo "----------------------------------------"

# Loop through deployments and display information
for deployment in deployments/*; do
    if [ -d "$deployment" ]; then
        slug=$(basename "$deployment")
        
        # Get company name from environment file
        if [ -f "$deployment/movinin/api/.env.docker" ]; then
            company_name=$(grep "MI_COMPANY_NAME=" "$deployment/movinin/api/.env.docker" | cut -d '=' -f2)
            contact_email=$(grep "MI_CONTACT_EMAIL=" "$deployment/movinin/api/.env.docker" | cut -d '=' -f2)
        else
            company_name="Unknown"
            contact_email="Unknown"
        fi
        
        printf "%-14s| %-24s| %s\n" "$slug" "$company_name" "$contact_email"
    fi
done

echo "----------------------------------------"
echo "Use './render-deploy.sh <slug>' for deployment details"
echo "Use './cleanup-deployment.sh <slug>' to remove a deployment" 