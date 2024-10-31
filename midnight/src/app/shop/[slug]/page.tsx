"use client";

import React, { useEffect, useState } from "react"; //JSX sintakse, effect blakus efekts komponentes dzīves ciklā, state saglabāt datus var mainīties auto atjauno komponenti kad dati mainas
import Image from "next/image";
import { fetchProducts } from "../../../utils/fetchProducts";
import Reviews from "@/app/components/reviews";
import styles from '../../styles/ProductPage.module.css';

// React FC fukcionālais komponents(tipa definīcija, piem auto piev. children)
//params asinkroniskais objekts, izpildis atgriež slug
const ProductPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
  const [product, setProduct] = useState<any>(null); // Stāvoklis, lai turētu produktu
  const [slug, setSlug] = useState<string | null>(null); // Stāvoklis, lai turētu slug

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params; // Sagaida parametrus
      console.log("Resolved Slug:", resolvedParams.slug); // Izvada slug uz konsoli
      setSlug(resolvedParams.slug); // Iestata slug
    };
    getSlug(); // Izsauc funkciju
  }, [params]);

  useEffect(() => {
    const getProduct = async () => {
      if (slug) { // Ja slug ir pieejams
        try {
          const products = await fetchProducts(); // Iegūst produktus
          console.log("Fetched Products:", products); // Izvada produktus uz konsoli
          const filteredProduct = products.find((p: any) => p.slug === slug); // Filtrē produktu pēc slug, katram produkta masīvā, vai atbilst slug
          setProduct(filteredProduct || null); // Iestata produktu
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    getProduct(); // Izsauc funkciju, lai iegūtu produktu
  }, [slug]);

  if (!product) {
    return <p>Loading...</p>; // Ja produkts nav pieejams, rāda ielādes ziņu
  }

  const imageUrl = product.mainMedia
    ? product.mainMedia
        .replace('wix:image://', 'https://static.wixstatic.com/media/') // Aizstāj attēlu URL
        .replace('/v1/', '/') // Aizstāj daļu URL
        .split('#')[0] // Noņem fragmentu
        .split('/').slice(0, -1).join('/') // Noņem pēdējo daļu no URL
    : "/product.png"; // Noklusējuma attēls

  return (
    <div className={styles.container}>
      <div className={styles.flexGrow}>
        <div className={styles.flexContainer}> {/* Konteiners, lai novietotu produktu attēlu un detaļas */}
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt={product.name || "Product Image"} // Attēla alternatīvais teksts
              width={600}
              height={600}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productDetails}> {/*Produkta detaļu sekcija*/}
            <h1 className={styles.productName}>{product.name}</h1>  {/*Produkta nosaukums*/}
            <p
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: product.description }} // Ievieto HTML produkta aprakstā
            />
            <div className={styles.priceContainer}>
              <span className={styles.productPrice}>
                €{product.price ? product.price.toFixed(2).replace('.', ',') : "0,00"}{/* Pārveido divi decibāli, ja nebūs tad 0,00*/}
              </span>
            </div>
            <div className={styles.border} /> {/* Robežas sekcija*/}
            {product.additionalInfoSections?.map((section) => ( // Papildu informācijas sadaļas
              <div className={styles.additionalInfo} key={section.title}>
                <h4 className={styles.sectionTitle}>{section.title}</h4> {/* Sadaļas nosaukums*/}
                <p className={styles.sectionDescription}>{section.description}</p> {/* Sadaļas apraksts*/}
              </div>
            ))}
            <div className={styles.border} /> {/* Robežas sekcija*/}
            <h1 className={styles.reviewTitle}>User Reviews</h1>
            <Reviews productId={product.id} />{/*Atsauksmju komponents*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
