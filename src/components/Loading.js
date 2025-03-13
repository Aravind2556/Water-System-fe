import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-blue-50">
      
      {/* Pipe Container */}
      <div className="w-64 h-8 bg-gray-300 rounded-full overflow-hidden shadow-inner relative">
        
        {/* Flowing Water Animation */}
        <div className="absolute w-full h-full bg-blue-500 animate-water-flow" />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-lg text-blue-600 font-semibold animate-pulse">
      Data Not Available!
      </p>
    </div>
  );
};

export default Loading;
