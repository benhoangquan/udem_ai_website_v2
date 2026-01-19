import React from "react";
import HeroSection from "@/components/main/HeroSection";
import ContactSection from "@/components/main/ContactSection";
import ProjectsSection from "@/components/main/ProjectsSection";
import ReadingSection from "@/components/main/ReadingSection";
import AboutSection from "@/components/main/AboutSection";
import EventsCalendar from "@/components/main/EventsCalendar";

import { getActivities } from "@/services/activityService";
import { ActivityDisplay } from "@/types/activity";
import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";

interface HomeProps {
  activities: ActivityDisplay[];
}

export default function Home({ activities }: HomeProps) {
  return (
    <main className="bg-cream">
      <HeroSection />
      <AboutSection />
      <EventsCalendar />
      <ProjectsSection />
      {/* <div id="activities">
        <ActivitiesSection activities={activities} />
      </div> */}
      <ReadingSection />
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
