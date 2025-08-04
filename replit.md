# GymBuddy - Fitness Application

## Project Overview
A French fitness application (GymBuddy) that allows users to scan QR codes on gym equipment, track workouts, monitor progress, and connect with other users. The application features a modern red, black, and white design theme.

## Architecture
- **Frontend**: React with Wouter for routing, TanStack Query for state management, shadcn/ui components
- **Backend**: Express.js server with Drizzle ORM
- **Database**: PostgreSQL (migrated from Supabase)
- **Styling**: Tailwind CSS with custom gym-themed design tokens

## Recent Changes
- **2025-01-04**: Migrated from Lovable to Replit environment
  - Converted React Router to Wouter for routing
  - Removed Supabase integration
  - Set up PostgreSQL database with Drizzle ORM
  - Created proper query client configuration
  - Fixed missing dependencies (react-router-dom, sonner)

## Key Features
- QR Code scanning for gym equipment
- Workout tracking and progression visualization
- Social features for connecting with other users
- Modern responsive design with dark/light mode support
- French localization

## User Preferences
None specified yet.

## Database Schema
Currently includes basic user authentication schema (users table with username, password).

## Migration Status
- ✅ Package installation
- ✅ Workflow startup
- 🔄 Supabase to PostgreSQL migration in progress