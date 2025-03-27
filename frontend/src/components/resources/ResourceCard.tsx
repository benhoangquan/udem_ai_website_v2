import React from 'react';
import Link from 'next/link';
import { ResourceDisplay } from '@/types/resource';

interface ResourceCardProps {
  resource: ResourceDisplay;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  // Function to determine difficulty badge color
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/resources/${resource.slug}`}>
      <div 
        className="bg-cream rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        aria-label={`Resource: ${resource.title}`}
      >
        {resource.featured && (
          <div className="bg-seth-coral text-white text-xs uppercase font-semibold tracking-wider py-1 px-2 rounded-full inline-block mb-3 self-start">
            Featured
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          {resource.category ? (
            <span className="text-sm font-medium text-seth-coral">
              {resource.category}
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-400">
              Uncategorized
            </span>
          )}
          
          {resource.difficulty && (
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
              {resource.difficulty}
            </span>
          )}
        </div>
        
        {resource.description && (
          <p className="text-gray-700 text-sm mb-4 flex-grow">
            {resource.description.length > 120 
              ? `${resource.description.substring(0, 120)}...` 
              : resource.description}
          </p>
        )}
        
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-gray-500 text-xs">+{resource.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ResourceCard; 