import React, { useState } from "react";
import { FaMicrophone, FaMusic } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export const Navbar = ({ setAnimation, toggleListening, isListening }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle animation selection
  const handleAnimationChange = (animation) => {
    setAnimation(animation);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.dropdown} onClick={toggleDropdown}>
        <span style={styles.title}>Let's Dance</span>
        <IoMdArrowDropdown style={styles.dropdownIcon} />
      </div>
      {isOpen && (
        <div style={styles.dropdownMenu}>

          <div style={styles.menuItem} onClick={() => handleAnimationChange("Dance1")}>
            <FaMusic style={styles.icon} />
            Dance 1
          </div>
          <div style={styles.menuItem} onClick={() => handleAnimationChange("Dance2")}>
            <FaMusic style={styles.icon} />
            Dance 2
          </div>
          <div style={styles.menuItem} onClick={() => handleAnimationChange("Dance3")}>
            <FaMusic style={styles.icon} />
            Dance 3
          </div>
          <div style={styles.menuItem} onClick={() => handleAnimationChange("Dance4")}>
            <FaMusic style={styles.icon} />
            Dance 4
          </div>
          <div style={styles.menuItem} onClick={() => handleAnimationChange("Dance5")}>
            <FaMusic style={styles.icon} />
            Dance 5
          </div>
          <div style={styles.menuItem} onClick={() => handleAnimationChange("Standing")}>
            Stop
          </div>
          {/* Add more dance options as needed */}
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    width: '150px',
  },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '5px',
  },
  dropdownIcon: {
    fontSize: '14px',
  },
  dropdownMenu: {
    marginTop: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#fff',
    width: '100%',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  icon: {
    marginRight: '10px',
  },
};
