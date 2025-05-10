import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

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
  const tags = allMarkdownRemark.group.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <span className="mx-1">/</span>
            <span className="text-gray-500">Tags</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-3xl font-bold mb-8">Browse Content by Tags</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map(tag => (
          <Link 
            key={tag.fieldValue} 
            to={`/tags/${tag.fieldValue}`}
            className="flex flex-col items-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="text-xl font-medium text-blue-600 mb-2">{tag.fieldValue}</span>
            <span className="text-gray-600">{tag.totalCount} item{tag.totalCount !== 1 ? 's' : ''}</span>
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