import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'udem_ai_website_v3',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',
  token: process.env.SANITY_AUTH_TOKEN || '',

  plugins: [structureTool(), visionTool(), 
    presentationTool({
    previewUrl: {
      origin: 'https://udemai.ca',
    },
  }),],

  schema: {
    types: schemaTypes,
  },
})
