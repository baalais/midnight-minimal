"use client"; // Add this line at the top

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../../utils/fetchBlogs";

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

  if (!blogPost) return <div className="text-center">Blog post not found.</div>; // Return if the blog post is not found

  const imageUrl = blogPost.coverImage
    ? blogPost.coverImage
        .replace('wix:image://', 'https://static.wixstatic.com/media/')
        .replace('/v1/', '/')
        .split('#')[0]
        .split('/').slice(0, -1).join('/')
    : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Fallback image

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 md:px-8 py-10 flex-grow">
        <h1 className="text-4xl font-bold mb-4">{blogPost.slug}</h1>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={blogPost.slug}
            className="w-full h-72 object-contain mb-4"
          />
        )}
        <p className="text-gray-600 mb-4">{blogPost.excerpt}</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Content</h2>
          {blogPost.richContent?.nodes.map((node: any) => (
            <div key={node.id}>
              {node.type === "PARAGRAPH" && node.nodes[0]?.textData?.text && (
                <p className="text-gray-700 mb-4">{node.nodes[0].textData.text}</p>
              )}
              {node.type === "HEADING" && node.nodes[0]?.textData?.text && (
                <h3 className="text-2xl font-bold mt-4 mb-2">{node.nodes[0].textData.text}</h3>
              )}
              {node.type === "BULLETED_LIST" && (
                <ul className="list-disc pl-5 mb-4">
                  {node.nodes.map((listItem: any) => (
                    <li key={listItem.id} className="text-gray-700 mb-2">
                      {listItem.nodes.map((paragraph: any) => (
                        paragraph.nodes[0]?.textData?.text && (
                          <p key={paragraph.id} className="text-gray-700 mb-2">
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
      </main>
    </div>
  );
};

export default BlogPost;
