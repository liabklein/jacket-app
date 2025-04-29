import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AboutModal from './AboutModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <div style={{ position: 'relative' }}>
        <FontAwesomeIcon
          icon={faInfoCircle}
          onClick={() => setIsModalOpen(true)}
          className="info-icon"
        />
  
        {/* Overlay */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed', // Covers the whole screen
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent
              zIndex: 998, // Ensure it's below the modal but above other content
            }}
            onClick={() => setIsModalOpen(false)} // Close modal when overlay is clicked
          ></div>
        )}
  
        {isModalOpen && <AboutModal setIsModalOpen={setIsModalOpen} />}
      </div>
    );
  };
  

export default Header;
