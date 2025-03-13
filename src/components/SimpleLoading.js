import React from "react";

const SimpleLoading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-lg text-gray-700 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default SimpleLoading;
