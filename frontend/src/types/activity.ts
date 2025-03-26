// Simplified Sanity image type
export type SanityImageSource = Record<string, unknown>;

// Block content child type
export interface BlockContentChild {
  _type: string;
  _key: string;
  text?: string;
  marks?: string[];
  [key: string]: unknown;
}

// Block content block type
export interface BlockContentBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: BlockContentChild[];
  [key: string]: unknown;
}

// Simplified block content type
export type BlockContent = BlockContentBlock[];

export interface Location {
  type: 'in_person' | 'online' | 'hybrid';
  venue?: string;
  address?: string;
  meetingLink?: string;
}

export interface Activity {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  type: 'workshop' | 'hackathon' | 'study_group' | 'project_meeting' | 'social' | 'competition' | 'other';
  description?: BlockContent;
  mainImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  schedule: {
    startDateTime: string;
    endDateTime?: string;
    isRecurring?: boolean;
    recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
  };
  location?: Location;
  status?: 'planned' | 'open' | 'full' | 'in_progress' | 'completed' | 'cancelled';
}

// Simplified version for display purposes
export interface ActivityDisplay {
  _id: string;
  title: string;
  slug: string;
  type: string;
  description?: string; // Simplified to string for frontend display
  mainImage?: SanityImageSource;
  mainImageUrl?: string; // Processed URL for the image
  gallery?: SanityImageSource[];
  galleryImageUrls?: string[]; // Processed URL for the image
  startDateTime: string;
  categories: string[]; // For compatibility with the existing component
  status?: string;
  location?: Location;
} 