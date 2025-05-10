import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaVideo, FaHome } from "react-icons/fa";

// Import shared components and utilities
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import SearchAndFilterLayout from "../components/layout/SearchAndFilterLayout";
import VideoCard from "../components/cards/VideoCard";
import NoResults from "../components/layout/NoResults";
import { extractUniqueTags, filterContentItems } from "../utils/helpers";

interface VideosPageData {
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

const VideosPage: React.FC<PageProps<VideosPageData>> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const videos = allMarkdownRemark.nodes;
  
  // Get unique tags from all videos using our shared utility
  const allTags = useMemo(() => extractUniqueTags(videos), [videos]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter videos based on search term and selected tags using our shared utility
  const filteredVideos = useMemo(() => 
    filterContentItems(videos, searchTerm, selectedTags),
    [videos, searchTerm, selectedTags]
  );

  // Function to clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { label: "Videos", icon: FaVideo }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title="AI in Education Videos"
        description="Watch tutorials and demonstrations of AI tools in education"
        icon={<FaVideo />}
      />
      
      <SearchAndFilterLayout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
      >
        {/* Display filtered videos */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.frontmatter.title}
                description={video.frontmatter.description}
                date={video.frontmatter.date}
                slug={video.fields.slug}
                tags={video.frontmatter.tags}
                youtubeLink={video.frontmatter.youtubeLink}
              />
            ))}
          </div>
        ) : (
          <NoResults 
            clearFilters={clearFilters} 
            message="No videos match your current filters."
          />
        )}
      </SearchAndFilterLayout>
    </main>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/videos/" } }
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

export const Head: HeadFC = () => <title>Educational Videos</title>;

export default VideosPage;