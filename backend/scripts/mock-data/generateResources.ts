import { faker } from '@faker-js/faker';
import { generateBlockContent } from './utils.js';

export const generateResources = (count: number = 5) => {
  const resources = [];
  const contentTypes = ['document', 'video', 'code', 'link', 'file'];
  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence();
    const resource = {
      _type: 'resource',
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      },
      description: generateBlockContent(),
      // category: {
      //   _type: 'reference',
      //   _ref: faker.string.uuid(),
      // },
      content: faker.helpers.arrayElements(
        contentTypes.map(type => ({
          _type: 'object',
          type,
          title: faker.lorem.sentence(),
          description: faker.lorem.sentence(),
          url: faker.internet.url(),
        })),
        { min: 1, max: 3 }
      ),
      difficulty: faker.helpers.arrayElement(difficultyLevels),
      publishedAt: faker.date.past().toISOString(),
      // relatedResources: faker.helpers.arrayElements(
      //   Array.from({ length: 3 }, () => ({
      //     _type: 'reference',
      //     _ref: faker.string.uuid(),
      //   })),
      //   { min: 0, max: 2 }
      // ),
    };

    resources.push(resource);
  }

  return resources;
}; 