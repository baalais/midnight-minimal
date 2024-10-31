"use client";

import React, { useEffect, useState } from 'react';//JSX sintakse, effect blakus efekts komponentes dzīves ciklā, state saglabāt datus var mainīties auto atjauno komponenti kad dati mainas
import { fetchProducts } from '../../utils/fetchProducts';
import Link from 'next/link';
import styles from '../styles/shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]); // Stāvoklis, lai turētu produktus
  const [error, setError] = useState<string | null>(null); // Stāvoklis, lai turētu kļūdas ziņu

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(); // Iegūst produktus
        setProducts(fetchedProducts); // Iestata iegūtos produktus stāvoklī
      } catch (err) {
        setError('Failed to load products');
      }
    };

    loadProducts(); // Izsauc funkciju, lai ielādētu produktus
  }, []); // Tukšs masīvs, lai funkcija izsauktos tikai vienu reizi

  if (error) return <div>{error}</div>; // Ja ir kļūda, attēlo kļūdas ziņu

  return (
    <div className={styles.container}>
      <div className={styles.grid}> {/* Grida struktūra produktu attēlošanai*/}
        {products.map((product) => { // Pārbauda visus produktus
          const imageUrl = product.mainMedia
            ? product.mainMedia
                .replace('wix:image://', 'https://static.wixstatic.com/media/') // Aizstāj attēla URL
                .replace('/v1/', '/') // Aizstāj daļu URL
                .split('#')[0] // Noņem fragmentu
                .split('/').slice(0, -1).join('/') // Noņem pēdējo daļu no URL
            : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Noklusējuma attēls

          const firstSentence = product.description.split('. ')[0]; // Pirmā teikuma iegūšana no apraksta

          return (
            <div key={product._id} className={styles.productCard}> {/*Produkta karte*/}
              <img 
                src={imageUrl} 
                alt={product.name} // Attēla alternatīvais teksts
                className={styles.productImage} // CSS klase
              />
              <h2 className={styles.productName}>{product.name}</h2>{/*Produkta nosaukums*/}
              <p>{product.formattedPrice}</p>{/*Produkta cena*/}
              <p className={styles.productDescription}>{firstSentence}.</p>{/*Produkta apraksts (pirmais teikums)*/}
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
