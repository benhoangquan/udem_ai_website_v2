import { faker } from '@faker-js/faker';
import { generateSlug } from './utils';

export const generateMembers = (count: number = 10) => {
  const members = [];
  const roles = ['member', 'executive', 'alumni'];
  const executivePositions = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Technical Lead',
    'Events Coordinator',
  ];

  for (let i = 0; i < count; i++) {
    const role = faker.helpers.arrayElement(roles);
    const member = {
      _type: 'member',
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role,
      executivePosition: role === 'executive' ? faker.helpers.arrayElement(executivePositions) : undefined,
      bio: faker.lorem.paragraph(),
      linkedin: faker.internet.url(),
    };

    members.push(member);
  }

  return members;
}; 