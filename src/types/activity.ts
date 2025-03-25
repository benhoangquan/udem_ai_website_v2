// Simplified Sanity image type
export type SanityImageSource = Record<string, any>;

// Simplified block content type
export type BlockContent = {
  _type: string;
  _key: string;
  [key: string]: any;
}[];

export interface Activity {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  type: 'workshop' | 'hackathon' | 'study_group' | 'project_meeting' | 'social' | 'competition' | 'other';
  description?: BlockContent;
  mainImage?: SanityImageSource;
  tags?: string[];
  schedule: {
    startDateTime: string;
    endDateTime?: string;
    isRecurring?: boolean;
    recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
  };
}

// Simplified version for display purposes
export interface ActivityDisplay {
  _id: string;
  title: string;
  slug: string;
  type: string;
  description?: string; // Simplified to string for frontend display
  mainImage?: SanityImageSource;
  imageUrl?: string; // Processed URL for the image
  tags?: string[];
  startDateTime: string;
  categories: string[]; // For compatibility with the existing component
} 