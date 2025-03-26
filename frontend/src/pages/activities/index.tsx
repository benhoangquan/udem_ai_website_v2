import { useState } from 'react';
import ActivitiesCarousel from '@/components/ActivitiesCarousel';
import ActivityCalendar from '@/components/ActivityCalendar';
import { getActivities } from '@/services/activityService';
import { ActivityDisplay } from '@/types/activity';
import { isSameDay } from 'date-fns';

export default function ActivitiesPage({ activities }: { activities: ActivityDisplay[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Filter activities based on selected date
  const filteredActivities = selectedDate 
    ? activities.filter(activity => isSameDay(new Date(activity.startDateTime), selectedDate))
    : activities;

  return (
    <main className="bg-seth-coral px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="seth-heading text-cream pt-20 pb-10">Upcoming Activities</h1>
        
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left column: Calendar */}
          <div className="w-full md:w-[420px] h-fit w-fit bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-seth-coral">Activity Calendar</h2>
            <ActivityCalendar 
              activities={activities} 
              onDateSelect={setSelectedDate} 
            />
            {selectedDate && (
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {filteredActivities.length === 0 
                    ? 'No activities on selected date' 
                    : `${filteredActivities.length} activit${filteredActivities.length === 1 ? 'y' : 'ies'}`}
                </p>
                <button 
                  onClick={() => setSelectedDate(undefined)}
                  className="text-sm text-seth-coral hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
          
          {/* Right column: Activities Carousel */}
          <div className="w-full md:w-[calc(100%-450px)] h-fit w-fit">
            {filteredActivities.length > 0 ? (
              <ActivitiesCarousel activities={filteredActivities} />
            ) : selectedDate ? (
              <div className="bg-white p-6 rounded-lg shadow-md h-[420px] flex items-center justify-center">
                <p className="text-lg text-gray-600">No activities scheduled for {selectedDate.toLocaleDateString()}</p>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md h-[420px] flex items-center justify-center">
                <p className="text-lg text-gray-600">No upcoming activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const activities = await getActivities();
  return {
    props: { activities },
    revalidate: 60, // Optional: ISR (rebuild every 60 seconds)
  };
} 