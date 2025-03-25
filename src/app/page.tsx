import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ServicesList from '@/components/ServicesList';
import ExperienceSection from '@/components/ExperienceSection';
import SpecializationSection from '@/components/SpecializationSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      <SpecializationSection />
      <ExperienceSection />

      <ServicesList />
      
      <PortfolioSection />
      
      <ServicesSection />

      <ContactSection />
    </main>
  );
}
