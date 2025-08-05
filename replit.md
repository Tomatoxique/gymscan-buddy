# GymBuddy - Fitness Application

## Project Overview
A French fitness application (GymBuddy) that allows users to scan QR codes on gym equipment, track workouts, monitor progress, and connect with other users. The application features a modern red, black, and white design theme.

## Architecture
- **Frontend**: React with Wouter for routing, TanStack Query for state management, shadcn/ui components
- **Backend**: Express.js server with Drizzle ORM
- **Database**: PostgreSQL (configured for Supabase)
- **Styling**: Tailwind CSS with custom gym-themed design tokens

## Recent Changes
- **2025-08-05**: Supabase Integration Setup
  - Updated database connection to use postgres-js for Supabase compatibility
  - Configured SSL requirements for Supabase
  - Implemented real camera access for QR scanner with live video feed
  - Added animated demo video for scanner functionality
  - Enhanced scanner UI with detection overlay and instructions

- **2025-01-04**: Migrated from Lovable to Replit environment
  - Converted React Router to Wouter for routing
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
- ✅ Supabase to PostgreSQL migration completed
- ✅ React Router to Wouter conversion completed
- ✅ All navigation routes implemented and functional