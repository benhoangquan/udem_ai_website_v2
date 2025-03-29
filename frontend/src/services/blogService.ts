import { sanityClient, urlFor } from '@/lib/sanity';
import { Blog, BlogDisplay } from '@/types/blog';
import { BlockContent, SanityImageSource } from '@/types/activity';
import { extractTextFromBlockContent } from './util';
// Define the type for the blog data returned from Sanity
interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  author?: {
    _id: string;
    name: string;
    avatar?: SanityImageSource;
  };
  mainImage?: SanityImageSource;
  categories: string[];
  publishedAt: string;
  body?: BlockContent;
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
    const posts = await sanityClient.fetch<SanityBlogPost[]>(query);

    return posts.map((post) => ({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      author: {
        _id: post.author?._id || '',
        name: post.author?.name || 'Unknown Author',
        avatar: post.author?.avatar ? urlFor(post.author.avatar).width(50).height(50).url() : undefined,
      },
      mainImage: post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined,
      categories: post.categories || [],
      publishedAt: post.publishedAt,
      body: post.body ? extractTextFromBlockContent(post.body).substring(0, 150) + '...' : '',
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