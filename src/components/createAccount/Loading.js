import React from "react";
import { MapPin } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <MapPin className="w-12 h-12 text-blue-500 animate-bounce" />
      <p className="text-lg font-semibold">Tracking your location...</p>
    </div>
  );
};

export default Loading;
