import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Mainpage from './Components/Mainpage';

const App = () => {
  const aboutRef = useRef(null); // Reference for the About section

  const handleScrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div>
        {/* Pass the scroll handler to the Navbar */}
        <Navbar onAboutClick={handleScrollToAbout} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <div ref={aboutRef}>
                  <About />
                </div>
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/mainpage" element={<Mainpage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
