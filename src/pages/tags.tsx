import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaTag, FaHome } from "react-icons/fa";

interface TagsPageData {
  allMarkdownRemark: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

const TagsPage: React.FC<PageProps<TagsPageData>> = ({ data }) => {
  const { allMarkdownRemark } = data;
  const { group } = allMarkdownRemark;

  // Sort tags by count in descending order
  const sortedTags = [...group].sort((a, b) => b.totalCount - a.totalCount);

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
            <span className="text-gray-500 flex items-center">
              <FaTag className="mr-1" />
              <span>Tags</span>
            </span>
          </li>
        </ol>
      </nav>
      
      <header className="p-4 bg-slate-50 rounded-xl mb-8 space-y-4">
        <h1 className="text-3xl lg:text-5xl font-bold flex items-center">
          Content Tags
        </h1>
        <p className="text-lg text-gray-600">
          Browse content by subject area and topic
        </p>
      </header>
      
      <div className="flex flex-wrap gap-4">
        {sortedTags.map(tag => (
          <Link
            key={tag.fieldValue}
            to={`/tags/${tag.fieldValue}`}
            className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg flex items-center hover:bg-blue-200 transition-colors"
          >
            <FaTag className="mr-2" />
            <span className="mr-2 font-medium">{tag.fieldValue}</span>
            <span className="bg-blue-800 text-white rounded w-5 h-5 text-xs content-center text-center">
              {tag.totalCount}
            </span>
          </Link>
        ))}
      </div>

    </main>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Browse by Tags</title>;

export default TagsPage;