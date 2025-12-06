"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActivityDisplay } from "@/types/activity";
import ActivityCard from "@/components/activities/ActivityCard";
import { useAutoCarousel } from "@/hooks/useAutoCarousel";
import { useTranslations } from "next-intl";

interface ActivitiesCarouselProps {
  activities?: ActivityDisplay[];
  cardClassName?: string;
  imageContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  tagClassName?: string;
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({
  activities,
  cardClassName,
  imageContainerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  tagClassName,
}) => {
  const t = useTranslations("activities");
  const {
    currentIndex,
    setCurrentIndex,
    scrollTo,
    next,
    prev,
    isAutoScrolling,
    toggleAutoScroll,
    stopAutoScroll,
  } = useAutoCarousel(activities?.length || 0, 3000);

  const projects = activities;

  const handlePrevious = () => {
    stopAutoScroll();
    prev();
    stopAutoScroll();
    prev();
  };
  
  const handleNext = () => {
    stopAutoScroll();
    next();
  };
    stopAutoScroll();
    next();
  };

  // Stop auto-scrolling when user interacts with navigation
  const handleUserInteraction = (callback: () => void) => {
    return () => {
      stopAutoScroll();
      stopAutoScroll();
      callback();
    };
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-cream mb-2">
            {t("noActivities")}
          </h3>
          <p className="text-cream text-xl">{t("noActivitiesMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  relative">
      <div className="w-full">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects?.map((project, index) => (
            <div
              key={`${project.title}-${project.startDateTime}-${index}`}
              className="flex-shrink-0 w-full md:w-[400px] h-[500px] snap-center px-2"
            >
              <ActivityCard
                activity={project}
                className={cardClassName}
                imageContainerClassName={imageContainerClassName}
                contentClassName={contentClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
                tagClassName={tagClassName}
              />
            </div>
          ))}
        </div>
        {/* Navigation row container */}
        <div className="relative w-full flex items-center justify-between mt-4">
          {/* Navigation controls */}
          <div className="flex-1">
            {/* This empty div helps maintain center alignment for dots */}
          </div>

          {/* Dot indicators - centered */}
          <div className="flex justify-center gap-2">
            {projects?.map((_, index) => (
            {projects?.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-cream" : "w-2 bg-gray-300"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollTo(index);
                  stopAutoScroll();
                  scrollTo(index);
                  stopAutoScroll();
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation controls - right aligned */}
          <div className="flex-1 flex justify-end gap-2">
            <button
              className="h-10 w-10 rounded-full bg-cream text-seth-coral flex items-center justify-center hover:bg-opacity-90 transition-colors"
              onClick={handleUserInteraction(handlePrevious)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              className="h-10 w-10 rounded-full bg-cream text-seth-coral flex items-center justify-center hover:bg-opacity-90 transition-colors"
              onClick={handleUserInteraction(handleNext)}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesCarousel;
