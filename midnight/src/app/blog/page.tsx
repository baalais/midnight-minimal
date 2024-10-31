"use client";

import React, { useEffect, useState } from "react";//JSX sintakse, effect blakus efekts komponentes dzīves ciklā, state saglabāt datus var mainīties auto atjauno komponenti kad dati mainas
import { fetchBlogs } from "../../utils/fetchBlogs";
import Link from "next/link";
import styles from '../styles/album.module.css';

// React FC fukcionālais komponents(tipa definīcija, piem auto piev. children)
const Album: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]); // Stāvoklis, lai saglabātu bloga ierakstus [] tukš masīvs, dajebkādu masīvu

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogPosts = await fetchBlogs(); // Iegūst bloga ierakstus
        setBlogs(blogPosts); // Saglabā iegūtos ierakstus stāvoklī
      } catch (error) {
        console.error("Neizdevās iegūt bloga ierakstus:", error);
      }
    };
    getBlogs(); // Izsauc funkciju, lai iegūtu bloga ierakstus
  }, []); // Atkarības masīvs ir tukšs, tāpēc funkcija izsauksies tikai vienu reizi

  return (
    <div className={`${styles.flex} ${styles.flexCol} ${styles.minHScreen}`}>
      <main className={styles.container}>
        <h1 className={styles.text4xl}>Bloga Ieraksti</h1>
        <div className={styles.grid}>
          {blogs.map((blog) => { // Kartot katru bloga ierakstu, map izveido jaunu masīvu katram blog => izsauc katru blog lai parādītu
            let imageUrl = blog.coverImage 
              ? blog.coverImage
                  .replace('wix:image://', 'https://static.wixstatic.com/media/') // Nomaina URL daļu
                  .replace('/v1/', '/')// Aizstāj daļu URL
                  .split('#')[0]// Noņem fragmentu
                  .split('/').slice(0, -1).join('/') // Apstrādā attēla URL
              : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Rezerves attēls

            return (
              <div key={blog._id} className={styles.card}> {/* Rāda katru bloga ierakstu karti*/}
                {imageUrl && (
                  <img
                    src={imageUrl} // Iestata attēla avotu
                    alt={blog.slug} // Alt teksts attēlam
                    className={styles.img}
                    onError={(e) => {
                      e.currentTarget.src = '/fallback.png'; // Rezerves attēls, ja sākotnējais neizdodas
                    }}
                  />
                )}
                <div className={styles.p}>
                  <h2 className={styles.text2xl}>{blog.slug}</h2> {/* Rāda bloga ieraksta nosaukumu*/}
                  <p className={`${styles.textGray700} ${styles.mb4}`}>{blog.excerpt}</p> {/* Rāda bloga ieraksta īso aprakstu*/}
                  <Link href={`/blog/${blog.slug}`}>  {/* Link uz konkrēto bloga ierakstu*/}
                    <span className={styles.readMore}>Lasīt vairāk</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Album;
