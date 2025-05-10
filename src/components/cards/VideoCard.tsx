import React from "react";
import { Link } from "gatsby";
import { FaCalendarAlt, FaYoutube, FaTag } from "react-icons/fa";
import { getYoutubeEmbedId } from "../../utils/helpers";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  youtubeLink?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  description,
  date,
  slug,
  tags,
  youtubeLink = ""
}) => {
  const youtubeEmbedId = youtubeLink ? getYoutubeEmbedId(youtubeLink) : null;

  return (
    <div key={id} className="border rounded-lg overflow-hidden shadow-md">
      {youtubeEmbedId && (
        <div className="relative pt-[56.25%] bg-gray-100">
          <img
            src={`https://img.youtube.com/vi/${youtubeEmbedId}/mqdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1">
            <FaYoutube />
          </div>
        </div>
      )}
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
        
        {youtubeLink && (
          <div className="flex gap-2 mb-4">
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer" 
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center">
              <FaYoutube className="mr-1" />
              Watch on YouTube
            </a>
          </div>
        )}
        
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

export default VideoCard;