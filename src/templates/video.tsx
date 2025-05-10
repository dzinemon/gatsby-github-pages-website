import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaVideo, FaTag, FaCalendarAlt, FaArrowLeft, FaYoutube } from "react-icons/fa";

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
            <Link to="/" className="text-blue-600 hover:underline flex items-center">
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <Link to="/videos" className="text-blue-600 hover:underline flex items-center">
              <FaVideo className="mr-1" />
              <span>Videos</span>
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">{frontmatter.title}</span>
          </li>
        </ol>
      </nav>
      
      <header className="p-4 bg-slate-50 rounded-xl mb-8 space-y-4">
        <h1 className="text--3xl lg:text-5xl font-bold mb-2">{frontmatter.title}</h1>
        <p className="text-lg text-gray-600">{frontmatter.description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <span>{frontmatter.date}</span>
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
        </div>
      </header>

      <div className="mb-8">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-br-lg flex items-center">
            <FaYoutube className="mr-1" />
            <span>YouTube</span>
          </div>
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
      </div>

      <article 
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <footer className="mt-8">
        <Link to="/videos" className="text-blue-600 hover:underline flex items-center w-fit">
          <FaArrowLeft className="mr-2" />
          <span>Back to all videos</span>
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