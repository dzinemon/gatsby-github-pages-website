import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

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
  const { tools, videos } = data;

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <Link to="/tags" className="text-blue-600 hover:underline">Tags</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">{tag}</span>
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold mb-8">Content tagged with: <span className="text-blue-600">{tag}</span></h1>
      
      {/* Tools Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tools</h2>
        {tools.nodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.nodes.map((tool) => (
              <div key={tool.id} className="border rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={tool.fields.slug} className="text-blue-600 hover:underline">
                      {tool.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.frontmatter.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tool.frontmatter.tags.map((tag) => (
                      <Link 
                        key={tag} 
                        to={`/tags/${tag}`}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tools found with this tag.</p>
        )}
      </section>
      
      {/* Videos Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        {videos.nodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.nodes.map((video) => (
              <div key={video.id} className="border rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={video.fields.slug} className="text-blue-600 hover:underline">
                      {video.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{video.frontmatter.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {video.frontmatter.tags.map((tag) => (
                      <Link 
                        key={tag} 
                        to={`/tags/${tag}`}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos found with this tag.</p>
        )}
      </section>
      
      <footer className="mt-8">
        <Link to="/tags" className="text-blue-600 hover:underline">
          &larr; All Tags
        </Link>
      </footer>
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
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export const Head: HeadFC<{}, TagPageContext> = ({ pageContext }) => <title>Content Tagged: {pageContext.tag}</title>;

export default TagTemplate;