import React from "react";

const TermsOfService = () => (
  <div className="bg-black text-white px-4 py-8 mt-4 flex flex-col items-center">
    <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
    <div className="max-w-2xl text-gray-300 text-sm space-y-4">
      <p>
        By using Novacode Anime, you agree to the following terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Use of Content</h2>
      <p>
        All content is for personal, non-commercial use only. Do not copy, redistribute, or use content for commercial purposes without permission.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Disclaimer</h2>
      <p>
        We strive to provide accurate information, but we do not guarantee completeness or accuracy. Use the site at your own risk.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
      <p>
        For questions about these terms, contact us at <a href="kadeksananda@gmail.com" className="text-red-400 hover:underline">kadeksananda@gmail.com</a>.
      </p>
    </div>
  </div>
);

export default TermsOfService;
