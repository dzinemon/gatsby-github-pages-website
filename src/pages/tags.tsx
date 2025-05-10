import React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { FaTags, FaHome } from "react-icons/fa";

// Import shared components
import Breadcrumb from "../components/layout/Breadcrumb";
import PageHeader from "../components/layout/PageHeader";

interface TagsPageData {
  allMarkdownRemark: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

const TagsPage: React.FC<PageProps<TagsPageData>> = ({ data }) => {
  const tags = data.allMarkdownRemark.group;

  // Define breadcrumb items
  const breadcrumbItems = [
    { to: "/", label: "Home", icon: FaHome },
    { label: "Tags", icon: FaTags }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title="Content Tags"
        description="Browse all content by topic tags"
        icon={<FaTags />}
      >
        {/* Tag cloud appears in the PageHeader content area */}
        <div className="flex flex-wrap gap-4 mt-4">
          {tags.map(tag => (
            <Link 
              key={tag.fieldValue}
              to={`/tags/${tag.fieldValue}/`}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full flex items-center transition-colors"
            >
              <span>{tag.fieldValue}</span>
              <span className="ml-2 text-xs bg-blue-200 px-2 py-1 rounded-full">
                {tag.totalCount}
              </span>
            </Link>
          ))}
        </div>
      </PageHeader>
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