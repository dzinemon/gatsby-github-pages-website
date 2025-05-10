import React, { ReactNode } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import TagList from "./TagList";

interface PageHeaderProps {
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
  children?: ReactNode;
  icon?: React.ReactElement;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  tags = [], 
  date,
  children,
  icon
}) => {
  return (
    <header className="p-4 bg-slate-50 rounded-xl mb-8 space-y-4">
      <h1 className="text-3xl lg:text-5xl font-bold mb-2 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h1>
      {description && <p className="text-lg text-gray-600">{description}</p>}
      {(tags.length > 0 || date) && (
        <div className="flex flex-wrap gap-4">
          {date && (
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="mr-2" />
              <span>{date}</span>
            </div>
          )}
          {tags.length > 0 && <TagList tags={tags} />}
        </div>
      )}
      
      {children && (
        <div className="flex gap-4 mt-4">
          {children}
        </div>
      )}
    </header>
  );
};

export default PageHeader;