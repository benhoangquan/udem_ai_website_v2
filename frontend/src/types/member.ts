import { SanityImageSource } from './activity';

export interface Member {
  _id: string;
  name: string;
  email: string;
  role: 'member' | 'executive' | 'alumni';
  executivePosition?: string;
  avatar?: SanityImageSource;
  bio?: string;
  linkedin?: string;
}

// Simplified version for display purposes
export interface MemberDisplay {
  _id: string;
  name: string;
  role: string;
  executivePosition?: string;
  avatar?: string; // URL
  bio?: string;
  linkedin?: string;
} 