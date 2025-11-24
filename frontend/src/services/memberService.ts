import { getAllMarkdownFiles } from '@/lib/markdown';
import { MemberDisplay } from '@/types/member';

// Frontmatter structure for member markdown files
interface MemberFrontmatter {
  _id: string;
  name: string;
  email?: string;
  role: string;
  executivePosition?: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    discord?: string;
  };
}

/**
 * Fetches all members from markdown files
 * @param locale - Optional locale (e.g., 'en', 'fr')
 */
export async function getMembers(locale?: string): Promise<MemberDisplay[]> {
  try {
    const files = getAllMarkdownFiles<MemberFrontmatter>('members', locale);

    return files.map(({ data, content }) => ({
      _id: data._id,
      name: data.name,
      role: data.role,
      executivePosition: data.executivePosition,
      avatar: data.avatar || '',
      bio: data.bio || content.trim(),
      socialLinks: data.socialLinks,
    }));
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

/**
 * Fetches executive members
 * @param locale - Optional locale (e.g., 'en', 'fr')
 */
export async function getExecutiveMembers(locale?: string): Promise<MemberDisplay[]> {
  try {
    const members = await getMembers(locale);
    return members
      .filter(member => member.role === 'executive')
      .sort((a, b) => {
        // Sort by executivePosition if available
        if (a.executivePosition && b.executivePosition) {
          return a.executivePosition.localeCompare(b.executivePosition);
        }
        return a.name.localeCompare(b.name);
      });
  } catch (error) {
    console.error('Error fetching executive members:', error);
    return [];
  }
}
