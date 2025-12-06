import { useMemo, useState } from 'react';
import { ResourceDisplay } from '@/types/resource';

export function useResourceFilters(resources: ResourceDisplay[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((id) => id !== category)
        : [...prev, category]
    );
  };

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.description &&
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(resource.category);

      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, selectedCategories]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    filteredResources,
  };
}