import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaTools, FaTag, FaGithub, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

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
            <Link to="/" className="text-blue-600 hover:underline flex items-center">
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <Link to="/tools" className="text-blue-600 hover:underline flex items-center">
              <FaTools className="mr-1" />
              <span>Tools</span>
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">{frontmatter.title}</span>
          </li>
        </ol>
      </nav>
      
      <header className="p-4 bg-slate-50 rounded-xl mb-8 space-y-4">
        <h1 className="text-3xl lg:text-5xl font-bold">{frontmatter.title}</h1>
        <p className="text-lg text-gray-600">{frontmatter.description}</p>
        
        <div className="flex flex-wrap gap-4">
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
          
          {frontmatter.link && (
            <a 
              href={frontmatter.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center text-sm hover:bg-blue-700"
            >
              <FaExternalLinkAlt className="mr-2" />
              Visit Tool
            </a>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Link 
              key={tag} 
              to={`/tags/${tag}`}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              <FaTag className="mr-1" size={12} />
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <article 
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-8">
        <Link to="/tools" className="text-blue-600 hover:underline flex items-center w-fit">
          <FaArrowLeft className="mr-2" />
          <span>Back to all tools</span>
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