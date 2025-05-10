import React from "react";
import { Link } from "gatsby";
import { FaCalendarAlt, FaYoutube, FaFilePowerpoint, FaTag } from "react-icons/fa";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  youtubeLink?: string;
  slideLink?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  date,
  slug,
  tags,
  youtubeLink,
  slideLink
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
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaCalendarAlt className="mr-1" />
          <span>{date}</span>
        </div>
        
        {/* External links */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {youtubeLink && (
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" 
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center">
              <FaYoutube className="mr-1" />
              Watch Video
            </a>
          )}
          {slideLink && (
            <a href={slideLink} target="_blank" rel="noopener noreferrer" 
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center">
              <FaFilePowerpoint className="mr-1" />
              View Slides
            </a>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Link 
              key={tag} 
              to={`/tags/${tag}`}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
            >
              <FaTag className="mr-1" size={10} />
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonCard;