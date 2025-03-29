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
  slug: {
    current: string;
  };
  category?: {
    _id: string;
    title: string;
  };
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Resource {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: {
    _id: string;
    title: string;
  };
  description?: BlockContent;
  content?: ResourceContent[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  publishedAt?: string;
  relatedResources?: RelatedResource[];
}

// Simplified version for display purposes
export interface ResourceDisplay {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description?: string; // Simplified to string for frontend display
  difficulty?: string;
  publishedAt?: string;
  url: string; // URL to the external resource
} 