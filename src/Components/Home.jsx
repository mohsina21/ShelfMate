import React from 'react'
import { LampContainer } from "./LampDemo";  
import { TypewriterEffectSmooth } from './TypeWriterEffect';

const Home = () => {
  return (
    <div className="text-white relative flex flex-col items-center justify-center min-h-screen -mt-3 ">
      <LampContainer />
      <div className="absolute top-1/3 flex flex-col items-center text-center -mt-24 pt-0">
        {/* First Typewriter Effect for "ShelfMate" */}
        <TypewriterEffectSmooth 
          words={[{ text: "ShelfMate" }]} 
          className="text-4xl font-bold mb-2"
        />

        {/* Second Typewriter Effect for "Read Smarter" */}
        <TypewriterEffectSmooth 
          words={[{ text: "Read Smarter" }]} 
          className="text-3xl font-bold"
        />
      </div>
    </div>
  );
}

export default Home;
