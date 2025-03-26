import { sanityClient, urlFor } from '@/lib/sanity';
import { Activity, ActivityDisplay, BlockContent, BlockContentChild, Location, SanityImageSource } from '@/types/activity';
import image from 'next/image';

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
    categories,
    mainImage,
    gallery,
    "startDateTime": schedule.startDateTime,
    location,
    status,
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

        // Generate image URL if available
      mainImage: activity.mainImage as Record<string, unknown>,
      mainImageUrl: activity.mainImage ? urlFor(activity.mainImage as Record<string, unknown>).width(600).url() : '',

      // Generate image URLs if available
      gallery: activity.gallery as SanityImageSource[],
      galleryImageUrls: Array.isArray(activity.gallery) 
        ? activity.gallery.map((image: Record<string, unknown>) => urlFor(image).width(600).url())
        : [],

      startDateTime: activity.startDateTime as string,
      // Add categories in the format expected by the carousel
      categories: [(activity.type as string).toUpperCase().replace('_', ' ')],
      status: activity.status as string || 'planned',
      location: activity.location as Location
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

/**
 * Fetches a single activity by slug
 */
export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const query = `*[_type == "activity" && slug.current == $slug][0]`;

  try {
    const activity = await sanityClient.fetch<Activity | null>(query, { slug });
    return activity;
  } catch (error) {
    console.error(`Error fetching activity with slug "${slug}":`, error);
    return null;
  }
} 