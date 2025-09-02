# Full-Stack TypeScript Application

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-000000?style=for-the-badge&logo=pnpm&logoColor=white)

*A modern, type-safe full-stack application built with the Better-T-Stack*

</div>

## Overview

Full-stack TypeScript monorepo with web, mobile, and backend applications. Built with the [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) for end-to-end type safety and modern development experience.

**Key Features:**
- 🔒 End-to-end type safety with tRPC
- 🌐 Multi-platform: Web (Next.js) + Mobile (React Native)
- ⚡ High performance with pnpm and Turborepo
- 🎨 Modern UI with TailwindCSS and shadcn/ui
- 🔐 Secure authentication with Better Auth

## Tech Stack

- **Frontend:** Next.js 15, React 19, TailwindCSS, shadcn/ui
- **Mobile:** React Native, Expo
- **Backend:** Hono, tRPC, Better Auth
- **Database:** PostgreSQL, Drizzle ORM
- **Runtime:** pnpm
- **Build:** Turborepo
- **Quality:** Ultracite, Oxlint, TypeScript strict mode

## Project Structure

```
apps/
├── web/         # Next.js app (port 3001)
├── native/      # React Native + Expo
├── server/      # Hono API (port 3000)
└── extension/   # Browser extension
packages/
├── ui/          # shadcn/ui components
├── validation/  # Zod schemas
└── core/        # Shared utilities
```

## Getting Started

**Prerequisites:** pnpm >= 1.2.18, PostgreSQL, Node.js >= 18

```bash
# Clone and install
git clone <repository-url>
cd full-app
pnpm install

# Environment setup
cp apps/server/.env.example apps/server/.env
# Update DATABASE_URL in apps/server/.env

# Database setup
pnpm db:push

# Start development
pnpm dev
```

**Access:**
- Web: [http://localhost:3001](http://localhost:3001)
- API: [http://localhost:3000](http://localhost:3000)
- Mobile: Scan QR code with Expo Go

## Scripts

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Web only
pnpm dev:server       # API only
pnpm dev:native       # Mobile only

# Building & Quality
pnpm build            # Build all apps
pnpm check-types      # TypeScript checking
pnpm check            # Linting
npx ultracite format # Auto-fix code

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open database UI
pnpm db:generate      # Generate migrations
```

## Development

- **Code Quality:** Ultracite handles formatting, linting, and type safety
- **Database:** Drizzle Studio for visual management, type-safe schema changes
- **API:** tRPC provides end-to-end type safety with automatic validation
- **Git Hooks:** Husky with lint-staged for pre-commit checks

## Deployment

- **Web:** Vercel, Netlify, or Node.js platforms
- **Mobile:** Expo Application Services (EAS) for app stores
- **Backend:** Any Node.js/pnpm-compatible platform

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and setup instructions.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ using the Better-T-Stack</p>
</div>
