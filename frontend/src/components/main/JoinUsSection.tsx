'use client';

import React from 'react';
import Link from 'next/link';
import TypeWriter from '../common/TypeWriter';
import AnimatedText from '@/components/common/AnimatedText';

const JoinUsSection: React.FC = () => {
  return (
    <div className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedText
          text="Let's create something incredible together."
          className="seth-heading mb-8 transition-colors duration-500"
        />

        <TypeWriter 
          text="Three ways to join us."
          className="seth-heading-2 text-seth-coral/50 mb-16"
          tag="p"
          speed={60}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {/* Executive Member Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">Executive Member</h3>
            <p className="text-seth-coral mb-8 flex-grow">
              Help us lead and organize events, workshops, and club activities. We're always looking for new executives to join the team.
            </p>
            <Link
              href="/opportunity"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              See openings
            </Link>
          </div>

          {/* Active Member Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">Active Member</h3>
            <p className="text-seth-coral mb-8 flex-grow">
              Join our workshops, classes, and projects. Get access to perks like mentor support, pizza nights, networking, job and conference opportunities.
            </p>
            <Link
              href="https://discord.gg/2Ttnw8p2Hy"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              Join our Discord server
            </Link>
          </div>

          {/* Collaborate With Us Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">Collab With Us</h3>
            <p className="text-seth-coral mb-8 flex-grow">
              We're open to collaborations with other clubs, sponsors, and partners. Whether it’s co-hosting an event or providing support, we’d love to hear from you.
            </p>
            <Link
              href="mailto:hey@udemai.ca"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              Send us an email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
