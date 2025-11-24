import React from "react";
import {
  Github,
  Instagram,
  Linkedin,
  MessageSquare,
  Twitter,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SocialLinksProps {
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    discord?: string;
  };
  textColor: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  textColor,
}) => {
  if (!socialLinks) return null;

  return (
    <div className="flex gap-4">
      {socialLinks.linkedin && (
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("hover:opacity-80 transition-opacity", textColor)}
        >
          <Linkedin size={24} />
        </a>
      )}
      {socialLinks.twitter && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("hover:opacity-80 transition-opacity", textColor)}
        >
          <Twitter size={24} />
        </a>
      )}
      {socialLinks.github && (
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("hover:opacity-80 transition-opacity", textColor)}
        >
          <Github size={24} />
        </a>
      )}
      {socialLinks.instagram && (
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("hover:opacity-80 transition-opacity", textColor)}
        >
          <Instagram size={24} />
        </a>
      )}
      {socialLinks.discord && (
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("hover:opacity-80 transition-opacity", textColor)}
        >
          <MessageSquare size={24} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
