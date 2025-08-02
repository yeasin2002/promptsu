# Full-Stack TypeScript Application

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

*A modern, type-safe full-stack application built with the Better-T-Stack*

[Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

## 🚀 Overview

This is a comprehensive full-stack TypeScript application featuring web, mobile, and backend components. Built with the [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), it provides end-to-end type safety, modern development tools, and production-ready architecture.

### ✨ Key Features

- 🔒 **End-to-end Type Safety** - TypeScript across all layers with tRPC
- 🌐 **Multi-platform** - Web (Next.js) and Mobile (React Native + Expo)
- ⚡ **High Performance** - Bun runtime with Turbopack and Turborepo
- 🎨 **Modern UI** - TailwindCSS with shadcn/ui components
- 🔐 **Authentication** - Secure email/password auth with Better Auth
- 📱 **Responsive Design** - Mobile-first approach with consistent styling
- 🛠️ **Developer Experience** - Hot reload, type checking, and automated formatting

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 + React 19 | Server-side rendering and web application |
| **Mobile** | React Native + Expo | Cross-platform mobile application |
| **Backend** | Hono + tRPC | Lightweight API server with type safety |
| **Database** | PostgreSQL + Drizzle ORM | Relational database with type-safe queries |
| **Runtime** | Bun | Fast JavaScript runtime and package manager |
| **Styling** | TailwindCSS + shadcn/ui | Utility-first CSS with component library |
| **Auth** | Better Auth | Secure authentication system |
| **Build** | Turborepo | Monorepo build system and caching |

### Project Structure

```
full-app/
├── apps/
│   ├── web/                 # Next.js web application (Port: 3001)
│   │   ├── src/            # Application source code
│   │   ├── components.json # shadcn/ui configuration
│   │   └── tailwind.config.js
│   ├── native/             # React Native + Expo mobile app
│   │   ├── app/           # Expo Router file-based routing
│   │   ├── components/    # Reusable React Native components
│   │   └── assets/        # Images, fonts, and static assets
│   └── server/            # Hono backend API (Port: 3000)
│       ├── src/          # Server source code
│       └── drizzle.config.ts
├── .kiro/                 # AI assistant configuration
│   └── steering/         # Project guidelines and standards
└── [config files]        # Root-level configuration
```

## 🚦 Getting Started

### Prerequisites

- **Bun** >= 1.2.18 ([Install Bun](https://bun.sh/docs/installation))
- **PostgreSQL** database
- **Node.js** >= 18 (for Expo CLI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd full-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp apps/server/.env.example apps/server/.env
   cp apps/web/.env.example apps/web/.env
   cp apps/native/.env.example apps/native/.env
   
   # Update database connection in apps/server/.env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

4. **Database Setup**
   ```bash
   # Push schema to database
   bun db:push
   
   # Optional: Open database studio
   bun db:studio
   ```

5. **Start Development Servers**
   ```bash
   # Start all applications
   bun dev
   
   # Or start individually
   bun dev:web     # Web app only
   bun dev:server  # API server only
   bun dev:native  # Mobile app only
   ```

### 🌐 Access Applications

- **Web Application**: [http://localhost:3001](http://localhost:3001)
- **API Server**: [http://localhost:3000](http://localhost:3000)
- **Mobile App**: Use Expo Go app to scan QR code

## 📜 Available Scripts

### Development
```bash
bun dev              # Start all applications in development mode
bun dev:web          # Start web application only
bun dev:server       # Start API server only
bun dev:native       # Start React Native/Expo development server
```

### Building & Testing
```bash
bun build            # Build all applications for production
bun check-types      # Run TypeScript type checking across all apps
bun check            # Run linting with Oxlint
```

### Database Operations
```bash
bun db:push          # Push schema changes to database
bun db:studio        # Open Drizzle Studio database UI
bun db:generate      # Generate database migrations
bun db:migrate       # Run database migrations
```

### Code Quality
```bash
npx ultracite format # Format and fix code automatically
npx ultracite lint   # Check for code quality issues
```

## 🛠️ Development Workflow

### Code Quality Standards
- **Linting**: Oxlint with TypeScript, Unicorn, and custom rules
- **Formatting**: Ultracite (extends Biome) for consistent code style
- **Type Safety**: Strict TypeScript configuration across all apps
- **Git Hooks**: Husky with lint-staged for pre-commit quality checks

### Database Development
- Use Drizzle Studio for visual database management
- Schema changes are type-safe and automatically synced
- Migrations are generated and can be version controlled

### API Development
- tRPC provides end-to-end type safety between client and server
- Automatic API documentation and client generation
- Built-in validation with Zod schemas

## 🚀 Deployment

### Web Application (Next.js)
- Deploy to Vercel, Netlify, or any Node.js hosting platform
- Build command: `bun build`
- Output directory: `apps/web/.next`

### Mobile Application (React Native)
- Build with Expo Application Services (EAS)
- Deploy to App Store and Google Play Store
- Use `expo build` or EAS Build for production builds

### Backend API (Hono)
- Deploy to any Node.js or Bun-compatible platform
- Environment variables required for database connection
- Build command: `bun run build` in `apps/server`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the established code quality standards (see `.kiro/steering/`)
- Ensure all TypeScript types are properly defined
- Add tests for new functionality
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) - The foundation stack
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database toolkit
- [tRPC](https://trpc.io/) - End-to-end type safety

---

<div align="center">
  <p>Built with ❤️ using the Better-T-Stack</p>
</div>
