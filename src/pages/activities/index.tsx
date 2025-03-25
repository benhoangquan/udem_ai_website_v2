import ActivitiesCarousel from '@/components/ActivitiesCarousel';
import { getActivities } from '@/services/activityService';
import { ActivityDisplay } from '@/types/activity';

export default function ActivitiesPage({ activities }: { activities: ActivityDisplay[] }) {
  return (
    <main className="min-h-screen bg-cream px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold seth-heading text-seth-coral pt-20 pb-10">Upcoming Activities</h1>
        
        {/* Pass the fetched activities to the carousel */}
        <ActivitiesCarousel activities={activities} />
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