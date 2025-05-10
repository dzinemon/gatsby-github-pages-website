/**
 * Common utility functions for use across the codebase
 */

/**
 * Extracts YouTube video ID from a YouTube URL
 * @param url YouTube URL
 * @returns Video ID or empty string if not found
 */
export const getYoutubeEmbedId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

/**
 * Extracts unique tags from a collection of items
 * @param items Collection of items with tags property
 * @returns Array of unique tags sorted alphabetically
 */
export const extractUniqueTags = <T extends { frontmatter: { tags: string[] } }>(items: T[]): string[] => {
  const tagsSet = new Set<string>();
  items.forEach(item => {
    item.frontmatter.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

/**
 * Filters items based on search term and selected tags
 * @param items Collection of items to filter
 * @param searchTerm Text to search for in title and description
 * @param selectedTags Tags to filter by
 * @returns Filtered items
 */
export const filterContentItems = <T extends { 
  frontmatter: { 
    title: string; 
    description: string; 
    tags: string[] 
  } 
}>(
  items: T[],
  searchTerm: string,
  selectedTags: string[]
): T[] => {
  return items.filter(item => {
    const matchesSearch = 
      searchTerm === "" || 
      item.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => item.frontmatter.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
};