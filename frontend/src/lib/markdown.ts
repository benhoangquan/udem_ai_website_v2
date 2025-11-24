import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Content directory is in the frontend root
const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Read and parse a markdown file with frontmatter
 */
export function parseMarkdownFile(filePath: string): matter.GrayMatterFile<string> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents);
}

/**
 * Get all markdown files from a directory
 * @param directory - The directory name (e.g., 'activities', 'members')
 * @param locale - Optional locale (e.g., 'en', 'fr'). If not provided, uses default directory structure
 */
export function getMarkdownFiles(directory: string, locale?: string): string[] {
  let fullPath: string;
  
  if (locale) {
    // Try locale-specific directory first (e.g., content/activities/en/)
    const localePath = path.join(contentDirectory, directory, locale);
    if (fs.existsSync(localePath)) {
      fullPath = localePath;
    } else {
      // Fallback to default directory if locale-specific doesn't exist
      fullPath = path.join(contentDirectory, directory);
    }
  } else {
    fullPath = path.join(contentDirectory, directory);
  }
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(fullPath, file));
}

/**
 * Read all markdown files from a directory and parse them
 * @param directory - The directory name (e.g., 'activities', 'members')
 * @param locale - Optional locale (e.g., 'en', 'fr')
 */
export function getAllMarkdownFiles<T>(directory: string, locale?: string): Array<{ data: T; content: string; filePath: string }> {
  const files = getMarkdownFiles(directory, locale);
  
  return files.map(filePath => {
    const parsed = parseMarkdownFile(filePath);
    return {
      data: parsed.data as T,
      content: parsed.content,
      filePath,
    };
  });
}

