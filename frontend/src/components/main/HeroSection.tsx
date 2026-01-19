import React, { useState, useEffect } from "react";
import Image from "next/image";
import TypeWriter from "@/components/common/TypeWriter";
import TypeWriterLoop from "../common/TypeWriterLoop";
import { useTranslations } from "next-intl";
import ParticlesBackground from "@/components/common/ParticlesBackground";

// Array of images for the carousel
// Images should be placed in: public/images/hero/
const carouselImages = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "UdeM AI Community",
  },

  {
    src: "/images/hero/hero-3.jpg",
    alt: "AI Workshop",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "AI Research",
  },
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = useTranslations("hero");

  useEffect(() => {
    // Set up automatic image rotation every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    // Clean up the interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cream py-16 md:py-24 relative overflow-hidden">
      <ParticlesBackground />
      <div className="container mx-auto px-5 md:px-8 max-w-full relative z-10">
        <div className="seth-heading text-seth-coral mb-8 w-full">
          {/* <TypeWriter 
            text="We're UdeM AI,"
            className="block mb-2"
            tag="span"
            speed={40}
          /> */}
          <span className="block mb-2 font-light text-3xl md:text-4xl">
            {t("greeting")}
          </span>
          <span className="block mb-1 font-bold text-5xl md:text-7xl">
            {t("location")}
          </span>
        </div>

        <div className="mt-12">
          <div className="rounded-lg overflow-hidden relative">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover aspect-video"
                  priority={index === 0}
                />
              </div>
            ))}
            {/* This empty div maintains the aspect ratio */}
            <div className="relative w-full pb-[56.25%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
