import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl border-2 border-white/40 shadow-lg rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">About MangaPanelX</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold text-pink-600">MangaPanelX</span> — your ultimate
          destination to explore, discover, and enjoy your favorite manga series. We aim to bring
          together the latest and most popular titles with clean visuals, detailed descriptions, and
          smooth navigation.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Whether you're a casual reader or a die-hard fan, MangaPanelX provides a seamless experience
          to browse and dive deep into the world of manga. With powerful search, organized categories,
          and regular updates, finding your next obsession has never been easier!
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Join us and start your journey into worlds of adventure, emotion, and imagination — only on{" "}
          <span className="font-semibold text-pink-600">MangaPanelX</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
