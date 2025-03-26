import React from 'react';
import DecryptedText from './DecryptedText';

const About = () => {
  return (
    <div className="bg-[#020618] text-white min-h-screen flex flex-col items-center justify-start p-6 text-center">
      {/* Centered About Heading at the Top with More Space */}
      <h1 className="text-6xl font-extrabold mt-20 mb-12 w-full">
        About ShelfMate
      </h1>

      {/* Decrypted Description */}
      <DecryptedText
        text={`ShelfMate is your personal AI-powered book companion, designed to help you discover books that match your unique taste. Whether you’re looking for recommendations based on your past reads or exploring new genres, ShelfMate curates personalized suggestions to make every reading experience enjoyable. With intelligent recommendations and a seamless interface, ShelfMate ensures you spend less time searching and more time reading. Let us help you build the perfect bookshelf—one great book at a time.`}
        speed={100}
        maxIterations={20}
        characters="ABCD1234!?"
        className="text-2xl font-semibold leading-relaxed max-w-3xl mx-auto p-6"
        parentClassName="w-full flex justify-center"
        encryptedClassName="encrypted"
      />
    </div>
  );
};

export default About;
