import React from 'react';
import { ResourceDisplay } from '@/types/resource';
import Link from 'next/link';

interface ResourceCardProps {
  resource: ResourceDisplay;
}

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


const getTitle = (title: string) => title.length > 30 ? title.slice(0, 30) + '...' : title;
const getDescription = (description: string) => description.length > 150 ? description.slice(0, 150) + '...' : description;

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Link 
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col cursor-pointer">
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="seth-heading-3 text-seth-coral mb-2">
            {getTitle(resource.title)}
          </h3>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium rounded-full px-2 py-1 bg-seth-coral text-white">
              {resource.category || 'Uncategorized'}
            </span>
            {resource.difficulty && (
              <span className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
            )}
          </div>

          {resource.description && (
            <p className="text-seth-coral text-md flex-grow">
              {getDescription(resource.description)}              
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;