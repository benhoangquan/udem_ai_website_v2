import { client } from './sanityClient.js';
import fs from 'fs';
import path from 'path';

interface Resource {
  _type: string;
  title: string;
  slug: string;
  description: string;
  content: any[];
  difficulty: string;
  publishedAt: string;
  category: string;
}

interface Category {
  _type: string;
  title: string;
  description?: string;
}

const createTransaction = async (resources: Resource[]) => {
  const transaction = client.transaction();

  // First, get all unique categories from resources
  const uniqueCategories = [...new Set(resources.map(r => r.category))];
  
  // Create category documents and store their IDs
  const categoryMap = new Map<string, string>();
  
  for (const categoryTitle of uniqueCategories) {
    const category: Category = {
      _type: 'category',
      title: categoryTitle,
      description: `Category for ${categoryTitle} resources`
    };
    
    const categoryId = `category-${categoryTitle.toLowerCase().replace(/\s+/g, '-')}`;
    transaction.create({
      ...category,
      _id: categoryId
    });
    categoryMap.set(categoryTitle, categoryId);
  }

  // Create resources with category references
  for (const resource of resources) {
    const categoryId = categoryMap.get(resource.category);
    
    if (!categoryId) {
      console.error(`Category reference not found for: ${resource.category}`);
      continue;
    }

    const resourceDoc = {
      _type: 'resource',
      title: resource.title,
      slug: {
        _type: 'slug',
        current: resource.slug
      },
      description: resource.description,
      content: resource.content,
      difficulty: resource.difficulty,
      publishedAt: resource.publishedAt,
      category: {
        _type: 'reference',
        _ref: categoryId
      }
    };

    transaction.create(resourceDoc);
  }

  return transaction;
};

const importResources = async (jsonFilePath: string) => {
  try {
    console.log(`Reading resources from ${jsonFilePath}...`);
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    const resources = jsonData.resources;

    console.log('Creating transaction...');
    const transaction = await createTransaction(resources);

    console.log('Committing transaction...');
    await transaction.commit();
    console.log('Resources imported successfully!');
  } catch (error) {
    console.error('Error importing resources:', error);
    process.exit(1);
  }
};

// Get the JSON file path from command line arguments
const jsonFilePath = process.argv[2];
if (!jsonFilePath) {
  console.error('Please provide the path to the JSON file as an argument');
  process.exit(1);
}

// Run the import
importResources(jsonFilePath); 