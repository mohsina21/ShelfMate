import React from 'react'
import GooeyNav from './GooeyNav'
const Navbar = () => {
    const items = [
        { label: "Home", href: "/" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ];
  return (
    <div>
        <div className='w-full h-20 bg-[#020618] flex justify-center items-center '>
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
    </div>
  )
}

export default Navbar