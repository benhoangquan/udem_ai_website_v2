import { getAllMarkdownFiles } from '@/lib/markdown';
import { ActivityDisplay, Location } from '@/types/activity';

// Frontmatter structure for activity markdown files
interface ActivityFrontmatter {
  title: string;
  type: string;
  startDateTime: string;
  mainImage?: string;
  location?: Location;
  recurrence?: 'weekly' | 'monthly';
}

/**
 * Fetches all activities from markdown files
 * @returns Array of ActivityDisplay objects ordered by startDateTime
 */
export async function getActivities(): Promise<ActivityDisplay[]> {
  try {
    const files = getAllMarkdownFiles<ActivityFrontmatter>('activities');

    // Transform markdown data to ActivityDisplay format
    const activities: ActivityDisplay[] = files.map(({ data }) => {
      // Ensure startDateTime is always a string (gray-matter may parse it as Date)
      const startDateTimeValue = data.startDateTime as string | Date;
      const startDateTime = typeof startDateTimeValue === 'string' 
        ? startDateTimeValue 
        : startDateTimeValue instanceof Date 
          ? startDateTimeValue.toISOString() 
          : String(startDateTimeValue);

      return {
        title: data.title,
        type: data.type,
        startDateTime,
        mainImage: data.mainImage,
        location: data.location,
        recurrence: data.recurrence,
      };
    });

    // Sort by startDateTime descending
    return activities.sort((a, b) => {
      const dateA = new Date(a.startDateTime).getTime();
      const dateB = new Date(b.startDateTime).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}
