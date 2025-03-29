import React from 'react';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/main/HeroSection';
import ActivitiesSection from '@/components/main/ActivitiesSection';
import SpecializationSection from '@/components/main/SpecializationSection';
import JoinUsSection from '@/components/main/JoinUsSection';
import ContactSection from '@/components/main/ContactSection';

import { getActivities } from '@/services/activityService';
import { ActivityDisplay } from '@/types/activity';

export default function Home({ activities }: { activities: ActivityDisplay[] }) {
  return (
    <main className="bg-cream">
      <Navbar />
      <HeroSection />
      <SpecializationSection />
      <div id="activities">
        <ActivitiesSection activities={activities}/>
      </div>
      <JoinUsSection />
      <ContactSection />
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
