import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaVideo, FaYoutube } from "react-icons/fa";

// Import shared components
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import BackLink from "../components/layout/BackLink";
import YouTubeEmbed from "../components/media/YouTubeEmbed";

interface VideoPageContext {
  id: string;
}

interface VideoPageData {
  markdownRemark: {
    frontmatter: {
      title: string;
      description: string;
      tags: string[];
      youtubeLink: string;
      date: string;
    };
    html: string;
  };
}

const VideoTemplate: React.FC<PageProps<VideoPageData, VideoPageContext>> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/videos", label: "Videos", icon: FaVideo },
    { label: frontmatter.title }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title={frontmatter.title}
        description={frontmatter.description}
        tags={frontmatter.tags}
        date={frontmatter.date}
      >
        <a href={frontmatter.youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-red-700">
          <FaYoutube className="mr-2" />
          Watch on YouTube
        </a>
      </PageHeader>

      <YouTubeEmbed 
        youtubeLink={frontmatter.youtubeLink}
        title={frontmatter.title}
      />

      <article 
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <BackLink to="/videos" label="Back to all videos" />
    </main>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        tags
        youtubeLink
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export const Head: HeadFC<VideoPageData> = ({ data }) => <title>{data.markdownRemark.frontmatter.title}</title>;

export default VideoTemplate;