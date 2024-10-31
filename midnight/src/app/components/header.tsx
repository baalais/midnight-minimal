"use client";

import React, { useState } from "react"; //JSX sintakse, state saglabāt datus kuri var mainīties auto atjauno komponenti kad dati mainas
import Link from "next/link";
import styles from '../styles/header.module.css';

// React FC fukcionālais komponents(tipa definīcija, piem auto piev. children)
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Stāvoklis, lai noteiktu, vai izvēlne ir atvērta vai aizvērta

  // Funkcija, lai pārslēgtu izvēlni
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Maina izvēlnes atvēršanas stāvokli
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Midnight Runners</Link>
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>{/*Izvēlnes pārslēgšanas ikona*/}
        {isOpen ? (
          <span>✖</span> // Aizvēršanas ikona, ja izvēlne ir atvērta
        ) : (
          <span>☰</span> // Izvēlnes ikona, ja izvēlne ir aizvērta
        )}
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}> {/* Navigācijas izvēlne*/}
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
