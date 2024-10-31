"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from '../styles/header.module.css'; // Import your CSS module

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State for menu open/close

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Midnight Runners</Link> {/* Link to home */}
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        {isOpen ? (
          <span>✖</span> // Close icon
        ) : (
          <span>☰</span> // Menu icon
        )}
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.navItem}>
          <Link href="/" passHref>
            <button>Home</button>
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/blog" passHref>
            <button>Blog</button>
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/shop" passHref>
            <button>Shop</button>
          </Link>
        </div>
        <div className={styles.navItem}>
          <Link href="/game" passHref>
            <button>Game</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
