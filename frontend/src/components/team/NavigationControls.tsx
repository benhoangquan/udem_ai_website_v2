import React from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "../../lib/utils";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  textColor: string;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  onNext,
  autoplay,
  onToggleAutoplay,
  textColor,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className={cn(
            "p-3 rounded-full hover:bg-white/10 transition-all",
            textColor,
          )}
          aria-label="Previous team member"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={onNext}
          className={cn(
            "p-3 rounded-full hover:bg-white/10 transition-all",
            textColor,
          )}
          aria-label="Next team member"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleAutoplay}
          className={cn(
            "p-3 rounded-full hover:bg-white/10 transition-all",
            textColor,
          )}
          aria-label="Toggle autoplay"
        >
          {autoplay ? (
            <Pause size={24} className={textColor} />
          ) : (
            <Play size={24} className={textColor} />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;
