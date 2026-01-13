# Railway Deployment Guide

This guide will help you deploy your personal website to Railway.

## Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended)

1. **Log in to Railway**
   - Go to [railway.app](https://railway.app) and sign in

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or your Git provider)
   - Choose your repository

3. **Configure the Service**
   - Railway will automatically detect it's a Node.js project
   - The build command is already set: `npm run build`
   - The start command is already set: `npm start`
   - Railway will automatically use the `PORT` environment variable

4. **Deploy**
   - Railway will automatically build and deploy your application
   - You can watch the build logs in real-time
   - Once deployed, Railway will provide you with a URL

5. **Set Up Custom Domain (Optional)**
   - Go to your project settings
   - Click on "Domains"
   - Add your custom domain
   - Follow Railway's instructions to configure DNS

### Option 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Railway in your project**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

## Environment Variables

Railway will automatically set the `PORT` environment variable. No additional configuration needed.

## Build Process

1. Railway installs dependencies (`npm install`)
2. Runs the build command (`npm run build`)
3. Starts the server (`npm start`)
4. The Express server serves the static files from the `dist` directory

## Troubleshooting

### Build Fails
- Check the build logs in Railway dashboard
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility (check `engines` in `package.json`)

### Application Doesn't Load
- Check the deployment logs
- Verify the `dist` folder is being created during build
- Ensure the `PORT` environment variable is set (Railway sets this automatically)

### Static Assets Not Loading
- Verify the `base` path in `vite.config.ts` is set to `/`
- Check that assets are being built to the correct directory

## Monitoring

Railway provides:
- Real-time logs
- Deployment history
- Resource usage metrics
- Automatic restarts on failure

## Updates

To update your deployment:
- Push changes to your Git repository
- Railway will automatically detect changes and redeploy
- Or manually trigger a redeploy from the Railway dashboard

## Cost

Railway offers a free tier with:
- $5 credit per month
- 500 hours of usage
- Perfect for personal projects

For more information, visit [railway.app/pricing](https://railway.app/pricing)
