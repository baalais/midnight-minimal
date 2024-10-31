"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../../utils/fetchBlogs";
import styles from '../../styles/blogPost.module.css'; // Import your CSS module

interface BlogPostProps {
  params: {
    slug: string; // Define slug as a string
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ params }) => {
  const { slug } = params; // Get slug from params
  const [blogPost, setBlogPost] = useState<any>(null); // State to hold the blog post

  useEffect(() => {
    const getBlogPost = async () => {
      try {
        const blogPosts = await fetchBlogs(); // Load all blog posts
        const post = blogPosts.find((b: any) => b.slug === slug); // Find the post with the matching slug
        setBlogPost(post); // Save the found post in state
      } catch (error) {
        console.error("Failed to fetch blog post:", error); // Log error
      }
    };

    if (slug) getBlogPost(); // Call function if slug is available
  }, [slug]);

  if (!blogPost) return <div className={styles.textCenter}>Blog post not found.</div>; // Return if the blog post is not found

  const imageUrl = blogPost.coverImage
    ? blogPost.coverImage
        .replace('wix:image://', 'https://static.wixstatic.com/media/')
        .replace('/v1/', '/')
        .split('#')[0]
        .split('/').slice(0, -1).join('/')
    : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Fallback image

    return (
      <div className={`${styles.flex} ${styles.flexCol} ${styles.minHScreen}`}>
        <main className={`${styles.container} ${styles.main}`}>
          <h1 className={styles.text4xl}>{blogPost.slug}</h1>
          <div className={styles.card}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={blogPost.slug}
                className={`${styles.wFull} ${styles.h72} ${styles.objectContain} ${styles.mb4}`}
              />
            )}
            <p className={`${styles.textGray600} ${styles.mb4}`}>{blogPost.excerpt}</p>
            <div className={styles.mt4}>
              <h2 className={styles.text2xl}>Content</h2>
              {blogPost.richContent?.nodes.map((node: any) => (
                <div key={node.id}>
                  {node.type === "PARAGRAPH" && node.nodes[0]?.textData?.text && (
                    <p className={`${styles.textGray700} ${styles.mb4}`}>{node.nodes[0].textData.text}</p>
                  )}
                  {node.type === "HEADING" && node.nodes[0]?.textData?.text && (
                    <h3 className={`${styles.text2xl} ${styles.fontBold} ${styles.mt4} ${styles.mb2}`}>
                      {node.nodes[0].textData.text}
                    </h3>
                  )}
                  {node.type === "BULLETED_LIST" && (
                    <ul className={`${styles.listDisc} ${styles.pl5} ${styles.mb4}`}>
                      {node.nodes.map((listItem: any) => (
                        <li key={listItem.id} className={`${styles.textGray700} ${styles.mb2}`}>
                          {listItem.nodes.map((paragraph: any) => (
                            paragraph.nodes[0]?.textData?.text && (
                              <p key={paragraph.id} className={`${styles.textGray700} ${styles.mb2}`}>
                                {paragraph.nodes[0].textData.text}
                              </p>
                            )
                          ))}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );    
};

export default BlogPost;
