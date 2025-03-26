import { sanityClient } from '@/lib/sanity';
import { Resource, ResourceDisplay } from '@/types/resource';
import { BlockContent } from '@/types/activity';

/**
 * Extract text from BlockContent for simple display
 */
function extractTextFromBlockContent(blockContent: BlockContent): string {
  if (!blockContent || !Array.isArray(blockContent)) return '';
  
  // Try to extract text from the first block if it exists
  const firstBlock = blockContent.find(block => block._type === 'block');
  if (firstBlock && firstBlock.children) {
    return firstBlock.children
      .filter(child => child._type === 'span')
      .map(span => span.text || '')
      .join('');
  }
  
  return '';
}

/**
 * Fetches all resources from Sanity CMS
 */
export async function getResources(): Promise<ResourceDisplay[]> {
  const query = `*[_type == "resource"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    difficulty,
    tags,
    publishedAt,
    updatedAt,
    featured
  }`;

  try {
    const resources = await sanityClient.fetch<Record<string, any>[]>(query);

    return resources.map((resource: Record<string, any>) => ({
      _id: resource._id as string,
      title: resource.title as string,
      slug: resource.slug as string,
      category: resource.category || null,
      description: typeof resource.description === 'string'
        ? resource.description
        : extractTextFromBlockContent(resource.description as BlockContent),
      difficulty: resource.difficulty as string,
      tags: resource.tags as string[] || [],
      publishedAt: resource.publishedAt as string,
      updatedAt: resource.updatedAt as string,
      featured: resource.featured as boolean || false
    }));
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

/**
 * Fetches all resource categories from Sanity CMS
 */
export async function getResourceCategories(): Promise<string[]> {
  const query = `*[_type == "resource"] {
    category
  }`;

  try {
    return await sanityClient.fetch<string[]>(query);
  } catch (error) {
    console.error('Error fetching resource categories:', error);
    return [];
  }
} 