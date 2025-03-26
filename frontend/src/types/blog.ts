import { SanityImageSource, BlockContent } from './activity';

export interface Blog {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    _id: string;
    name: string;
    avatar?: SanityImageSource;
  };
  mainImage?: SanityImageSource;
  categories?: {
    _id: string;
    title: string;
  }[];
  publishedAt: string;
  body?: BlockContent;
}

// Simplified version for display purposes
export interface BlogDisplay {
  _id: string;
  title: string;
  slug: string;
  author: {
    _id: string;
    name: string;
    avatar?: string; // URL
  };
  mainImage?: string; // URL
  categories?: string[];
  publishedAt: string;
  body?: string; // Simplified for display
} 