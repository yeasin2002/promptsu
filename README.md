# Promptsu AI

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*AI-powered prompt enhancement for your favorite AI chatbots*

</div>

## Overview

Promptsu is a browser extension that enhances your prompts when using AI chatbots like ChatGPT, Claude, and others. It also provides a curated collection of ready-to-use prompts.

**Key Features:**
- ✨ AI-powered prompt enhancement using Google AI
- � Curatted prompt collection to copy and paste
- 🌐 Works with ChatGPT, Claude, and other AI interfaces
- 🔌 Chrome and Firefox support via WXT framework

## Tech Stack

- **Extension:** WXT, React 19, TailwindCSS v4, shadcn/ui
- **Backend:** Express.js, Vercel AI SDK, Google AI
- **Documentation:** Next.js 15, Fumadocs
- **Build:** Turborepo, pnpm workspaces
- **Quality:** Ultracite, Oxlint, TypeScript strict mode

## Project Structure

```
apps/
├── extension/   # WXT browser extension (Chrome/Firefox)
├── server/      # Express.js API backend
└── doc/         # Fumadocs documentation site
packages/
├── ui/          # shadcn/ui components
├── validation/  # Zod schemas
├── core/        # Shared utilities
└── assets/      # Fonts, icons, images
```

## Getting Started

**Prerequisites:** pnpm, Node.js >= 18

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev:server    # Start API server
```

**Extension Development:**
```bash
cd apps/extension
pnpm dev           # Chrome development
pnpm dev:firefox   # Firefox development
```

**Documentation:**
```bash
pnpm dev:doc       # Start docs at http://localhost:4000
```

## Scripts

```bash
# Development
pnpm dev              # Start server
pnpm dev:server       # Server only
pnpm dev:doc          # Documentation site

# Building
pnpm build            # Build all apps
pnpm check-types      # TypeScript checking
pnpm check            # Linting with oxlint
pnpm lint             # Format with ultracite

# Extension
cd apps/extension
pnpm build            # Build for Chrome
pnpm build:firefox    # Build for Firefox
pnpm zip              # Package for distribution
```

## Development

- **Code Quality:** Ultracite (Biome) for formatting, Oxlint for linting
- **Line Width:** 120 characters
- **Git Hooks:** Husky with lint-staged for pre-commit formatting

## License

MIT License

