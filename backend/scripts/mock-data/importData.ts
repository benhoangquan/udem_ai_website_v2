import { client } from './sanityClient.js';
import { generateMockData } from './generateAll.js';

const createTransaction = (data: any) => {
  const transaction = client.transaction();

  // Create members first
  data.members.forEach((member: any) => {
    transaction.create(member);
  });

  // Create categories
  data.categories.forEach((category: any) => {
    transaction.create(category);
  });

  // Create blogs
  data.blogs.forEach((blog: any) => {
    transaction.create(blog);
  });

  // Create activities
  data.activities.forEach((activity: any) => {
    transaction.create(activity);
  });

  // Create resources
  data.resources.forEach((resource: any) => {
    transaction.create(resource);
  });

  return transaction;
};

const importData = async () => {
  try {
    console.log('Generating mock data...');
    const mockData = generateMockData();

    console.log('Creating transaction...');
    const transaction = createTransaction(mockData);

    console.log('Committing transaction...');
    await transaction.commit();
    console.log('Mock data imported successfully!');
  } catch (error) {
    console.error('Error importing mock data:', error);
    process.exit(1);
  }
};

// Run the import if this file is executed directly
importData(); 