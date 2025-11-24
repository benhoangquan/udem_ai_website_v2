"use client";

import React, { useRef, useEffect, useState } from "react";
import ActivitiesCarousel from "@/components/activities/ActivitiesCarousel";
import { ActivityDisplay } from "@/types/activity";
import TypeWriter from "@/components/common/TypeWriter";
import { useTranslations } from "next-intl";

interface ActivitiesCarouselProps {
  activities: ActivityDisplay[];
}

const ActivitiesSection: React.FC<ActivitiesCarouselProps> = ({
  activities,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("activities");

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-colors duration-700 py-16 md:py-16 text-white ${
        isVisible ? "bg-seth-coral" : "bg-seth-coral/30"
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="md:max-w-3xl">
          <TypeWriter
            text={t("title")}
            className="seth-heading leading-tight font-medium"
            tag="p"
            speed={50}
          />

          <TypeWriter
            text={t("subtitle")}
            className="seth-heading-2 leading-snug font-medium mt-6"
            tag="p"
            speed={60}
            startDelay={2000} // Start after the first text finishes
          />
        </div>
      </div>
      <div className="container mx-auto px-4 pt-10">
        <ActivitiesCarousel
          activities={activities}
          cardClassName="bg-cream"
          imageContainerClassName="m-4 aspect-[54/45] overflow-hidden"
          contentClassName="bg-cream text-seth-coral"
          titleClassName="bg-cream text-seth-coral text-4xl"
          descriptionClassName="bg-cream text-seth-coral"
          dateClassName="bg-cream text-seth-coral"
        />
      </div>
    </div>
  );
};

export default ActivitiesSection;
