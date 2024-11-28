import Head from 'next/head';
import React from 'react';
import styles from './styles/MainPage.module.css';


// Galvenā komponente Home
export default function Home() {
  return (
    <>
      <Head>
        {/* Iestatīt lapas virsrakstu */}
        <title>Midnight Runners</title>
        {/* Iestatīt lapas aprakstu */}
        <meta name="description" content="The ultimate car club experience in Latvia." />
        {/* Pievienot favicon ikonu */}
        <link rel="icon" href="/favicon.ico" />
      </Head>  {/* Renderē galveni */}
      
      {/* Hero sekcija */}
      <div className={styles.hero}>
        {/* Hero attēls */}
        <img className={styles.heroImage} src="/landing1.jpg" alt="Landing Image" />
        <div className={styles.heroText}>
          <h1>Welcome to Midnight Runners</h1>
          <p>Your ultimate car club experience starts here!</p>
        </div>
      </div>
      
      {/* Galvenā saturs */}
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Veikala sekcija */}
          <section className={styles.section}>
            {/* Sekcijas attēls */}
            <img className={styles.sectionImage} src="/shop.jpg" alt="Shop" />
            <div className={styles.sectionContent}>
              <h2>Shop</h2>
              <p>Get the latest Midnight Runners merchandise and show your support!</p>
              {/* Poga */}
              <a href="/shop" className={styles.button}>Shop Now</a>
            </div>
          </section>
          
          {/* Albuma sekcija */}
          <section className={styles.section}>
            {/* Sekcijas attēls */}
            <img className={styles.sectionImage} src="/album.jpg" alt="Blog" />
            <div className={styles.sectionContent}>
              <h2>Blog</h2>
              <p>Check out photos from our latest events and meets.</p>
              {/* Poga */}
              <a href="/blog" className={styles.button}> View Blog</a>
            </div>
          </section>
          
          {/* Spēļu sekcija */}
          <section className={styles.section}>
            {/* Sekcijas attēls */}
            <img className={styles.sectionImage} src="/coming.jpg" alt="Games" />
            <div className={styles.sectionContent}>
              <h2>Games</h2>
              <p>Play the latest car-themed games and compete with others!</p>
              {/* Poga */}
              <a href="/game" className={styles.button}>Play Now</a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}