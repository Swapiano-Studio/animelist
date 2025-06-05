import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#18181b] text-gray-400 text-center py-6 mt-12 border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <span>&copy; {new Date().getFullYear()} Novacode Anime. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-red-400 transition">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-red-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
