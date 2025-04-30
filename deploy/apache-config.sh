#!/bin/bash

# Create Apache configuration file
cat > /opt/bitnami/apache2/conf/vhosts/dev-utility-belt-vhost.conf << 'EOL'
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    ErrorLog /opt/bitnami/apache2/logs/dev-utility-belt-error.log
    CustomLog /opt/bitnami/apache2/logs/dev-utility-belt-access.log combined
</VirtualHost>
EOL

# Enable proxy modules
sudo /opt/bitnami/apache2/bin/a2enmod proxy
sudo /opt/bitnami/apache2/bin/a2enmod proxy_http

# Restart Apache
sudo /opt/bitnami/ctlscript.sh restart apache