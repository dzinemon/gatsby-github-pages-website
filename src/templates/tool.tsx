import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

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

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <Link to="/tools" className="text-blue-600 hover:underline">Tools</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">{frontmatter.title}</span>
          </li>
        </ol>
      </nav>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{frontmatter.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags.map((tag) => (
            <Link 
              key={tag} 
              to={`/tags/${tag}`}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
        <a 
          href={frontmatter.github} 
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View on GitHub
        </a>
      </header>

      <article 
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-8">
        <Link to="/tools" className="text-blue-600 hover:underline">
          &larr; Back to all tools
        </Link>
      </footer>
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