import { SanityImageSource } from './activity';

export interface Member {
  _id: string;
  name: string;
  email: string;
  role: 'member' | 'executive' | 'alumni';
  executivePosition?: string;
  avatar?: SanityImageSource;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    discord?: string;
  };
}

// Simplified version for display purposes
export interface MemberDisplay {
  _id: string;
  name: string;
  role: string;
  executivePosition?: string;
  avatar?: string; // URL
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    discord?: string;
  };
} 