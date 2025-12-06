import { BlockContent } from "@/types/activity";

export function extractTextFromBlockContent(blockContent: BlockContent): string {
    if (!blockContent || !Array.isArray(blockContent)) return '';
    
    // Try to extract text from the first block if it exists
    const firstBlock = blockContent.find(block => block._type === 'block');
    if (firstBlock && firstBlock.children) {
      return firstBlock.children
        .filter(child => child._type === 'span')
        .map(span => span.text || '')
        .join('');
    }
    
    return '';
  }