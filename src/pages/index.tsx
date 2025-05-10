import * as React from "react";
import { Link, graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import "../styles/global.css";

interface HomePageData {
  tools: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        description: string;
        tags: string[];
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
        youtubeLink: string;
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
      };
      fields: {
        slug: string;
      };
    }[];
  };
  tags: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

// Function to extract YouTube video ID from YouTube URL
const getYoutubeEmbedId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const IndexPage: React.FC<PageProps<HomePageData>> = ({ data }) => {
  const { tools, videos, lessons, tags } = data;
  
  // Get top tags (most used)
  const topTags = tags.group
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 8);
  
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-blue-50 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">AI Education Resources Hub</h1>
          <p className="text-lg text-gray-700 mb-8">
            A curated collection of AI tools, educational videos, and lesson plans 
            to help educators leverage artificial intelligence in the classroom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/tools" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse AI Tools
            </Link>
            <Link 
              to="/videos" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Watch Videos
            </Link>
            <Link 
              to="/lessons" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Explore Lessons
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Tools Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured AI Tools</h2>
          <Link to="/tools" className="text-blue-600 hover:underline">View all tools</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.nodes.map(tool => (
            <div key={tool.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={tool.fields.slug} className="text-blue-600 hover:underline">
                    {tool.frontmatter.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{tool.frontmatter.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.frontmatter.tags.slice(0, 3).map(tag => (
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
      </section>
      
      {/* Featured Videos Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Educational Videos</h2>
          <Link to="/videos" className="text-blue-600 hover:underline">View all videos</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.nodes.map(video => {
            const youtubeEmbedId = getYoutubeEmbedId(video.frontmatter.youtubeLink);
            return (
              <div key={video.id} className="border rounded-lg overflow-hidden shadow-md">
                {youtubeEmbedId && (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-48"
                      src={`https://www.youtube.com/embed/${youtubeEmbedId}`}
                      title={video.frontmatter.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    <Link to={video.fields.slug} className="text-blue-600 hover:underline">
                      {video.frontmatter.title}
                    </Link>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Latest Lessons Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">AI-Enhanced Lessons</h2>
          <Link to="/lessons" className="text-blue-600 hover:underline">View all lessons</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.nodes.map(lesson => (
            <div key={lesson.id} className="border rounded-lg overflow-hidden shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link to={lesson.fields.slug} className="text-blue-600 hover:underline">
                  {lesson.frontmatter.title}
                </Link>
              </h3>
              <p className="text-gray-600">{lesson.frontmatter.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Browse by Topics Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
        <div className="flex flex-wrap gap-3">
          {topTags.map(tag => (
            <Link 
              key={tag.fieldValue}
              to={`/tags/${tag.fieldValue}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full transition"
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Are You an Educator?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Submit your own AI tools, videos, or lesson plans to help other educators 
          leverage AI in their teaching practice.
        </p>
        <a 
          href="https://github.com/dzinemon/gatsby-github-pages-website/issues/new/choose" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Your Resource
        </a>
      </section>
    </main>
  );
};

export const query = graphql`
  query {
    tools: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/tools/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
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
        }
      }
    }
    videos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/videos/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 2
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
          youtubeLink
        }
      }
    }
    lessons: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/lessons/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 2
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
        }
      }
    }
    tags: allMarkdownRemark {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head: HeadFC = () => <title>AI Education Resources Hub</title>;

export default IndexPage;
