# Honey - AI Digital Ecosystem

## Overview

Honey is a comprehensive digital ecosystem platform built for the Uzbek market that combines multiple services into a unified experience:

- **AI-powered messaging and assistant** - Chat functionality with Gemini AI integration
- **Educational media streaming** - Video content discovery and viewing
- **Live classroom/mentoring** - Real-time educational sessions
- **Digital library** - Book discovery and reading platform
- **Knowledge base** - Integration with local educational centers
- **Analytics dashboard** - User engagement and learning metrics

The application is a React-based single-page application with a premium glass-morphism design aesthetic featuring a distinctive honey/amber color palette. The interface is primarily in Uzbek language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with TypeScript, built using Vite
- Hash-based routing via `react-router-dom` for SPA navigation
- Component-based architecture with page-level components in `client/src/pages/`
- Tailwind CSS for styling with custom glass-morphism and premium design tokens
- Recharts for data visualization in analytics
- Lucide React and Font Awesome for iconography
- shadcn/ui component library (New York style) with Radix UI primitives

**Design System**: 
- Custom CSS variables for theming (honey gold `#FFB800`, dark backgrounds)
- Glass-morphism effects (`glass-premium` class with backdrop-filter blur)
- Light/dark mode support via CSS custom properties and HTML class toggling
- Dynamic video backgrounds that switch based on theme
- Premium aesthetic with large border-radius values

**State Management**: 
- React useState/useEffect for local component state
- TanStack Query for server state management
- localStorage for persistence:
  - `honey_chat_history` - Chat messages
  - `honey_user` - User authentication data
  - `honey_profile` - User profile settings
  - `honey_media_cache` - Cached media content
  - `honey_user_interactions` - Likes, ratings, comments

### Backend Architecture

**Server**: Express.js with TypeScript
- RESTful API endpoints under `/api/`
- Authentication routes: `/api/auth/register`, `/api/auth/login`
- AI chat endpoint: `/api/chat` using Google Gemini AI
- Vite dev server middleware integration for development
- Static file serving for production builds

**Database**: PostgreSQL with Drizzle ORM
- Schema defined in `shared/schema.ts`
- Tables: `users`, `chat_history`
- Drizzle-zod integration for type-safe validation
- Database migrations stored in `migrations/` directory

**Build System**:
- Vite for frontend bundling
- esbuild for server bundling
- Custom build script in `script/build.ts`
- Output to `dist/` directory with `dist/public/` for static assets

### API Structure

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/chat` | POST | AI chat with Gemini |

## External Dependencies

### AI Services
- **Google Gemini AI** (`@google/genai`) - Powers the AI assistant and content search
  - Requires `GEMINI_API_KEY` environment variable
  - Uses `gemini-3-flash-preview` and `gemini-3-pro-preview` models
  - Google Search grounding for educational content discovery

### Database
- **PostgreSQL** - Primary data store
  - Requires `DATABASE_URL` environment variable
  - Managed via Drizzle ORM with `drizzle-kit` for migrations

### UI Components
- **Radix UI** - Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui** - Pre-built component library built on Radix
- **Recharts** - Data visualization for analytics dashboard
- **TanStack Query** - Server state management and caching

### Development Tools
- **Vite** - Frontend build tool with HMR
- **Replit plugins** - Runtime error overlay, cartographer, dev banner
- **TypeScript** - Type safety across frontend and backend