---
title: Docker Production Deployment Guide
description: Complete guide for deploying your full-stack TypeScript application to a VPS using Docker.
---

<!-- this is a primary markdown file: created with the help of AI  -->


## 📋 Prerequisites

- VPS with Ubuntu/Debian (recommended)
- Docker and Docker Compose installed
- Domain name (optional but recommended)
- PostgreSQL database (local or cloud)

## 🚀 Quick VPS Setup

### 1. Install Docker on VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

### 2. Upload Your Project

```bash
# From your local machine
scp -r . user@your-vps-ip:/home/user/your-app

# Or clone from Git
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

## ⚙️ Environment Configuration

### 1. Create Production Environment File

```bash
cp .env.production .env
```

### 2. Edit Environment Variables

```bash
nano .env
```

**Required Variables:**

```md
# Server Configuration
CORS_ORIGIN=https://yourdomain.com
BETTER_AUTH_SECRET=your-super-secret-32-char-key
BETTER_AUTH_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://username:password@host:5432/database

# Web Configuration
NEXT_PUBLIC_SERVER_URL=https://api.yourdomain.com
```

**Generate Secure Secret:**

```bash
openssl rand -base64 32
```

## 🏗️ Deployment Options

### Option 1: Deploy Both Apps Together

```bash
# Build and start both applications
docker compose up -d

# View logs
docker compose logs -f

# Check status
docker compose ps
```

### Option 2: Deploy Apps Individually

```bash
# Deploy server only
docker compose -f docker-compose.individual.yml up -d server

# Deploy web only
docker compose -f docker-compose.individual.yml up -d web
```

### Option 3: Deploy on Different VPS Instances

**Server VPS:**

```bash
docker compose -f docker-compose.individual.yml up -d server
```

**Web VPS:**

```bash
# Update NEXT_PUBLIC_SERVER_URL to point to server VPS
docker compose -f docker-compose.individual.yml up -d web
```

## 🌐 Domain & SSL Setup

### 1. Point Domain to VPS

Create A records in your DNS:

- `yourdomain.com` → VPS IP (for web app)
- `api.yourdomain.com` → VPS IP (for server)

### 2. Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create config file
sudo nano /etc/nginx/sites-available/your-app
```

**Nginx Configuration:**

```nginx
# Web App
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# API Server
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal (already set up by certbot)
sudo certbot renew --dry-run
```

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
```

```sql
CREATE DATABASE your_app_db;
CREATE USER your_app_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE your_app_db TO your_app_user;
\q
```

**Update DATABASE_URL:**

```md
DATABASE_URL=postgresql://your_app_user:secure_password@localhost:5432/your_app_db
```

### Option 2: Cloud Database (Recommended)

Use services like:

- **Neon** (recommended for this stack)
- **Supabase**
- **PlanetScale**
- **Railway**

## 🔧 Management Commands

### Container Management

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f
docker compose logs server
docker compose logs web

# Restart services
docker compose restart
docker compose restart server
docker compose restart web

# Stop services
docker compose down

# Update and restart
docker compose down
docker compose pull
docker compose up -d
```

### Database Operations

```bash
# Run database migrations
docker compose exec server bun run db:migrate

# Push schema changes
docker compose exec server bun run db:push

# Open database studio (development only)
docker compose exec server bun run db:studio
```

### System Monitoring

```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check Docker resource usage
docker stats

# View system logs
sudo journalctl -u docker -f
```

## 🔄 Updates & Maintenance

### 1. Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker compose down
docker compose build --no-cache
docker compose up -d
```

### 2. Backup Database

```bash
# Create backup
docker compose exec server pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker compose exec server psql $DATABASE_URL < backup_file.sql
```

### 3. Monitor Logs

```bash
# Setup log rotation
sudo nano /etc/logrotate.d/docker-compose
```

```
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=1M
    missingok
    delaycompress
    copytruncate
}
```

## 🛡️ Security Best Practices

### 1. Firewall Setup

```bash
# Install UFW
sudo apt install ufw -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Secure Environment Variables

```bash
# Set proper permissions
chmod 600 .env

# Never commit .env to git
echo ".env" >> .gitignore
```

### 3. Regular Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker compose pull
docker compose up -d
```

## 🚨 Troubleshooting

### Common Issues

**1. Port Already in Use:**

```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :3001

# Kill process if needed
sudo kill -9 <PID>
```

**2. Database Connection Issues:**

```bash
# Test database connection
docker compose exec server bun run db:push
```

**3. Build Failures:**

```bash
# Clean build
docker compose down
docker system prune -a
docker compose build --no-cache
```

**4. Memory Issues:**

```bash
# Check available memory
free -h

# Increase swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Health Checks

```bash
# Check application health
curl http://localhost:3000/health
curl http://localhost:3001/api/health

# Check with domain
curl https://api.yourdomain.com/health
curl https://yourdomain.com/api/health
```

## 📊 Monitoring Setup

### 1. Basic Monitoring Script

```bash
# Create monitoring script
nano monitor.sh
```

```bash
#!/bin/bash
echo "=== Docker Status ==="
docker compose ps

echo "=== System Resources ==="
df -h
free -h

echo "=== Application Health ==="
curl -s http://localhost:3000/health || echo "Server health check failed"
curl -s http://localhost:3001/api/health || echo "Web health check failed"
```

```bash
chmod +x monitor.sh
./monitor.sh
```

### 2. Setup Cron for Regular Checks

```bash
crontab -e
```

```bash
# Check health every 5 minutes
*/5 * * * * /home/user/your-app/monitor.sh >> /var/log/app-monitor.log 2>&1
```

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database setup and accessible
- [ ] Domain DNS configured
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Applications running and healthy
- [ ] Nginx reverse proxy working
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Log rotation configured

## 📞 Support

If you encounter issues:

1. Check application logs: `docker compose logs -f`
2. Verify environment variables: `cat .env`
3. Test database connection: `docker compose exec server bun run db:push`
4. Check system resources: `df -h && free -h`
5. Verify network connectivity: `curl localhost:3000/health`

---

**Your applications will be available at:**

- Web App: `https://yourdomain.com`
- API Server: `https://api.yourdomain.com`

🎉 **Congratulations! Your full-stack application is now running in production!**
