import { sanityClient, urlFor } from '@/lib/sanity';
import { Member, MemberDisplay } from '@/types/member';

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
    const members = await sanityClient.fetch<Record<string, any>[]>(query);

    return members.map((member: Record<string, any>) => ({
      _id: member._id as string,
      name: member.name as string,
      role: member.role as string,
      executivePosition: member.executivePosition as string,
      avatar: member.avatar ? urlFor(member.avatar).width(300).height(300).url() : undefined,
      bio: member.bio as string,
      linkedin: member.linkedin as string,
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
    const executives = await sanityClient.fetch<Record<string, any>[]>(query);

    return executives.map((executive: Record<string, any>) => ({
      _id: executive._id as string,
      name: executive.name as string,
      role: executive.role as string,
      executivePosition: executive.executivePosition as string,
      avatar: executive.avatar ? urlFor(executive.avatar).width(300).height(300).url() : undefined,
      bio: executive.bio as string,
      linkedin: executive.linkedin as string,
    }));
  } catch (error) {
    console.error('Error fetching executive members:', error);
    return [];
  }
} 