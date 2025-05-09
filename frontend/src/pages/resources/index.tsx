import React from 'react';
import { GetStaticProps } from 'next';
import Navbar from '@/components/common/Navbar';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import { ResourceDisplay } from '@/types/resource';
import { getResources, getResourceCategories } from '@/services/resourceService';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useResourceFilters } from '@/hooks/useResourceFilters';
import { useLoadingDelay } from '@/hooks/useLoadingDelay';
import SearchBar from '@/components/common/SearchBar';

interface ResourcesPageProps {
  resources: ResourceDisplay[];
  categories: string[];
}

export default function ResourcesPage({ resources, categories }: ResourcesPageProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    filteredResources,
  } = useResourceFilters(resources);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isLoading = useLoadingDelay([debouncedSearchQuery, selectedCategories]);
  
  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      
      {/* Title Section */}
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
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search resources..." />
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