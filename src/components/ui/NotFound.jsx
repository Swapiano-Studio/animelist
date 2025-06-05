import React from "react";

const NotFound = () => (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
    <h1 className="text-5xl font-bold mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-400 mb-6 text-center">Sorry, the page you are looking for does not exist or has been moved.</p>
    <a href="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition">Back to Home</a>
  </div>
);

export default NotFound;
