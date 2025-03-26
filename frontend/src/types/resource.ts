import { SanityImageSource, BlockContent } from './activity';


export interface ResourceContent {
  type: 'document' | 'video' | 'code' | 'link' | 'file';
  title: string;
  description?: string;
  url?: string;
  file?: {
    asset: {
      _ref: string;
      _type: string;
    };
    url: string;
  };
}

export interface RelatedResource {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  difficulty?: string;
}

export interface Resource {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  description?: BlockContent;
  content?: ResourceContent[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  contributors?: {
    _id: string;
    name: string;
    image?: SanityImageSource;
  }[];
  relatedResources?: RelatedResource[];
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
}

// Simplified version for display purposes
export interface ResourceDisplay {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description?: string; // Simplified to string for frontend display
  difficulty?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  featured: boolean;
} 