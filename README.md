# Personal Website

A personal website built with Vue 3, TypeScript, and the Options API.

## Features

- Clean, modern design
- Fully responsive layout
- TypeScript for type safety
- Reusable component architecture
- Static site (no server required)

## Tech Stack

- Vue 3 (Options API)
- TypeScript
- Vite
- CSS Variables for theming

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

### Railway Deployment

This project is configured for Railway deployment. See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

**Quick Start:**
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Connect your GitHub repository
4. Railway will automatically detect and deploy your application

The project includes:
- Express server (`server.js`) to serve static files
- Railway configuration (`railway.json`)
- Proper build and start scripts

### Local Testing

To test the production build locally:

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## Setup GitHub Repository

To push this repository to GitHub:

1. Create a new repository on GitHub (do not initialize with README, .gitignore, or license)
2. Run the following commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and desired repository name.
