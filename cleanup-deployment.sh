#!/bin/bash
# Deployment cleanup script
# This script removes a landlord deployment directory

# Check if correct number of parameters is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <landlord-slug>"
    exit 1
fi

LANDLORD_SLUG=$1

# Check if deployment directory exists
if [ ! -d "deployments/$LANDLORD_SLUG" ]; then
    echo "Error: Deployment directory for $LANDLORD_SLUG does not exist."
    exit 1
fi

# Confirm deletion
echo "WARNING: This will permanently delete the deployment for $LANDLORD_SLUG."
echo "Are you sure you want to continue? (y/n)"
read -r confirmation

if [ "$confirmation" != "y" ]; then
    echo "Operation cancelled."
    exit 0
fi

# Delete the deployment directory
echo "Deleting deployment for $LANDLORD_SLUG..."
rm -rf "deployments/$LANDLORD_SLUG"

echo "Deployment for $LANDLORD_SLUG has been removed."
echo "Note: This only removes the local deployment files."
echo "If the deployment is already live on Render.com, you'll need to manually delete those services." 