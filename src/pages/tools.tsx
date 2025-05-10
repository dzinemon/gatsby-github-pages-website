import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaTools, FaHome } from "react-icons/fa";

// Import shared components and utilities
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import SearchAndFilterLayout from "../components/layout/SearchAndFilterLayout";
import ToolCard from "../components/cards/ToolCard";
import NoResults from "../components/layout/NoResults";
import { extractUniqueTags, filterContentItems } from "../utils/helpers";

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
  
  // Get unique tags from all tools using our shared utility
  const allTags = useMemo(() => extractUniqueTags(tools), [tools]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter tools based on search term and selected tags using our shared utility
  const filteredTools = useMemo(() => 
    filterContentItems(tools, searchTerm, selectedTags),
    [tools, searchTerm, selectedTags]
  );

  // Function to clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { label: "Tools", icon: FaTools }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title="AI Educational Tools"
        description="Browse our collection of AI tools for educators"
        icon={<FaTools />}
      />
      
      <SearchAndFilterLayout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
      >
        {/* Display filtered tools */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                id={tool.id}
                title={tool.frontmatter.title}
                description={tool.frontmatter.description}
                date={tool.frontmatter.date}
                slug={tool.fields.slug}
                tags={tool.frontmatter.tags}
                github={tool.frontmatter.github}
              />
            ))}
          </div>
        ) : (
          <NoResults 
            clearFilters={clearFilters} 
            message="No tools match your current filters."
          />
        )}
      </SearchAndFilterLayout>
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