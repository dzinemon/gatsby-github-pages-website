import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaHome, FaBook, FaTag, FaCalendarAlt, FaArrowLeft, FaYoutube, FaFilePowerpoint } from "react-icons/fa";

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

// Function to extract YouTube video ID
const getYoutubeEmbedId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const LessonTemplate: React.FC<PageProps<LessonPageData, LessonPageContext>> = ({ data }) => {
  const { markdownRemark, relatedTools } = data;
  const { frontmatter, html } = markdownRemark;
  const youtubeEmbedId = getYoutubeEmbedId(frontmatter.youtubeLink || '');

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
            <Link to="/lessons" className="text-blue-600 hover:underline flex items-center">
              <FaBook className="mr-1" />
              <span>Lessons</span>
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
        
        <div className="flex gap-4 mt-4">
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
        </div>
      </header>

      {/* YouTube Video */}
      {youtubeEmbedId && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Lecture Video</h2>
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

      <footer className="mt-8">
        <Link to="/lessons" className="text-blue-600 hover:underline flex items-center w-fit">
          <FaArrowLeft className="mr-2" />
          <span>Back to all lessons</span>
        </Link>
      </footer>
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