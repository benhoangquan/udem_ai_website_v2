import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getBlogPostBySlug, getBlogPosts } from '@/services/blogService';
import { Blog } from '@/types/blog';
import { urlFor } from '@/lib/sanity';
import { format } from 'date-fns';
import { ChevronLeftIcon } from 'lucide-react';

interface BlogPostProps {
  post: Blog;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="bg-cream min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center">
        <h1 className="seth-heading-1 text-seth-coral">Blog post not found</h1>
        <button 
          onClick={() => router.push('/blog')}
          className="mt-4 font-seth-heading-1 text-seth-coral underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.body 
    ? post.body.reduce((count, block) => {
        if (block._type !== 'block' || !block.children) return count;
        return count + block.children
          .filter(child => child._type === 'span')
          .reduce((sum, span) => sum + (span.text?.split(/\s+/).length || 0), 0);
      }, 0)
    : 0;
  
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format the date
  const publishDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy') 
    : 'Publication date unknown';

  return (
    <article className="bg-cream min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="my-6">
          <Link href="/blog">
            <button 
              className="flex items-center justify-center py-2 px-4 rounded-full text-seth-coral hover:bg-seth-coral hover:text-white transition-colors duration-300"
              aria-label="Back to blog"
            >
              <ChevronLeftIcon className="h-6 w-6" />
              <span className="ml-2 text-lg">Back to blog</span>
            </button>
          </Link>
        </div>

        <h1 className="seth-heading-2 text-seth-coral mb-4">{post.title}</h1>
        
        <div className="text-seth-coral text-lg mb-4">
          {publishDate} • {readingTime} min read
        </div>
        
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.categories.map(category => (
              <span 
                key={category._id} 
                className="text-seth-coral text-lg px-3 py-1 rounded-full border border-seth-coral"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        {post.mainImage && (
          <div className="mb-8">
            <Image 
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto rounded"
            />
          </div>
        )}
        
        <div className="text-seth-coral prose lg:prose-lg max-w-none">
          {post.body && (
            <PortableText 
              value={post.body}
              components={{
                block: {
                  normal: ({children}) => <p className="text-lg mb-4">{children}</p>,
                  h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold mt-5 mb-3">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-seth-coral pl-4 italic my-4">{children}</blockquote>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
                },
                listItem: {
                  bullet: ({children}) => <li className="mb-1">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  link: ({value, children}) => {
                    const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                    return (
                      <a 
                        href={value?.href} 
                        target={target}
                        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="text-seth-coral underline"
                      >
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          )}
        </div>
        
        {post.author && (
          <div className="mt-12 flex items-center">
            {post.author.avatar && (
              <div className="mr-4">
                <Image 
                  src={urlFor(post.author.avatar).width(80).height(80).url()}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <p className="font-seth-heading-1 text-seth-coral text-sm">Written by</p>
              <p className="font-seth-heading-1 text-seth-coral text-lg">{post.author.name}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getBlogPosts();
    
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating blog post paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
      revalidate: 60, // Regenerate page after 60 seconds
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug "${params.slug}":`, error);
    return {
      notFound: true,
    };
  }
};

export default BlogPost; 