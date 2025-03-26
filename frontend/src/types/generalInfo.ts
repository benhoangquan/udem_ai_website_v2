import { SanityImageSource } from './activity';

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  discord?: string;
}

export interface GeneralInfo {
  _id: string;
  title: string;
  description?: string;
  email: string;
  logo: SanityImageSource;
  gallery?: SanityImageSource[];
  socialMedia?: SocialLinks;
}

// Simplified version for display purposes
export interface GeneralInfoDisplay {
  _id: string;
  title: string;
  description?: string;
  email: string;
  logo: string; // URL
  gallery?: string[]; // URLs
  socialMedia?: SocialLinks;
} 