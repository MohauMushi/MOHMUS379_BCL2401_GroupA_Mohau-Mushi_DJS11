import { Link, NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaBars } from "react-icons/fa";
import "./Navbar.css";
import Logo from "/favicon/favicon.ico";
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
          <NavLink to="/" className={({isActive}) => isActive ? "active-link" : null}>
            <FaHome /> Home
          </NavLink>
  
          <NavLink to="/favourites" className={({isActive}) => isActive ? "active-link" : null}>
            <FaHeart /> Favourites
          </NavLink>
        </div>
  
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
