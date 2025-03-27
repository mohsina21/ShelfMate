import React from 'react';
import DecryptedText from './DecryptedText';

const About = () => {
  return (
    <div className="bg-[#020618] text-white min-h-screen flex flex-col items-center justify-start p-10 -mt-4 text-center">
      {/* Centered About Heading at the Top with More Space */}
      <h1 className="text-7xl font-extrabold  mb-16 w-full">
        About ShelfMate
      </h1>

      {/* Decrypted Description with More Centering & Padding */}
      <DecryptedText
        text={`ShelfMate is your personal AI-powered book companion, designed to help you discover books that match your unique taste. Whether you’re looking for recommendations based on your past reads or exploring new genres, ShelfMate curates personalized suggestions to make every reading experience enjoyable. With intelligent recommendations and a seamless interface, ShelfMate ensures you spend less time searching and more time reading. Let us help you build the perfect bookshelf—one great book at a time.`}
        speed={100}
        maxIterations={20}
        characters="ABCD1234!?"
        className="text-4xl font-semibold leading-relaxed max-w-2xl mx-auto px-30"
        parentClassName="w-full flex justify-center p-7 text-2xl font-semibold leading-relaxed max-w-2xl mx-auto px-10"
        encryptedClassName="encrypted"
      />
    </div>
  );
};

export default About;
