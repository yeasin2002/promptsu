---
title: Docker Production Setup
description: This setup provides minimal Docker configuration for production deployment of your full-stack application.
---


## Quick Start

1. **Copy environment file:**
   ```bash
   cp .env.production .env
   ```

2. **Edit `.env` with your actual values:**
   - Database connection string
   - Authentication secrets
   - Domain URLs

3. **Build and run both apps:**
   ```bash
   docker-compose up -d
   ```

## Individual App Deployment

### Deploy Server Only
```bash
docker-compose -f docker-compose.individual.yml up -d server
```

### Deploy Web Only
```bash
docker-compose -f docker-compose.individual.yml up -d web
```

## Production Commands

### Build images
```bash
# Build both
docker-compose build

# Build server only
docker build -f Dockerfile.server -t your-app-server .

# Build web only  
docker build -f Dockerfile.web -t your-app-web .
```

### Run containers
```bash
# Run both apps
docker-compose up -d

# Run with custom env file
docker-compose --env-file .env.production up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Environment Variables

### Server (.env)
```bash
CORS_ORIGIN=https://yourdomain.com
BETTER_AUTH_SECRET=your-super-secret-key-here  
BETTER_AUTH_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://username:password@host:5432/database
```

### Web (.env)
```bash
NEXT_PUBLIC_SERVER_URL=https://api.yourdomain.com
```

## VPS Deployment

1. **Upload files to VPS:**
   ```bash
   scp -r . user@your-vps:/path/to/app
   ```

2. **SSH into VPS and run:**
   ```bash
   cd /path/to/app
   cp .env.production .env
   # Edit .env with your values
   docker-compose up -d
   ```

## Ports

- **Server:** 3000
- **Web:** 3001

## Health Checks

Both containers include health checks:
- Server: `http://localhost:3000/health`
- Web: `http://localhost:3001/api/health`

## Troubleshooting

### View logs
```bash
docker-compose logs server
docker-compose logs web
```

### Restart services
```bash
docker-compose restart server
docker-compose restart web
```

### Rebuild after changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```