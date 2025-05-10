import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import ContentCard from "./ContentCard";

interface ContentItem {
  id: string;
  frontmatter: {
    title: string;
    description: string;
    tags: string[];
  };
  fields: {
    slug: string;
  };
}

interface ContentSectionProps {
  title: string;
  count?: number;
  icon?: IconType;
  items?: ContentItem[];
  emptyMessage?: string;
  children?: ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  count,
  icon: Icon,
  items = [],
  emptyMessage = "No items found",
  children
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 text-blue-600" />}
          <h2 className="text-2xl font-bold">{title}</h2>
          {count !== undefined && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
      </div>
      
      {children ? (
        children
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.frontmatter.title}
              description={item.frontmatter.description}
              tags={item.frontmatter.tags}
              slug={item.fields.slug}
            />
          ))}
        </div>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
};

export default ContentSection;