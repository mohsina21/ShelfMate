// Contact.jsx
import React from 'react';
import { FaGithub, FaLinkedin,  } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const Contact = () => {
  return (
    
      

      <footer className="bg-[#040814] text-white py-8 mt-15">
        <div className="flex flex-col items-center">
          <p className="mb-2">Made by Mohsina Parveen</p>
          <div className="flex space-x-6 text-xl">
            <a href="https://github.com/mohsina21" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mohsina-parveen-577367203/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin />
            </a>
            <a href="https://x.com/notmohsina" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <RiTwitterXFill />
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Contact;
