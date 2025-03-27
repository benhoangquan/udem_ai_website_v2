# UDEM AI Website

A modern web application built with Next.js for the frontend and Sanity.io for content management.

## Project Structure

- `/frontend`: Next.js application with Tailwind CSS and shadcn/ui components
- `/backend`: Sanity.io CMS setup with custom schemas and mock data scripts

## Technologies

### Frontend
- Next.js 15
- React 18
- Tailwind CSS
- shadcn UI components
- TypeScript

### Backend
- Sanity.io CMS
- TypeScript
- Mock data generation scripts

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup Instructions

1. Clone the repository
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Frontend Setup
   ```
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

3. Backend Setup
   ```
   cd backend
   npm install
   npm run dev
   ```
   The Sanity Studio will be available at http://localhost:3333

### Additional Commands

#### Frontend
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

#### Backend
- `npm run build`: Build Sanity Studio
- `npm run deploy`: Deploy Sanity Studio
- `npm run generate-mock-data`: Generate mock data
- `npm run import-mock-data`: Import generated mock data

## Environment Variables

Make sure to set up the required environment variables in both frontend and backend `.env` files.
