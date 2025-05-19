import React from 'react';

const BlogDetailsShimmer = () => {
  return (
    <div className="animate-pulse p-6 max-w-3xl mx-auto space-y-6">
      {/* Header (Title) */}
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-2/4"></div>

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-72 bg-gray-300 rounded-md"></div>

      {/* Paragraphs */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-11/12"></div>
        <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        <div className="h-4 bg-gray-300 rounded w-8/12"></div>
      </div>
    </div>
  );
};

export default BlogDetailsShimmer;
