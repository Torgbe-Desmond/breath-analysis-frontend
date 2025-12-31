import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="header">
      <h2 className="logo">BadBreath</h2>

      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/explore" onClick={() => setIsMobileMenuOpen(false)}>
          Explore
        </NavLink>
        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
          About
        </NavLink>
        {/* <NavLink to="/contribute" onClick={() => setIsMobileMenuOpen(false)}>
          Contribute
        </NavLink> */}
        <NavLink to="/assessment" onClick={() => setIsMobileMenuOpen(false)}>
          Assessment
        </NavLink>
      </nav>

      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </header>
  );
}
