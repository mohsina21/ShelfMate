import React from 'react';
import GooeyNav from './GooeyNav';

const Navbar = ({ onNavigate }) => {
  const items = [
    {
      label: "Home",
      element: (
        <button onClick={() => onNavigate("home")} className="text-white hover:text-blue-400 transition">
          Home
        </button>
      ),
    },
    {
      label: "About",
      element: (
        <button onClick={() => onNavigate("about")} className="text-white hover:text-blue-400 transition">
          About
        </button>
      ),
    },
    {
      label: "Contact",
      element: (
        <button onClick={() => onNavigate("contact")} className="text-white hover:text-blue-400 transition">
          Contact
        </button>
      ),
    },
  ];

  return (
    <div className="w-full h-20 bg-[#020618] flex justify-center items-center relative">
      <GooeyNav
        items={items}
        animationTime={600}
        pCount={15}
        minDistance={20}
        maxDistance={12}
        maxRotate={75}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        timeVariance={300}
      />
    </div>
  );
};


export default Navbar;
