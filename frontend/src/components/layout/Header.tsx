import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "../../../asset/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center ">
          <img className="w-[150px]" src={Logo} alt="main logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="w-full hidden md:flex items-center justify-end space-x-8">
          <Link
            to="/"
            className="text-sec hover:text-brown-900 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/order"
            className="text-sec hover:text-brown-900 font-medium transition"
          >
            Order Here
          </Link>
        </nav>

        {/* Cart & Mobile Menu Toggle */}
        <div className="flex items-center">
          {" "}
          <button
            className="p-2 text-brown-800 md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fadeIn bg-white">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sec hover:text-brown-900 font-medium py-2 transition"
            >
              Home
            </Link>
            <Link
              to="/order"
              className="text-sec hover:text-brown-900 font-medium py-2 transition"
            >
              Order Here
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
