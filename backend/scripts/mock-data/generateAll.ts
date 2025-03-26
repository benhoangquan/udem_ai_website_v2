import { generateMembers } from './generateMembers.js';
import { generateCategories } from './generateCategories.js';
import { generateBlogs } from './generateBlogs.js';
import { generateActivities } from './generateActivities.js';
import { generateResources } from './generateResources.js';

export const generateMockData = () => {
  // Generate all documents without reference handling
  const members = generateMembers(15);
  const categories = generateCategories(8);
  const blogs = generateBlogs(10);
  const activities = generateActivities(8);
  const resources = generateResources(12);

  return {
    members,
    categories,
    blogs,
    activities,
    resources,
  };
};

// Always output the data
console.log(JSON.stringify(generateMockData(), null, 2)); 