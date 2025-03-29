// components/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogDisplay } from '@/types/blog';

interface BlogCardProps {
  post: BlogDisplay;
}

const getTitle = (title: string) => title.length > 30 ? title.slice(0, 30) + '...' : title;
const getBody = (body: string) => body.length > 150 ? body.slice(0, 150) + '...' : body;

const BlogCard = ({ post }: BlogCardProps) => {
  const publishDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy') 
    : 'Publication date unknown';

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {post.mainImage && (
          <div className="relative aspect-[54/45]">
            <Image src={post.mainImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="seth-heading-3 text-seth-coral mb-2">{getTitle(post.title)}</h2>
          <div className="text-seth-coral text-md mb-2">{publishDate}</div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, i) => (
                <span key={i} className="text-seth-coral text-md px-2 py-1 rounded-full border border-seth-coral">
                  {category}
                </span>
              ))}
            </div>
          )}

          <p className="text-seth-coral text-md flex-1">{post.body}</p>

          <div className="mt-4">
            <span className="text-seth-coral text-md">{post.author?.name || 'Unknown Author'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;