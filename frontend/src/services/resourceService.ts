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

// Define the type for the resource data returned from Sanity
interface SanityResource {
  _id: string;
  title: string;
  slug: string;
  description?: string | BlockContent;
  category?: string;
  content?: Array<{
    type: 'document' | 'video' | 'code' | 'link' | 'file';
    title?: string;
    description?: string;
    url?: string;
    file?: {
      asset: {
        _ref: string;
        _type: string;
      };
      url: string;
    };
  }>;
  difficulty?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  relatedResources?: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    difficulty?: string;
  }[];
}

/**
 * Fetches all resources from Sanity CMS
 */
export async function getResources(): Promise<ResourceDisplay[]> {
  const query = `*[_type == "resource"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "category": category->title,
    content,
    difficulty,
    tags,
    publishedAt,
    updatedAt,
    featured,
    "relatedResources": relatedResources[]-> {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      difficulty
    }
  }`;

  try {
    const resources = await sanityClient.fetch<SanityResource[]>(query);

    return resources.map((resource) => {
      // Extract URL from content array
      const url = resource.content?.find(item => item.type === 'link')?.url || 
                 resource.content?.find(item => item.type === 'file')?.file?.url || '';

      return {
        _id: resource._id,
        title: resource.title,
        slug: resource.slug,
        category: resource.category || '',
        description: typeof resource.description === 'string'
          ? resource.description
          : extractTextFromBlockContent(resource.description as BlockContent),
        difficulty: resource.difficulty,
        tags: resource.tags || [],
        publishedAt: resource.publishedAt,
        updatedAt: resource.updatedAt,
        featured: resource.featured || false,
        url
      };
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

/**
 * Fetches a single resource by slug
 */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const query = `*[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "category": category->title,
    content,
    difficulty,
    tags,
    publishedAt,
    updatedAt,
    featured,
    "relatedResources": relatedResources[]-> {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      difficulty
    }
  }`;

  try {
    const resource = await sanityClient.fetch<Resource | null>(query, { slug });
    return resource;
  } catch (error) {
    console.error(`Error fetching resource with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches all resource categories from Sanity CMS
 */
export async function getResourceCategories(): Promise<string[]> {
  const query = `*[_type == "category"] {
    title
  }`;

  try {
    const categories = await sanityClient.fetch<{title: string}[]>(query);
    const uniqueCategories = [...new Set(categories.map(cat => cat.title))];
    return uniqueCategories;
  } catch (error) {
    console.error('Error fetching resource categories:', error);
    return [];
  }
} 