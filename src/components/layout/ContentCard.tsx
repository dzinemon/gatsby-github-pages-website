import React from "react";
import { Link } from "gatsby";
import TagList from "./TagList";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  tags,
  slug
}) => {
  return (
    <div key={id} className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={slug} className="text-blue-600 hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;