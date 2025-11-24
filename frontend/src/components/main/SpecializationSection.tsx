'use client';

import React from 'react';
import AnimatedText from '@/components/common/AnimatedText';
import { useTranslations } from 'next-intl';

const SpecializationSection: React.FC = () => {
  const t = useTranslations('specialization');
  
  return (
    <div className="bg-cream text-seth-coral py-16 md:py-16 w-[80%] mx-auto">
      <div className="container mx-auto px-8 max-w-full">
        <div className="w-full">
          <AnimatedText
            text={t('title')}
            className="seth-heading mb-8 transition-colors duration-500"
          />
          <AnimatedText
            text={t('description')}
            className="seth-heading-2 mb-8"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecializationSection;