const ArticlesShimmer = () => {
 return (
    <div className="max-w-2xl w-full lg:w-1/2 mx-auto  p-4 ml-8 animate-pulse">
      {/* Post 1 */}
      <div className="mb-8 p-3 bg-white rounded-lg shadow-md">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
        </div>
      </div>

      {/* Post 2 */}
      <div className="mb-8 p-3 bg-white rounded-lg shadow-md">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
        </div>
      </div>


      {/* Post 3 */}
      <div className="mb-8 p-3 bg-white rounded-lg shadow-md">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
        </div>
      </div>

      {/* Add custom shimmer animation */}
      <style jsx>{`
        .shimmer-bg {
          background: #f3f4f6;
          background-image: linear-gradient(
            to right,
            #f3f4f6 0%,
            #e5e7eb 20%,
            #f3f4f6 40%,
            #f3f4f6 100%
          );
          background-repeat: no-repeat;
          background-size: 800px 104px;
          animation: shimmer 1s infinite linear;
        }

        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
      `}</style>
    </div>
  );
};

export default ArticlesShimmer;