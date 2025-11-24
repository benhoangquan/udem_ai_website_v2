import React from "react";
import { cn } from "../../lib/utils";

interface TeamMemberAvatarProps {
  avatar: string | undefined;
  showAvatar: boolean;
}

const TeamMemberAvatar: React.FC<TeamMemberAvatarProps> = ({
  avatar,
  showAvatar,
}) => {
  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[450px] overflow-hidden rounded-3xl border-2">
      {avatar ? (
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out",
            showAvatar ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${avatar})` }}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out",
            showAvatar ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="text-xl">No image available</p>
        </div>
      )}
    </div>
  );
};

export default TeamMemberAvatar;
