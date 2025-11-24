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
 */
export function getMarkdownFiles(directory: string): string[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(fullPath, file));
}

/**
 * Read all markdown files from a directory and parse them
 */
export function getAllMarkdownFiles<T>(directory: string): Array<{ data: T; content: string; filePath: string }> {
  const files = getMarkdownFiles(directory);
  
  return files.map(filePath => {
    const parsed = parseMarkdownFile(filePath);
    return {
      data: parsed.data as T,
      content: parsed.content,
      filePath,
    };
  });
}

