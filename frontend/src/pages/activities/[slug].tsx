import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { sanityClient, urlFor } from '@/lib/sanity';
import { ActivityDisplay, BlockContent, BlockContentChild } from '@/types/activity';
import Navbar from '@/components/common/Navbar';
import Link from 'next/link';
import Image from 'next/image';

interface ActivityDetailsProps {
  activity: ActivityDisplay;
}

export default function ActivityDetails({ activity }: ActivityDetailsProps) {
  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navbar />
      <div className="bg-cream py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/activities" className="text-seth-coral hover:underline flex items-center mb-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to activities
          </Link>

          <h1 className="text-4xl font-bold mb-4">{activity.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {activity.categories.map((category, index) => (
              <span key={index} className="bg-seth-coral text-white px-3 py-1 rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
          
          {activity.mainImageUrl && (
            <div className="mb-8">
              <Image 
                src={activity.mainImageUrl} 
                alt={activity.title} 
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-lg">{activity.description}</p>
          </div>
          
          <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Event Details</h2>
            <p>Date: {new Date(activity.startDateTime).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p>Time: {new Date(activity.startDateTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "activity"] {
    "slug": slug.current
  }`;
  
  const activities = await sanityClient.fetch(query);
  
  const paths = activities.map((activity: { slug: string }) => ({
    params: { slug: activity.slug }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;
  
  const query = `*[_type == "activity" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    description,
    mainImage,
    categories,
    "startDateTime": schedule.startDateTime
  }`;
  
  const activity = await sanityClient.fetch(query, { slug });
  
  if (!activity) {
    return {
      notFound: true
    };
  }

  // Function to extract text from BlockContent
  const extractText = (blockContent: BlockContent): string => {
    if (!blockContent || !Array.isArray(blockContent)) return '';
    
    return blockContent
      .filter(block => block._type === 'block')
      .map(block => 
        block.children
          ?.filter((child: BlockContentChild) => child._type === 'span')
          .map((span: BlockContentChild) => span.text || '')
          .join('')
      )
      .join(' ') || '';
  };
  
  // Transform to ActivityDisplay format
  const activityDisplay: ActivityDisplay = {
    _id: activity._id,
    title: activity.title,
    slug: activity.slug,
    type: activity.type,
    description: typeof activity.description === 'string' 
      ? activity.description 
      : extractText(activity.description),
    mainImage: activity.mainImage,
    mainImageUrl: activity.mainImage ? urlFor(activity.mainImage).width(800).url() : '',
    startDateTime: activity.startDateTime,
    categories: [activity.type.toUpperCase().replace('_', ' ')]
  };
  
  return {
    props: {
      activity: activityDisplay
    },
    revalidate: 60
  };
}; 