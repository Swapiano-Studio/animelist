import React from "react";

const Loading = ({ text = "Loading..." }) => (
  <div className="min-h-[200px] flex flex-col items-center justify-center w-full">
    <div className="flex gap-2 mb-4">
      <span className="w-4 h-4 rounded-full bg-red-400 animate-bounce" style={{animationDelay: '0ms'}}></span>
      <span className="w-4 h-4 rounded-full bg-red-400 animate-bounce" style={{animationDelay: '150ms'}}></span>
      <span className="w-4 h-4 rounded-full bg-red-400 animate-bounce" style={{animationDelay: '300ms'}}></span>
    </div>
    <div className="text-white text-lg font-semibold">{text}</div>
  </div>
);

export default Loading;
