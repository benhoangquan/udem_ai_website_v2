import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/services/blogService';
import { BlogDisplay } from '@/types/blog';
import { format } from 'date-fns';
import { useDebounce } from '@/hooks/useDebounce';
import { useBlogFilters } from '@/hooks/useBlogFilters';
import { useLoadingDelay } from '@/hooks/useLoadingDelay';
import { Search } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import BlogCard from '@/components/blog/BlogCard';

interface BlogIndexProps {
  posts: BlogDisplay[];
}

const getTitle = (title: string) => {
  if (title.length > 30) {
    return title.substring(0, 30) + '...';
  }
  return title;
}

const BlogIndex = ({ posts }: BlogIndexProps) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    filteredPosts,
    allCategories,
  } = useBlogFilters(posts);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isLoading = useLoadingDelay([debouncedSearchQuery, selectedCategories]);

  return (
    <div className="bg-cream min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="seth-heading text-seth-coral mt-12">Blog</h1>
        <h1 className="seth-heading-2 text-seth-coral mb-8 mt-4 opacity-50">Latest news and updates</h1>
        
        {/* Search and Filter Section */}
        <section className="pb-0">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="w-full md:w-1/2">
                <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search blog posts..." />
            </div>
            
            {/* Filter Status */}
            <div className="text-sm text-gray-500">
              {isLoading ? 
                'Updating results...' : 
                `Showing ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`
              }
            </div>
          </div>
          
          {/* Category Filters */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setSelectedCategories([])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategories.length === 0
                    ? 'bg-seth-coral text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={selectedCategories.length === 0}
              >
                All
              </button>

              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-seth-coral text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={selectedCategories.includes(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </section>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="seth-heading-3 text-seth-coral mb-4">No blog posts found.</p>
            {(searchQuery || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                }}
                className="bg-seth-coral text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading Skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden h-full animate-pulse">
                  <div className="bg-gray-200 aspect-[54/45]"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                filteredPosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await getBlogPosts();
    
    return {
      props: {
        posts,
      },
      revalidate: 60, // Regenerate page after 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
};

export default BlogIndex; 