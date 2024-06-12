import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaBars } from "react-icons/fa";
import "./Navbar.css";
import Logo from "../../assets/sound.png";
import { useState } from 'react';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" className="logo-image" />
          <span className="logo-name">PodStream</span>
        </Link>
  
        <div className={`nav-links ${showMenu ? 'show' : ''}`}>
          <Link to="/" className="nav-link">
            <FaHome /> Home
          </Link>
  
          <Link to="/favourites" className="nav-link">
            <FaHeart /> Favourites
          </Link>
        </div>
  
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
