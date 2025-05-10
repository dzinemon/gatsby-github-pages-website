import React, { ReactNode } from "react";
import { FaTag } from "react-icons/fa";

interface SearchAndFilterLayoutProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  allTags: string[];
  children: ReactNode;
}

const SearchAndFilterLayout: React.FC<SearchAndFilterLayoutProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  allTags,
  children
}) => {
  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    );
  };

  return (
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
      
      {/* Search and content - Right column */}
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
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Content passed as children */}
        {children}
      </div>
    </div>
  );
};

export default SearchAndFilterLayout;