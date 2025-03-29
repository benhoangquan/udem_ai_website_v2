import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

if (!process.env.SANITY_STUDIO_PROJECT_ID) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is required in .env file');
}

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error('SANITY_AUTH_TOKEN is required in .env file');
}

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production', // Always use production dataset for real data
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-03-26',
  useCdn: false,
}); 