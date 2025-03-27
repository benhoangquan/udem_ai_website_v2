import { sanityClient, urlFor } from '@/lib/sanity';
import { Member, MemberDisplay } from '@/types/member';
import { SanityImageSource } from '@/types/activity';

// Define the type for the member data returned from Sanity
interface SanityMember {
  _id: string;
  name: string;
  email?: string;
  role: string;
  executivePosition?: string;
  avatar?: SanityImageSource;
  bio?: string;
  linkedin?: string;
}

/**
 * Fetches all members from Sanity CMS
 */
export async function getMembers(): Promise<MemberDisplay[]> {
  const query = `*[_type == "member"] | order(role) {
    _id,
    name,
    email,
    role,
    executivePosition,
    avatar,
    bio,
    linkedin
  }`;

  try {
    const members = await sanityClient.fetch<SanityMember[]>(query);

    return members.map((member) => ({
      _id: member._id,
      name: member.name,
      role: member.role,
      executivePosition: member.executivePosition,
      avatar: member.avatar ? urlFor(member.avatar).width(300).height(300).url() : undefined,
      bio: member.bio,
      linkedin: member.linkedin,
    }));
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}

/**
 * Fetches executive members
 */
export async function getExecutiveMembers(): Promise<MemberDisplay[]> {
  const query = `*[_type == "member" && role == "executive"] | order(executivePosition) {
    _id,
    name,
    email,
    role,
    executivePosition,
    avatar,
    bio,
    linkedin
  }`;

  try {
    const executives = await sanityClient.fetch<SanityMember[]>(query);

    return executives.map((executive) => ({
      _id: executive._id,
      name: executive.name,
      role: executive.role,
      executivePosition: executive.executivePosition,
      avatar: executive.avatar ? urlFor(executive.avatar).width(300).height(300).url() : undefined,
      bio: executive.bio,
      linkedin: executive.linkedin,
    }));
  } catch (error) {
    console.error('Error fetching executive members:', error);
    return [];
  }
} 