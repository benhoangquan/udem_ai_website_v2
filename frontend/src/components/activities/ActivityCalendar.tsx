'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ActivityDisplay } from '@/types/activity';
import { isSameDay } from 'date-fns';

interface ActivityCalendarProps {
  activities: ActivityDisplay[];
  onDateSelect?: (date: Date | undefined) => void;
}

export default function ActivityCalendar({ activities, onDateSelect }: ActivityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Extract dates from activities
  const activityDates = useMemo(() => {
    return activities.map(activity => new Date(activity.startDateTime));
  }, [activities]);

  // Custom day render function to highlight dates with activities
  const modifiers = useMemo(() => {
    return {
      hasActivity: (date: Date) => {
        return activityDates.some(activityDate => isSameDay(date, activityDate));
      }
    };
  }, [activityDates]);

  // Custom styles for days with activities
  const modifiersStyles = {
    hasActivity: {
      fontWeight: 'bold',
      backgroundColor: '#FF4D42/30',
      border: '2px solid #FF4D42',


      borderRadius: '100%'
    }
  };

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div className="mb-6 md:mb-0">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="border-none flex justify-center text-seth-coral"
      />
    </div>
  );
} 