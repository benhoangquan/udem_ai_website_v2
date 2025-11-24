import React, { useState, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";
import { MemberDisplay } from "../../types/member";
import TeamMemberAvatar from "./TeamMemberAvatar";
import TeamMemberInfo from "./TeamMemberInfo";
import NavigationControls from "./NavigationControls";

interface TeamCarouselProps {
  members: MemberDisplay[];
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const [autoplay, setAutoplay] = useState(false);

  // Alternate between seth-coral and cream colors based on index
  const isCoral = currentIndex % 2 === 0;
  const bgColor = isCoral ? "bg-seth-coral" : "bg-cream";
  const textColor = isCoral ? "text-white" : "text-seth-coral";

  const currentMember = members[currentIndex];

  const goToNextMember = useCallback(() => {
    if (isAnimating || members.length <= 1) return;

    setIsAnimating(true);
    setShowAvatar(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
      setTimeout(() => {
        setShowAvatar(true);
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, [isAnimating, members.length]);

  const goToPrevMember = useCallback(() => {
    if (isAnimating || members.length <= 1) return;

    setIsAnimating(true);
    setShowAvatar(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? members.length - 1 : prevIndex - 1,
      );
      setTimeout(() => {
        setShowAvatar(true);
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, [isAnimating, members.length]);

  const toggleAutoplay = () => setAutoplay(!autoplay);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevMember();
      } else if (e.key === "ArrowRight") {
        goToNextMember();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextMember, goToPrevMember]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || members.length <= 1) return;

    const interval = setInterval(() => {
      goToNextMember();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, goToNextMember, members.length]);

  // If no members found
  if (members.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white text-2xl">No team members found.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col transition-colors duration-500 ease-in-out",
        bgColor,
      )}
    >
      <main
        className={cn(
          "flex-grow flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 transition-colors duration-500",
          textColor,
        )}
      >
        <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left side - Avatar */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0 pl-0 lg:pl-4">
            <TeamMemberAvatar
              avatar={currentMember.avatar}
              showAvatar={showAvatar}
            />
          </div>

          {/* Right side - Member info and navigation */}
          <div className="w-full lg:w-1/2">
            <TeamMemberInfo member={currentMember} textColor={textColor} />

            {members.length > 1 && (
              <NavigationControls
                onPrev={goToPrevMember}
                onNext={goToNextMember}
                autoplay={autoplay}
                onToggleAutoplay={toggleAutoplay}
                textColor={textColor}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamCarousel;
