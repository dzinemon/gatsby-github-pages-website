import React from "react";
import { graphql, Link } from "gatsby";
import type { PageProps, HeadFC } from "gatsby";
import { FaTags, FaHome, FaChevronRight } from "react-icons/fa";

// Import shared components
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import LessonCard from "../components/cards/LessonCard";
import ToolCard from "../components/cards/ToolCard";
import VideoCard from "../components/cards/VideoCard";
import ContentSection from "../components/layout/ContentSection";

interface TagPageContext {
  tag: string;
}

interface TagPageData {
  tools: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        github?: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
  lessons: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        youtubeLink?: string;
        slideLink?: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
  videos: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
        youtubeLink?: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    }[];
  };
}

const TagTemplate: React.FC<PageProps<TagPageData, TagPageContext>> = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { tools, lessons, videos } = data;

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/tags", label: "Tags", icon: FaTags },
    { label: tag }
  ];

  // Get content counts for each type
  const lessonCount = lessons.nodes.length;
  const toolCount = tools.nodes.length;
  const videoCount = videos.nodes.length;
  const totalCount = lessonCount + toolCount + videoCount;

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title={`${tag} Content`}
        description={`Found ${totalCount} items tagged with "${tag}"`}
        icon={<FaTags />}
      >
        <Link 
          to="/tags"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaChevronRight className="mr-1 text-xs" />
          View all tags
        </Link>
      </PageHeader>

      {/* Display content sections by type */}
      {lessonCount > 0 && (
        <ContentSection title="Lessons" count={lessonCount}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.nodes.map((lesson) => (
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
        </ContentSection>
      )}

      {toolCount > 0 && (
        <ContentSection title="Tools" count={toolCount}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.nodes.map((tool) => (
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
        </ContentSection>
      )}

      {videoCount > 0 && (
        <ContentSection title="Videos" count={videoCount}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.nodes.map((video) => (
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
        </ContentSection>
      )}
    </main>
  );
};

export const query = graphql`
  query($tag: String!) {
    tools: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/tools/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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
    lessons: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/lessons/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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
    videos: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/videos/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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

export const Head: HeadFC<TagPageData, TagPageContext> = ({ pageContext }) => <title>Content Tagged: {pageContext.tag}</title>;

export default TagTemplate;