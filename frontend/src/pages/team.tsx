import React from 'react';
import Navbar from '../components/common/Navbar';
import Head from 'next/head';
import { getExecutiveMembers } from '../services/memberService';
import { MemberDisplay } from '../types/member';
import { GetStaticProps } from 'next';
import TeamCarousel from '../components/team/TeamCarousel';

interface TeamPageProps {
  teamMembers: MemberDisplay[];
}

const TeamPage: React.FC<TeamPageProps> = ({ teamMembers }) => {
  return (
    <>
      <Head>
        <title>Our Team | UdeM AI</title>
        <meta name="description" content="Meet the amazing team behind UdeM AI" />
      </Head>
      
      <Navbar />
      <TeamCarousel members={teamMembers} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const members = await getExecutiveMembers();
    
    return {
      props: {
        teamMembers: members,
      },
      // Revalidate the page every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return {
      props: {
        teamMembers: [],
      },
      // Revalidate more frequently on error
      revalidate: 300,
    };
  }
};

export default TeamPage;
