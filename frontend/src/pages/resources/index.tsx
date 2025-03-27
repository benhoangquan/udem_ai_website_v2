import React, { useState, useEffect, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Navbar from '@/components/ui/Navbar';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import { ResourceDisplay } from '@/types/resource';
import { getResources, getResourceCategories } from '@/services/resourceService';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';

interface ResourcesPageProps {
  resources: ResourceDisplay[];
  categories: string[];
}

export default function ResourcesPage({ resources, categories }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Filter resources based on search query and selected categories
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      // Filter by search query
      const matchesSearch = 
        debouncedSearchQuery === '' ||
        resource.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (resource.description && resource.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (resource.tags && resource.tags.some(tag => 
          tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        ));
        
      // Filter by selected categories
      const matchesCategory = 
        selectedCategories.length === 0 || 
        (selectedCategories.includes(resource.category));
        
      return matchesSearch && matchesCategory;
    });
  }, [resources, debouncedSearchQuery, selectedCategories]);
  
  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearchQuery, selectedCategories]);
  
  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-cream text-seth-coral py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-8">
          <h1 className="seth-heading mb-6">
            What will you learn next?
          </h1>
          <p className="seth-heading-2 text-seth-coral/80">
            Discover AI Tools, tutorials, and resources.
          </p>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 container mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seth-coral"
                aria-label="Search resources"
              />
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Filter Status */}
          <div className="text-sm text-gray-500">
            {isLoading ? 
              'Updating results...' : 
              `Showing ${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''}`
            }
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            key={"succurro"}
            onClick={() => {}}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategories.includes("")
                ? 'bg-seth-coral text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            aria-pressed={selectedCategories.includes("")}
          >
            1
          </button>

          {categories.map((category) => (
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
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <ResourceSkeleton key={i} />
            ))
          ) : filteredResources.length > 0 ? (
            // Resource Cards
            filteredResources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                }}
                className="bg-seth-coral text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const resources = await getResources();
  const categories = await getResourceCategories();
  
  return {
    props: {
      resources,
      categories,
    },
    // Revalidate once per hour
    revalidate: 3600,
  };
}; 