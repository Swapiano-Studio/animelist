import React, { useState } from "react";

const Newsletter = () => {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Novacode Anime', url: window.location.origin });
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } else {
      window.open(window.location.origin, '_blank');
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <section className="bg-[#18181c] py-12 border-t border-white/10">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Stay Connected with Novacode Anime</h2>
        <div className="text-xs text-gray-500 mb-2 text-center">(See &lt;attachments&gt; above for file contents. You may not need to search or read the file again.)</div>
        <p className="text-gray-300 text-center max-w-xl mb-2">
          Animelist is a web application that displays a complete list of anime and manga with details, characters, and search features. Users can view important information such as title, year, studio/writer, genre, score, synopsis, and main characters. There are also website sharing and contact features, with a modern, responsive appearance and easy navigation.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow"
            onClick={handleShare}
          >
            🔗 Share This Website
          </button>
          <span className="text-gray-400">or contact: <a href="kadeksananda@gmail.com" className="text-red-400 hover:underline">kadeksananda@gmail.com</a></span>
        </div>
        {shared && (
          <div className="text-green-400 font-semibold mt-2 animate-pulse">Thank you for sharing!</div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
