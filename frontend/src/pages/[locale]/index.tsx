import React from "react";
import HeroSection from "@/components/main/HeroSection";
import Head from "next/head";
import ContactSection from "@/components/main/ContactSection";
import ProjectsSection from "@/components/main/ProjectsSection";
import ReadingSection from "@/components/main/ReadingSection";
import EducationSection from "@/components/main/ReadingSection"; // Renaming might be confusing, checking imports
import PresentationsSection from "@/components/main/PresentationsSection";
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
      <Head>
        <title>UdeM AI Club</title>
        <meta
          name="description"
          content="The Artificial Intelligence Community of the University of Montreal."
        />
        <meta property="og:title" content="UdeM AI Club" />
        <meta
          property="og:description"
          content="The Artificial Intelligence Community of the University of Montreal."
        />
        <meta
          name="keywords"
          content="UdeM, AI, Artificial Intelligence, Club, University of Montreal, Machine Learning, Deep Learning, Student Community, Montreal, Technology, Workshops, Events"
        />
      </Head>
      <HeroSection />
      <EventsCalendar />
      <ProjectsSection />
      {/* <div id="activities">
        <ActivitiesSection activities={activities} />
      </div> */}
      <PresentationsSection />
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
