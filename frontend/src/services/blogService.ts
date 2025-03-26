import { sanityClient, urlFor } from '@/lib/sanity';
import { Blog, BlogDisplay } from '@/types/blog';
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
 * Fetches all published blog posts from Sanity CMS
 */
export async function getBlogPosts(): Promise<BlogDisplay[]> {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->{
      _id,
      name,
      avatar
    },
    mainImage,
    "categories": categories[]->title,
    publishedAt,
    body
  }`;

  try {
    const posts = await sanityClient.fetch<Record<string, any>[]>(query);

    return posts.map((post: Record<string, any>) => ({
      _id: post._id as string,
      title: post.title as string,
      slug: post.slug as string,
      author: {
        _id: post.author?._id || '',
        name: post.author?.name || 'Unknown Author',
        avatar: post.author?.avatar ? urlFor(post.author.avatar).width(50).height(50).url() : undefined,
      },
      mainImage: post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined,
      categories: post.categories as string[] || [],
      publishedAt: post.publishedAt as string,
      body: post.body ? extractTextFromBlockContent(post.body as BlockContent).substring(0, 150) + '...' : '',
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "author": author->{
      _id,
      name,
      avatar
    },
    mainImage,
    "categories": categories[]->{ _id, title },
    publishedAt,
    body
  }`;

  try {
    const post = await sanityClient.fetch<Blog | null>(query, { slug });
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
} 