import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";
import { AppBar } from "@mui/material";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <header className="header">
      <h2 className="logo">Breath Analysis</h2>

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
        <NavLink to="/feedback" onClick={() => setIsMobileMenuOpen(false)}>
          feedback
        </NavLink>
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
