import { sanityClient, urlFor } from '@/lib/sanity';
import { Activity, ActivityDisplay, BlockContent } from '@/types/activity';

/**
 * Extract text from BlockContent for simple display
 */
function extractTextFromBlockContent(blockContent: BlockContent): string {
  if (!blockContent || !Array.isArray(blockContent)) return '';
  
  // Try to extract text from the first block if it exists
  const firstBlock = blockContent.find(block => block._type === 'block');
  if (firstBlock && firstBlock.children) {
    return firstBlock.children
      .filter((child: any) => child._type === 'span')
      .map((span: any) => span.text)
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
    const activities = await sanityClient.fetch<any[]>(query);

    // Transform activities to match the display format
    return activities.map((activity: any) => ({
      _id: activity._id,
      title: activity.title,
      slug: activity.slug || '',
      type: activity.type,
      // Convert BlockContent to string if needed
      description: typeof activity.description === 'string' 
        ? activity.description 
        : extractTextFromBlockContent(activity.description),
      mainImage: activity.mainImage,
      // Generate image URL if available
      imageUrl: activity.mainImage ? urlFor(activity.mainImage).width(600).url() : '',
      tags: activity.tags || [],
      startDateTime: activity.startDateTime,
      // Add categories in the format expected by the carousel
      categories: [activity.type.toUpperCase().replace('_', ' ')]
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
} 