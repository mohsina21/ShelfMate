import React from 'react';
import GooeyNav from './GooeyNav';

const Navbar = ({ onNavigate }) => {
  const items = [
    {
      label: "Home",
      onClick: () => onNavigate("home"),
    },
    {
      label: "About",
      onClick: () => onNavigate("about"),
    },
    {
      label: "Contact",
      onClick: () => onNavigate("contact"),
    },
  ];

  return (
    <div className="w-full h-20 bg-[#020618] opacity-75 flex justify-center items-center fixed top-0 left-0 z-50">
      <GooeyNav
        items={items}
        animationTime={600}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        timeVariance={300}
      />
    </div>
  );
};

export default Navbar;
