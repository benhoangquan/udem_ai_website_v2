import React from "react";
import SocialLinks from "./SocialLinks";
import { MemberDisplay } from "../../types/member";

interface TeamMemberInfoProps {
  member: MemberDisplay;
  textColor: string;
}

const TeamMemberInfo: React.FC<TeamMemberInfoProps> = ({
  member,
  textColor,
}) => {
  return (
    <div className="w-full flex flex-col justify-between h-full">
      {/* Top section - Name, title, socials */}
      <div className="mb-8 lg:mb-0">
        <h1 className="seth-heading font-bold mb-2">{member.name}</h1>
        <p className="seth-heading-4 opacity-80 mb-4">
          {member.executivePosition || member.role}
        </p>

        <SocialLinks socialLinks={member.socialLinks} textColor={textColor} />
      </div>

      {/* Bio section */}
      <div>
        <p className="text-base sm:text-lg my-8 max-w-lg">
          {member.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberInfo;
