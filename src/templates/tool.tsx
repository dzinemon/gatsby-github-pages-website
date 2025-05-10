import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaTools, FaGithub } from "react-icons/fa";

// Import shared components
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";
import BackLink from "../components/layout/BackLink";

interface ToolPageContext {
  id: string;
}

interface ToolPageData {
  markdownRemark: {
    frontmatter: {
      title: string;
      description: string;
      tags: string[];
      github: string;
      date: string;
    };
    html: string;
  };
}

const ToolTemplate: React.FC<PageProps<ToolPageData, ToolPageContext>> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/tools", label: "Tools", icon: FaTools },
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
        {frontmatter.github && (
          <a 
            href={frontmatter.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-800 text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-gray-900"
          >
            <FaGithub className="mr-2" />
            GitHub Repository
          </a>
        )}
      </PageHeader>

      <article 
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <BackLink to="/tools" label="Back to all tools" />
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
        github
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export const Head: HeadFC<ToolPageData> = ({ data }) => <title>{data.markdownRemark.frontmatter.title}</title>;

export default ToolTemplate;