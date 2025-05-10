import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaBook, FaHome } from "react-icons/fa";

// Import shared components and utilities
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import SearchAndFilterLayout from "../components/layout/SearchAndFilterLayout";
import LessonCard from "../components/cards/LessonCard";
import NoResults from "../components/layout/NoResults";
import { extractUniqueTags, filterContentItems } from "../utils/helpers";

interface LessonsPageData {
  allMarkdownRemark: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        youtubeLink: string;
        slideLink?: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
}

const LessonsPage: React.FC<PageProps<LessonsPageData>> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const lessons = allMarkdownRemark.nodes;
  
  // Get unique tags from all lessons using our shared utility
  const allTags = useMemo(() => extractUniqueTags(lessons), [lessons]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter lessons based on search term and selected tags using our shared utility
  const filteredLessons = useMemo(() => 
    filterContentItems(lessons, searchTerm, selectedTags), 
    [lessons, searchTerm, selectedTags]
  );

  // Function to clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { label: "Lessons", icon: FaBook }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title="AI in Education Lessons"
        description="Practical lessons and guides for integrating AI in your classroom"
        icon={<FaBook />}
      />
      
      <SearchAndFilterLayout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
      >
        {/* Display filtered lessons */}
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.frontmatter.title}
                description={lesson.frontmatter.description}
                date={lesson.frontmatter.date}
                slug={lesson.fields.slug}
                tags={lesson.frontmatter.tags}
                youtubeLink={lesson.frontmatter.youtubeLink}
                slideLink={lesson.frontmatter.slideLink}
              />
            ))}
          </div>
        ) : (
          <NoResults 
            clearFilters={clearFilters} 
            message="No lessons match your current filters."
          />
        )}
      </SearchAndFilterLayout>
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
          slideLink
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>AI-Enhanced Lessons</title>;

export default LessonsPage;