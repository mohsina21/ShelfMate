import React from 'react';
import DecryptedText from './DecryptedText';

const About = () => {
  return (
    <div className="bg-[#020618] text-white min-h-screen flex flex-col items-center justify-start p-10 -mt-10 text-center">
      {/* Centered About Heading at the Top */}
      <h1 className="text-7xl font-extrabold mb-16 w-full">About ShelfMate</h1>

      {/* Glassmorphism Box */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-4xl w-full text-2xl">
        <DecryptedText
          text={`ShelfMate is your personal AI-powered book companion, designed to help you discover books that match your unique taste. Whether you’re looking for recommendations based on your past reads or exploring new genres, ShelfMate curates personalized suggestions to make every reading experience enjoyable. With intelligent recommendations and a seamless interface, ShelfMate ensures you spend less time searching and more time reading. Let us help you build the perfect bookshelf—one great book at a time.`}
          speed={80}
          maxIterations={40}
          characters="ABCD1234!?"
          className="text-3xl font-medium leading-relaxed"
          parentClassName="w-full flex justify-center"
          encryptedClassName="encrypted"
        />
      </div>
    </div>
  );
};

export default About;
