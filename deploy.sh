#!/bin/bash

# Create a deployment package
echo "Creating deployment package..."
mkdir -p deploy
cp -r src deploy/
cp -r public deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp next.config.js deploy/
cp tsconfig.json deploy/
cp tailwind.config.js deploy/
cp postcss.config.js deploy/


echo "Deployment package created in the 'deploy' directory"
echo "Next steps:"
echo "1. Create a Lightsail instance with Node.js blueprint"
echo "2. Upload the contents of the 'deploy' directory to your instance"
echo "3. SSH into your instance and run:"
echo "   cd /path/to/deploy"
echo "   ./start.sh"
scp -i /Users/brandonschmidt/.ssh/LightsailDefaultKey-us-east-1.pem -r deploy/* bitnami@34.239.20.134:/home/bitnami/app/
ssh -i /Users/brandonschmidt/.ssh/LightsailDefaultKey-us-east-1.pem bitnami@34.239.20.134

