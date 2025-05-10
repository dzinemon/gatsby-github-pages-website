import React from "react";
import { FaYoutube } from "react-icons/fa";

interface YouTubeEmbedProps {
  youtubeLink: string;
  title: string;
}

// Function to extract YouTube video ID from YouTube URL
export const getYoutubeEmbedId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeLink, title }) => {
  const youtubeEmbedId = getYoutubeEmbedId(youtubeLink);
  
  if (!youtubeEmbedId) return null;
  
  return (
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
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;