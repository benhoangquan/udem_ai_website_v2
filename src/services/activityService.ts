import { sanityClient, urlFor } from '@/lib/sanity';
import { Activity, ActivityDisplay, BlockContent, BlockContentChild } from '@/types/activity';

/**
 * Extract text from BlockContent for simple display
 */
function extractTextFromBlockContent(blockContent: BlockContent): string {
  if (!blockContent || !Array.isArray(blockContent)) return '';
  
  // Try to extract text from the first block if it exists
  const firstBlock = blockContent.find(block => block._type === 'block');
  if (firstBlock && firstBlock.children) {
    return firstBlock.children
      .filter((child: BlockContentChild) => child._type === 'span')
      .map((span: BlockContentChild) => span.text || '')
      .join('');
  }
  
  return 'Click to view details';
}

/**
 * Fetches all published activities from Sanity CMS
 * @returns Array of ActivityDisplay objects ordered by startDateTime
 */
export async function getActivities(): Promise<ActivityDisplay[]> {
  // GROQ query to get all activities ordered by schedule.startDateTime
  const query = `*[_type == "activity"] | order(schedule.startDateTime desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    description,
    mainImage,
    tags,
    "startDateTime": schedule.startDateTime
  }`;

  try {
    // Fetch activities from Sanity
    const activities = await sanityClient.fetch<Record<string, unknown>[]>(query);

    // Transform activities to match the display format
    return activities.map((activity: Record<string, unknown>) => ({
      _id: activity._id as string,
      title: activity.title as string,
      slug: (activity.slug as string) || '',
      type: activity.type as string,
      // Convert BlockContent to string if needed
      description: typeof activity.description === 'string' 
        ? activity.description 
        : extractTextFromBlockContent(activity.description as BlockContent),
      mainImage: activity.mainImage as Record<string, unknown>,
      // Generate image URL if available
      imageUrl: activity.mainImage ? urlFor(activity.mainImage as Record<string, unknown>).width(600).url() : '',
      tags: (activity.tags as string[]) || [],
      startDateTime: activity.startDateTime as string,
      // Add categories in the format expected by the carousel
      categories: [(activity.type as string).toUpperCase().replace('_', ' ')]
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
} 