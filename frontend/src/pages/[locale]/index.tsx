import React from 'react';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/main/HeroSection';
import ActivitiesSection from '@/components/main/ActivitiesSection';
import SpecializationSection from '@/components/main/SpecializationSection';
import JoinUsSection from '@/components/main/JoinUsSection';
import ContactSection from '@/components/main/ContactSection';

import { getActivities } from '@/services/activityService';
import { ActivityDisplay } from '@/types/activity';
import { GetStaticProps, GetStaticPaths } from 'next';
import { locales } from '@/i18n/config';

interface HomeProps {
  activities: ActivityDisplay[];
  messages: any;
}

export default function Home({ activities }: HomeProps) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;
  const activities = await getActivities(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: { 
      activities,
      messages,
    },
    revalidate: 60,
  };
};

