import React from 'react';

const ShimmerProfile = () => {
  return (
    <div className="animate-pulse max-w-4xl h:screen mx-auto p-6 space-y-4">
      {/* Top Row: Avatar, Name, Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar Circle */}
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          {/* Name and Followers */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        {/* Follow Button */}
        <div className="w-20 h-8 rounded-full bg-gray-300"></div>
      </div>

      {/* Join Date */}
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded w-32"></div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        <div className="h-4 bg-gray-300 rounded w-9/12"></div>
      </div>
    </div>
  );
};

export default ShimmerProfile;
