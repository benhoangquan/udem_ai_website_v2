import { faker } from '@faker-js/faker';
import { generateBlockContent, generateLocation, generateSchedule } from './utils.js';

export const generateActivities = (count: number = 5) => {
  const activities = [];
  const activityTypes = [
    'workshop',
    'hackathon',
    'study_group',
    'project_meeting',
    'social',
    'competition',
    'other',
  ];
  const statuses = ['planned', 'open', 'full', 'in_progress', 'completed', 'cancelled'];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence();
    const activity = {
      _type: 'activity',
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      },
      type: faker.helpers.arrayElement(activityTypes),
      description: generateBlockContent(),
      schedule: generateSchedule(),
      location: generateLocation(),
      status: faker.helpers.arrayElement(statuses),
    };

    activities.push(activity);
  }

  return activities;
}; 