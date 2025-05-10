import React, { useState, useMemo } from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

interface LessonsPageData {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        youtubeLink: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
}

// Function to extract YouTube video ID from YouTube URL
const getYoutubeEmbedId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const LessonsPage: React.FC<PageProps<LessonsPageData>> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const lessons = allMarkdownRemark.nodes;
  
  // Get unique tags from all lessons
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    lessons.forEach(lesson => {
      lesson.frontmatter.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [lessons]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter lessons based on search term and selected tags
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = 
        searchTerm === "" || 
        lesson.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => lesson.frontmatter.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [lessons, searchTerm, selectedTags]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">Lessons</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-3xl font-bold mb-8">AI-Enhanced Lessons</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter by tags - Left sticky column */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <div className="sticky top-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Filter by subject area
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="mt-4 w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {/* Search and lessons - Right column */}
        <div className="md:w-3/4">
          {/* Search input */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by title or description
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lessons..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Display filtered lessons */}
          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => {
                const youtubeEmbedId = getYoutubeEmbedId(lesson.frontmatter.youtubeLink);
                return (
                  <div key={lesson.id} className="border rounded-lg overflow-hidden shadow-md">
                    {youtubeEmbedId && (
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          className="w-full h-48"
                          src={`https://www.youtube.com/embed/${youtubeEmbedId}`}
                          title={lesson.frontmatter.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                        ></iframe>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        <Link to={lesson.fields.slug} className="text-blue-600 hover:underline">
                          {lesson.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{lesson.frontmatter.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {lesson.frontmatter.tags.map((tag) => (
                          <Link 
                            key={tag} 
                            to={`/tags/${tag}`}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No lessons match your current filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTags([]);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/lessons/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
          tags
          youtubeLink
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>AI-Enhanced Lessons</title>;

export default LessonsPage;