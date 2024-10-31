"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../utils/fetchBlogs";
import Link from "next/link";
import styles from '../styles/album.module.css'; // Import your CSS module

const Album: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]); // State to hold blog posts

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogPosts = await fetchBlogs(); // Fetch blog posts
        setBlogs(blogPosts); // Save fetched posts in state
      } catch (error) {
        console.error("Failed to fetch blog posts:", error); // Log error
      }
    };
    getBlogs(); // Call function to fetch blog posts
  }, []);

  return (
    <div className={`${styles.flex} ${styles.flexCol} ${styles.minHScreen}`}>
      <main className={styles.container}>
        <h1 className={styles.text4xl}>Blog Posts</h1>
        <div className={styles.grid}>
          {blogs.map((blog) => {
            let imageUrl = blog.coverImage 
              ? blog.coverImage
                  .replace('wix:image://', 'https://static.wixstatic.com/media/')
                  .replace('/v1/', '/')
                  .split('#')[0]
                  .split('/').slice(0, -1).join('/')
              : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png';

            return (
              <div key={blog._id} className={styles.card}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={blog.slug}
                    className={styles.img}
                    onError={(e) => {
                      e.currentTarget.src = '/fallback.png'; // Fallback image
                    }}
                  />
                )}
                <div className={styles.p}>
                  <h2 className={styles.text2xl}>{blog.slug}</h2>
                  <p className={`${styles.textGray700} ${styles.mb4}`}>{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`}>
                    <span className={styles.readMore}>Read more</span>
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
