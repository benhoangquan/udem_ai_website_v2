// Simplified version for display purposes (used for markdown-based members)
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