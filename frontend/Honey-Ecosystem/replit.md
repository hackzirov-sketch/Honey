# Honey - AI Digital Ecosystem

## Overview

Honey is a comprehensive digital ecosystem platform built for the Uzbek market that combines multiple services into a unified experience:

- **AI-powered messaging and assistant** - Chat functionality with Gemini AI integration
- **Educational media streaming** - Video content discovery and viewing
- **Live classroom/mentoring** - Real-time educational sessions
- **Digital library** - Book discovery and reading platform
- **Knowledge base** - Integration with local educational centers
- **Analytics dashboard** - User engagement and learning metrics

The application is a React-based single-page application with a premium, glass-morphism design aesthetic featuring a distinctive honey/amber color palette. The interface is primarily in Uzbek language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with TypeScript, built using Vite
- Hash-based routing via `react-router-dom` for SPA navigation
- Component-based architecture with page-level components in `/pages`
- Tailwind CSS v4 for styling with custom glass-morphism and premium design tokens
- Recharts for data visualization in analytics
- Lucide React for iconography

**Design System**: 
- Custom CSS variables for theming (honey gold `#FFB800`, dark backgrounds)
- Glass-morphism effects (`glass-premium`, `glass` classes)
- Light/dark mode support via CSS custom properties
- Premium, high-end aesthetic with rounded corners (up to `5rem` border-radius)

**State Management**: React useState/useEffect with localStorage for persistence
- Chat history stored in `honey_chat_history`
- User data in `honey_user` and `honey_profile`
- Media cache in `honey_media_cache`
- User interactions in `honey_user_interactions`

### Backend Architecture

**Server**: Express.js (referenced in build script but server code not fully visible)
- API endpoint at `/api/chat` for AI chat functionality
- PostgreSQL database via Drizzle ORM

**Database**: 
- Drizzle ORM with PostgreSQL dialect
- Schema defined in `/shared/schema.ts`
- Migrations output to `/migrations` directory
- Requires `DATABASE_URL` environment variable

### AI Integration

**Google Gemini AI** via `@google/genai` SDK:
- Model: `gemini-3-flash-preview` for chat responses
- Model: `gemini-3-pro-preview` for educational content search with Google Search grounding
- System instructions for Uzbek language responses
- Temperature set to 0.7 for balanced creativity

**Key AI Features**:
1. Conversational AI assistant with custom system prompts
2. Educational content search using Google Search grounding tool
3. Grounding metadata extraction for source URLs

### Build System

**Vite** for frontend bundling with:
- React plugin
- Path aliases (`@/` maps to root)
- Environment variable injection for API keys
- Dev server on port 5000

**esbuild** for server bundling:
- Bundles specific dependencies (listed in allowlist) to reduce cold start times
- External dependencies for non-bundled packages

## External Dependencies

### AI & APIs
- **Google Gemini AI** (`@google/genai`) - Core AI functionality
  - Requires `GEMINI_API_KEY` environment variable
  - Accessed via `process.env.API_KEY` in client code

### Database
- **PostgreSQL** - Primary database
  - Requires `DATABASE_URL` environment variable
- **Drizzle ORM** - Database toolkit and query builder
- **drizzle-kit** - Migration management

### Frontend Libraries
- **React Router DOM** - Client-side routing
- **Recharts** - Charting library for analytics
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Font Awesome** - Additional icons (CDN)

### Server Dependencies (from build allowlist)
- **Express** - Web server framework
- **Passport/passport-local** - Authentication
- **express-session** - Session management
- **connect-pg-simple/memorystore** - Session stores
- **cors** - Cross-origin resource sharing
- **jsonwebtoken** - JWT handling
- **multer** - File uploads
- **nodemailer** - Email sending
- **Stripe** - Payment processing
- **ws** - WebSocket support

### External CDN Resources
- Google Fonts (Plus Jakarta Sans)
- Font Awesome icons
- Tailwind CSS (development CDN in index.html)