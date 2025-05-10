import React from "react";

interface NoResultsProps {
  clearFilters: () => void;
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({
  clearFilters,
  message = "No items match your current filters."
}) => {
  return (
    <div className="text-center py-8">
      <p className="text-xl text-gray-600">{message}</p>
      <button 
        onClick={clearFilters}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default NoResults;