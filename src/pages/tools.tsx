import React, { useState, useMemo } from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaTools, FaHome, FaTag, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ToolsPageData {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        github: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
}

const ToolsPage: React.FC<PageProps<ToolsPageData>> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const tools = allMarkdownRemark.nodes;
  
  // Get unique tags from all tools
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tools.forEach(tool => {
      tool.frontmatter.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [tools]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter tools based on search term and selected tags
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = 
        searchTerm === "" || 
        tool.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => tool.frontmatter.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [tools, searchTerm, selectedTags]);

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
            <Link to="/" className="text-blue-600 hover:underline flex items-center">
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500 flex items-center">
              <FaTools className="mr-1" />
              <span>Tools</span>
            </span>
          </li>
        </ol>
      </nav>
      
      <header className="p-4 bg-slate-50 rounded-xl mb-8 space-y-4">
        <h1 className="text-3xl lg:text-5xl font-bold flex items-center">
          AI Educational Tools
        </h1>
        <p className="text-lg text-gray-600">
          Browse our collection of AI tools for educators
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter by tags - Left sticky column */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <div className="sticky top-8">
            <div className="flex items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Filter by tag
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-full text-sm flex items-center ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  <FaTag className="mr-1" size={10} />
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
        
        {/* Search and tools - Right column */}
        <div className="md:w-3/4">
          {/* Search input */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search by title or description
              </label>
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Display filtered tools */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link to={tool.fields.slug} className="text-blue-600 hover:underline">
                        {tool.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{tool.frontmatter.description}</p>
                    
                    {/* External links */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {tool.frontmatter.github && (
                        <a href={tool.frontmatter.github} target="_blank" rel="noopener noreferrer" 
                          className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-900 flex items-center">
                          <FaGithub className="mr-1" />
                          GitHub
                        </a>
                      )}
                      {tool.frontmatter.link && (
                        <a href={tool.frontmatter.link} target="_blank" rel="noopener noreferrer" 
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center">
                          <FaExternalLinkAlt className="mr-1" size={10} />
                          Visit Tool
                        </a>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tool.frontmatter.tags.map((tag) => (
                        <Link 
                          key={tag} 
                          to={`/tags/${tag}`}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                        >
                          <FaTag className="mr-1" size={10} />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">No tools match your current filters.</p>
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
      filter: { fileAbsolutePath: { regex: "/content/tools/" } }
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
          github
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>AI Tools for Educators</title>;

export default ToolsPage;