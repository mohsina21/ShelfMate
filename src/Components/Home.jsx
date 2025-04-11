import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LampContainer } from "./LampDemo";  
import { TypewriterEffectSmooth } from './TypewriterEffect';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white relative flex flex-col items-center justify-center min-h-screen -mt-3">
      <LampContainer />
      <div className="absolute top-1/3 flex flex-col items-center text-center mt-24 pt-0  ">
        <TypewriterEffectSmooth 
          words={[{ text: "SHELFMATE" }]} 
          className="text-6xl font-bold  mt-28np opacity-65"
          
        />
        <TypewriterEffectSmooth 
          words={[{ text: "Read Smarter" }]} 
          className="text-2xl font-bold  opacity-65"
        />
        <button 
          onClick={() => navigate('/mainpage')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300 m-10 shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
