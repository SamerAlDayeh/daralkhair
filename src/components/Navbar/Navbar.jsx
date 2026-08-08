import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import {
  ShoppingBag,
  Menu,
  X,
  BookOpen,
  Compass,
  Percent,
  Info,
  Home as HomeIcon,
} from "lucide-react";
import "./Navbar.css";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <div className="brand-icon-box rotate-45">
              <span className="-rotate-45 brand-arabic-symbol font-bold text-[#CEB081]">
                DK
              </span>
            </div>
          </div>
          <div className="brand-text-box">
            <span className="brand-name font-arabic font-bold text-lg">
              دار الخير
            </span>
            <span className="brand-subtext font-arabic">
              للنشر والتوزيع — تأسست 1978
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            الرئيسية
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            المكتبة والكتب
          </NavLink>
          <NavLink
            to="/offers"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            العروض الخاصة
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            عن الدار
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Cart Icon Link */}
          <Link to="/cart" className="cart-icon-btn" aria-label="Shopping Cart">
            <ShoppingBag size={22} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={closeMobileMenu}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="brand-name font-arabic font-bold text-lg">
                دار الخير للنشر
              </span>
              <button className="mobile-drawer-close" onClick={closeMobileMenu}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-links">
              <NavLink
                to="/"
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <HomeIcon size={18} />
                <span>الرئيسية</span>
              </NavLink>
              <NavLink
                to="/books"
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <BookOpen size={18} />
                <span>المكتبة والكتب</span>
              </NavLink>
              <NavLink
                to="/offers"
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <Percent size={18} />
                <span>العروض الخاصة</span>
              </NavLink>
              <NavLink
                to="/about"
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <Info size={18} />
                <span>عن الدار</span>
              </NavLink>
              <NavLink
                to="/cart"
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <ShoppingBag size={18} />
                <span>السلة ({totalItems})</span>
              </NavLink>
            </div>

            <div className="mobile-drawer-footer">
              <div className="font-arabic text-center gold-text">
                دار الخير للنشر والتوزيع
              </div>
              <p className="mobile-footer-tag font-arabic">
                خدمة الكتاب الإسلامي وتحقيق المخطوطات
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
