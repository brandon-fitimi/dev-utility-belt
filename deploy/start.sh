#!/bin/bash

# Stop Apache and prevent it from starting automatically
echo "Stopping Apache..."
sudo /opt/bitnami/ctlscript.sh stop apache
sudo systemctl disable apache2

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# Create Nginx configuration
echo "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/dev-utility-belt << 'EOL'
server {
    listen 80;
    server_name utility-belt.fitimilabs.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Enable the site and restart Nginx
sudo ln -sf /etc/nginx/sites-available/dev-utility-belt /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# Install lsof if not installed
if ! command -v lsof &> /dev/null; then
    echo "Installing lsof..."
    sudo apt-get update
    sudo apt-get install -y lsof
fi

# Kill any existing process on port 3000
echo "Checking for existing processes on port 3000..."
sudo lsof -ti:3000 | xargs sudo kill -9 2>/dev/null || true

# Install dependencies including PM2
npm install
npm install pm2

# Build the application
npm run build

# Start the application with PM2 using local installation on port 3000
./node_modules/.bin/pm2 start npm --name "dev-utility-belt" -- start

# Save the PM2 process list
./node_modules/.bin/pm2 save

# Generate startup script
./node_modules/.bin/pm2 startup

# Restart PM2 on system reboot
./node_modules/.bin/pm2 startup systemd -u bitnami --hp /home/bitnami

echo "Application started with PM2 and Nginx"
echo "To view logs: ./node_modules/.bin/pm2 logs dev-utility-belt"
echo "To monitor: ./node_modules/.bin/pm2 monit"

