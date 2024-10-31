"use client"; // Ensure this line is present if you're using client-side features

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/fetchProducts'; // Adjust the path as necessary
import Link from 'next/link'; // Import Link from next/link

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products');
      }
    };

    loadProducts();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          // Format the image URL similar to the blog images
          const imageUrl = product.mainMedia
            ? product.mainMedia
                .replace('wix:image://', 'https://static.wixstatic.com/media/') // Replace prefix
                .replace('/v1/', '/') // Remove /v1/
                .split('#')[0] // Remove any query parts
                .split('/').slice(0, -1).join('/') // Remove the last part
            : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Fallback image

          // Extract the first sentence from the description
          const firstSentence = product.description.split('. ')[0]; // Get the first sentence

          return (
            <div key={product._id} className="border p-4">
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-72 object-contain mb-4" 
              />
              <h2>{product.name}</h2>
              <p>{product.formattedPrice}</p>
              {/* Display only the first sentence */}
              <p className="text-gray-700 mb-4">{firstSentence}.</p>
              {/* Link to the product detail page using the slug */}
              <Link href={`/shop/${product.slug}`}>
                View Product
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
