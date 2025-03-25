import React from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import About from './Components/About'
const App = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <Home />
      <About />
    </div>
  )
}

export default App