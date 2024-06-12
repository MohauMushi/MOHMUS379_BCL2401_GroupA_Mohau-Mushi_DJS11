import { Link } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";
import "./Navbar.css";
import Logo from "../../assets/sound.png";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" className="logo-image" />
          <span className="logo-name">PodStream</span>
        </Link>
        
        <div className="nav-links">
        <Link to="/" className="nav-link">
          <FaHome /> Home
        </Link>

        <Link to="/favourites" className="nav-link">
          <FaHeart /> Favourites
        </Link>
        </div>
        
      </nav>
    </header>
  );
};

export default Navbar;
