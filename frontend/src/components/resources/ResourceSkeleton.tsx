import React from 'react';

const ResourceSkeleton: React.FC = () => {
  return (
    <div className="bg-cream/50 rounded-lg p-6 h-full flex flex-col animate-pulse">
      <div className="h-4 w-1/4 bg-gray-200 rounded-full mb-3 self-start"></div>
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ResourceSkeleton; 