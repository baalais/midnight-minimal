"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "../../../utils/fetchProducts"; // Adjust this path as needed
import Reviews from "@/app/components/reviews";

const ProductPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
  const [product, setProduct] = useState<any>(null);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
      const getSlug = async () => {
          const resolvedParams = await params; 
          console.log("Resolved Slug:", resolvedParams.slug); // Log slug
          setSlug(resolvedParams.slug);
      };
      getSlug();
  }, [params]);

    useEffect(() => {
      const getProduct = async () => {
          if (slug) {
              try {
                  const products = await fetchProducts(); 
                  console.log("Fetched Products:", products); // Log products
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
        return <p>Loading...</p>; // Loading state
    }

    const imageUrl = product.mainMedia
        ? product.mainMedia
        .replace('wix:image://', 'https://static.wixstatic.com/media/') // Replace prefix
        .replace('/v1/', '/') // Remove /v1/
        .split('#')[0] // Remove any query parts
        .split('/').slice(0, -1).join('/')
        : "/product.png"; // Fallback image

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow container mx-auto px-4 md:px-8 pt-20 lg:flex lg:flex-row lg:items-start">
                <div className="w-full lg:w-1/2 lg:sticky top-20">
                    <Image
                        src={imageUrl}
                        alt={product.name || "Product Image"}
                        width={600}
                        height={600}
                        className="rounded-lg shadow-lg max-h-90 object-cover"
                    />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col p-6 bg-gray-50 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p
                        className="text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-semibold">
                            €{product.price ? product.price.toFixed(2).replace('.', ',') : "0,00"}
                        </span>
                    </div>
                    <div className="my-6 border-t border-gray-300" />
                    {product.additionalInfoSections?.map((section) => (
                        <div className="mb-4" key={section.title}>
                            <h4 className="font-medium text-lg mb-2">{section.title}</h4>
                            <p className="text-gray-600">{section.description}</p>
                        </div>
                    ))}
                    <div className="my-6 border-t border-gray-300" />
                    <h1 className="text-2xl font-semibold mt-4">User Reviews</h1>
                    <Reviews productId={product.id} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
