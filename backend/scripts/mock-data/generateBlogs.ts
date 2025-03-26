import { faker } from '@faker-js/faker';
import { generateBlockContent } from './utils.js';

export const generateBlogs = (count: number = 5) => {
  const blogs = [];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence();
    const blog = {
      _type: 'blog',
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      },
      // author: {
      //   _type: 'reference',
      //   _ref: faker.string.uuid(),
      // },
      // categories: faker.helpers.arrayElements(
      //   Array.from({ length: 3 }, () => ({
      //     _type: 'reference',
      //     _ref: faker.string.uuid(),
      //   })),
      //   { min: 1, max: 3 }
      // ),
      publishedAt: faker.date.past().toISOString(),
      body: generateBlockContent(),
    };

    blogs.push(blog);
  }

  return blogs;
}; 