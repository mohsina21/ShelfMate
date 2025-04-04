import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LampContainer } from "./LampDemo";  
import { TypewriterEffectSmooth } from './TypeWriterEffect';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white relative flex flex-col items-center justify-center min-h-screen -mt-3">
      <LampContainer />
      <div className="absolute top-1/3 flex flex-col items-center text-center -mt-24 pt-0">
        <TypewriterEffectSmooth 
          words={[{ text: "ShelfMate" }]} 
          className="text-4xl font-bold mb-2"
        />
        <TypewriterEffectSmooth 
          words={[{ text: "Read Smarter" }]} 
          className="text-3xl font-bold mb-6"
        />
        <button 
          onClick={() => navigate('/mainpage')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300 m-10"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
