import { faker } from '@faker-js/faker';

export const generateCategories = (count: number = 5) => {
  const categories = [];
  const categoryTypes = [
    'Programming',
    'Machine Learning',
    'Web Development',
    'Data Science',
    'AI',
    'Robotics',
    'Computer Vision',
    'Natural Language Processing',
  ];

  for (let i = 0; i < count; i++) {
    const title = faker.helpers.arrayElement(categoryTypes);
    const category = {
      _type: 'category',
      title,
      description: faker.lorem.sentence(),
    };

    categories.push(category);
  }

  return categories;
}; 