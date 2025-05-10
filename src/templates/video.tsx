import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

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

// Function to extract YouTube video ID from YouTube URL
const getYoutubeEmbedId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const VideoTemplate: React.FC<PageProps<VideoPageData, VideoPageContext>> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const youtubeEmbedId = getYoutubeEmbedId(frontmatter.youtubeLink);

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <Link to="/videos" className="text-blue-600 hover:underline">Videos</Link>
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
      </header>

      <div className="mb-8">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-[450px]"
            src={`https://www.youtube.com/embed/${youtubeEmbedId}`}
            title={frontmatter.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <article 
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-8">
        <Link to="/videos" className="text-blue-600 hover:underline">
          &larr; Back to all videos
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
        youtubeLink
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export const Head: HeadFC<VideoPageData> = ({ data }) => <title>{data.markdownRemark.frontmatter.title}</title>;

export default VideoTemplate;