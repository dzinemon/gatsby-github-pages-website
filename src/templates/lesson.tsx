import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaBook, FaYoutube, FaFilePowerpoint } from "react-icons/fa";

// Import shared components
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import BackLink from "../components/layout/BackLink";
import YouTubeEmbed from "../components/media/YouTubeEmbed";

interface LessonPageContext {
  id: string;
  relatedTools: string[];
}

interface LessonPageData {
  markdownRemark: {
    frontmatter: {
      title: string;
      description: string;
      tags: string[];
      youtubeLink: string;
      slideLink?: string;
      date: string;
    };
    html: string;
  };
  relatedTools: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        github: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
}

const LessonTemplate: React.FC<PageProps<LessonPageData, LessonPageContext>> = ({ data }) => {
  const { markdownRemark, relatedTools } = data;
  const { frontmatter, html } = markdownRemark;

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/lessons", label: "Lessons", icon: FaBook },
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
        {frontmatter.youtubeLink && (
          <a href={frontmatter.youtubeLink} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-red-700">
            <FaYoutube className="mr-2" />
            Watch Video
          </a>
        )}
        {frontmatter.slideLink && (
          <a href={frontmatter.slideLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-blue-700">
            <FaFilePowerpoint className="mr-2" />
            View Slides
          </a>
        )}
      </PageHeader>

      {/* YouTube Video */}
      {frontmatter.youtubeLink && (
        <YouTubeEmbed 
          youtubeLink={frontmatter.youtubeLink}
          title={frontmatter.title}
        />
      )}

      {/* Slides Link */}
      {frontmatter.slideLink && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Slides</h2>
          <a 
            href={frontmatter.slideLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View or Download Slides
          </a>
        </div>
      )}

      {/* Lesson Content (including any quiz questions) */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Lesson Content & Quiz</h2>
        <article 
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <BackLink to="/lessons" label="Back to all lessons" />
    </main>
  );
};

export const query = graphql`
  query($id: String!, $relatedTools: [String!]) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        tags
        youtubeLink
        slideLink
        date(formatString: "MMMM DD, YYYY")
      }
    }
    relatedTools: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/tools/" }
        frontmatter: { tags: { in: $relatedTools } }
      }
      limit: 6
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
        }
      }
    }
  }
`;

export const Head: HeadFC<LessonPageData> = ({ data }) => <title>{data.markdownRemark.frontmatter.title} | Lesson</title>;

export default LessonTemplate;