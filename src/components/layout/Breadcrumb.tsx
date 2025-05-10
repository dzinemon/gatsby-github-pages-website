import React from "react";
import { Link } from "gatsby";
import { IconType } from "react-icons";

export interface BreadcrumbItem {
  to?: string;
  label: string;
  icon?: IconType;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            {item.to ? (
              <Link to={item.to} className="text-blue-600 hover:underline flex items-center">
                {item.icon && <item.icon className="mr-1" />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-500 flex items-center">
                {item.icon && <item.icon className="mr-1" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;