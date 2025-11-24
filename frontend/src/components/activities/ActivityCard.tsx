import React from 'react';
import Image from 'next/image';
import { ActivityDisplay } from '@/types/activity';

interface ActivityCardProps {
  activity: ActivityDisplay;
  className?: string;
  imageContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  tagClassName?: string;
  locationClassName?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  className = '',
  imageContainerClassName = '',
  contentClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  dateClassName = '',
  tagClassName = '',
  locationClassName = '',
}) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`rounded-lg overflow-hidden project-card w-full h-[500px] flex flex-col ${className}`}>
      <div className={`aspect-[54/45] relative ${imageContainerClassName}`}>
        <Image
          src={activity.mainImage || '/placeholder-image.jpg'}
          alt={activity.title}
          fill
          className="object-cover rounded-sm"
        />
      </div>

      <div className={`flex flex-col p-4 flex-grow ${contentClassName}`}>
        <div className="overflow-hidden">
          <h3 className={`text-2xl font-bold mb-2 line-clamp-2 ${titleClassName}`}>{activity.title}</h3>
          {activity.type && (
            <span className={`inline-block bg-seth-coral text-white px-4 py-1 rounded-full text-sm ${tagClassName}`}>
              {activity.type.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <p className={`text-lg ${dateClassName}`}>
            {activity.startDateTime && formatDate(activity.startDateTime)}
          </p>
          <p className={`text-lg overflow-hidden ${locationClassName}`}>
            {activity.location?.address}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default ActivityCard; 