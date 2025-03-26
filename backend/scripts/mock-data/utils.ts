import { faker } from '@faker-js/faker';

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const generateBlockContent = () => {
  return [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: faker.lorem.paragraph(),
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ];
};

export const generateLocation = () => {
  return {
    _type: 'location',
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  };
};

export const generateSchedule = () => {
  const startDate = faker.date.future();
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + faker.number.int({ min: 1, max: 8 }));

  return {
    _type: 'schedule',
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    timezone: faker.location.timeZone(),
  };
}; 