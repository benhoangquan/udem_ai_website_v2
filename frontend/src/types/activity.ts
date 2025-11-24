export interface Location {
  type: "in_person" | "online" | "hybrid";
  venue?: string;
  address?: string;
  meetingLink?: string;
}

// Simplified version for display purposes (used for markdown-based activities)
export interface ActivityDisplay {
  title: string;
  type: string;
  startDateTime: string;
  mainImage?: string; // URL for the image
  location?: Location;
  recurrence?: "weekly" | "monthly";
}
