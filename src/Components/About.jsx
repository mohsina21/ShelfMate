import React from 'react';
import DecryptedText from './DecryptedText'; // ✅ Fixed the import statement

const About = () => {
  return (
    <div>
      <DecryptedText
        text={`ShelfMate is your personal AI-powered book companion, designed to help you discover books that match your unique taste. Whether you’re looking for recommendations based on your past reads or exploring new genres, ShelfMate curates personalized suggestions to make every reading experience enjoyable.

With intelligent recommendations and a seamless interface, ShelfMate ensures you spend less time searching and more time reading. Let us help you build the perfect bookshelf—one great book at a time.`}
        speed={100}
        maxIterations={20}
        characters="ABCD1234!?"
        className="revealed"
        parentClassName="all-letters"
        encryptedClassName="encrypted"
      />
    </div>
  );
};

export default About;
