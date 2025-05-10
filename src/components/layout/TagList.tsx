import React from "react";
import { Link } from "gatsby";
import { FaTag } from "react-icons/fa";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
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
  );
};

export default TagList;