import { useMemo, useState } from 'react';
import { BlogDisplay } from '@/types/blog';

export function useBlogFilters(posts: BlogDisplay[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract all unique categories from posts
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    posts.forEach(post => {
      post.categories?.forEach(category => {
        categoriesSet.add(category);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [posts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((id) => id !== category)
        : [...prev, category]
    );
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.body && post.body.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategories.length === 0 || 
        (post.categories && post.categories.some(category => 
          selectedCategories.includes(category)
        ));

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategories]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    filteredPosts,
    allCategories,
  };
} 