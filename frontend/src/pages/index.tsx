import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import ExperienceSection from '@/components/ExperienceSection';
import SpecializationSection from '@/components/SpecializationSection';
import ActivitiesCarousel from '@/components/ActivitiesCarousel';
import JoinUsSection from '@/components/JoinUsSection';
import ContactSection from '@/components/ContactSection';

import { getActivities } from '@/services/activityService';
import { ActivityDisplay } from '@/types/activity';

export default function Home({ activities }: { activities: ActivityDisplay[] }) {
  return (
    <main className="bg-cream">
      <Navbar />
      <HeroSection />
      <SpecializationSection />
      <ActivitiesSection activities={activities} />
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
