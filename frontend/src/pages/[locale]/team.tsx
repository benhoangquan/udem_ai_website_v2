import React from "react";
import Head from "next/head";
import { getExecutiveMembers } from "@/services/memberService";
import { MemberDisplay } from "@/types/member";
import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";
import TeamCarousel from "@/components/team/TeamCarousel";

interface TeamPageProps {
  teamMembers: MemberDisplay[];
}

const TeamPage: React.FC<TeamPageProps> = ({ teamMembers }) => {
  return (
    <>
      <Head>
        <title>Our Team | UdeM AI</title>
        <meta
          name="description"
          content="Meet the amazing team behind UdeM AI"
        />
      </Head>

      <TeamCarousel members={teamMembers} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;
  try {
    const members = await getExecutiveMembers(locale);
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
      props: {
        teamMembers: members,
        messages,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching team members:", error);
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      props: {
        teamMembers: [],
        messages,
      },
      revalidate: 300,
    };
  }
};

export default TeamPage;
