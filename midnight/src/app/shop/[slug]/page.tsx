"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "../../../utils/fetchProducts"; // Adjust this path as needed
import Reviews from "@/app/components/reviews";
import styles from '../../styles/ProductPage.module.css'; // Import your CSS module

const ProductPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
  const [product, setProduct] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params; 
      console.log("Resolved Slug:", resolvedParams.slug);
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    const getProduct = async () => {
      if (slug) {
        try {
          const products = await fetchProducts(); 
          console.log("Fetched Products:", products);
          const filteredProduct = products.find((p: any) => p.slug === slug); 
          setProduct(filteredProduct || null);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    getProduct();
  }, [slug]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const imageUrl = product.mainMedia
    ? product.mainMedia
        .replace('wix:image://', 'https://static.wixstatic.com/media/')
        .replace('/v1/', '/')
        .split('#')[0]
        .split('/').slice(0, -1).join('/')
    : "/product.png";

  return (
    <div className={styles.container}>
      <div className={styles.flexGrow}>
        <div className="lg:flex lg:items-start">
          <div className="w-full lg:w-1/2 lg:sticky top-20">
            <Image
              src={imageUrl}
              alt={product.name || "Product Image"}
              width={600}
              height={600}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productDetails}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="flex items-center mb-4">
              <span className={styles.productPrice}>
                €{product.price ? product.price.toFixed(2).replace('.', ',') : "0,00"}
              </span>
            </div>
            <div className={styles.border} />
            {product.additionalInfoSections?.map((section) => (
              <div className={styles.additionalInfo} key={section.title}>
                <h4 className={styles.sectionTitle}>{section.title}</h4>
                <p className={styles.sectionDescription}>{section.description}</p>
              </div>
            ))}
            <div className={styles.border} />
            <h1 className={styles.reviewTitle}>User Reviews</h1>
            <Reviews productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
