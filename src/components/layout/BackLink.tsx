import React from "react";
import { Link } from "gatsby";
import { FaArrowLeft } from "react-icons/fa";

interface BackLinkProps {
  to: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, label }) => {
  return (
    <footer className="mt-8">
      <Link to={to} className="text-blue-600 hover:underline flex items-center w-fit">
        <FaArrowLeft className="mr-2" />
        <span>{label}</span>
      </Link>
    </footer>
  );
};

export default BackLink;