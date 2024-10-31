"use client";

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/fetchProducts'; // Adjust the path as necessary
import Link from 'next/link'; // Import Link from next/link
import styles from '../styles/shop.module.css'; // Import your CSS module

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
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => {
          const imageUrl = product.mainMedia
            ? product.mainMedia
                .replace('wix:image://', 'https://static.wixstatic.com/media/')
                .replace('/v1/', '/')
                .split('#')[0]
                .split('/').slice(0, -1).join('/')
            : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Fallback image

          const firstSentence = product.description.split('. ')[0];

          return (
            <div key={product._id} className={styles.productCard}>
              <img 
                src={imageUrl} 
                alt={product.name} 
                className={styles.productImage} 
              />
              <h2 className={styles.productName}>{product.name}</h2>
              <p>{product.formattedPrice}</p>
              <p className={styles.productDescription}>{firstSentence}.</p>
              <Link href={`/shop/${product.slug}`} className={styles.viewProductLink}>
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
