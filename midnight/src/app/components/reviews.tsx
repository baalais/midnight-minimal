"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from '../styles/reviews.module.css'; // Import your CSS module

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false); // Skip loading state
    setReviews([
      {
        id: "1",
        customer: {
          avatar_url: "/avatar-default.png", // Use the local avatar image
          display_name: "John Doe"
        },
        rating: 5,
        heading: "Great product!",
        body: "I loved it!",
        media: []
      }
    ]);
  }, []);

  // Set sample reviews if none were found
  useEffect(() => {
    if (reviews.length === 0 && !loading && !error) {
      const sampleReviews = [
        {
          id: "1",
          customer: {
            avatar_url: "/avatar-default.png", // Use the local avatar image
            display_name: "John Doe"
          },
          rating: 5,
          heading: "Great product!",
          body: "I loved it!",
          media: []
        }
      ];
      setReviews(sampleReviews);
    }
  }, [reviews, loading, error]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.review}>
          <div className={styles.reviewHeader}>
            <Image
              src={review.customer.avatar_url}
              alt="Avatar"
              width={32}
              height={32}
              className={styles.avatar}
            />
            <span className="font-medium">{review.customer.display_name}</span>
          </div>
          <div className={styles.reviewRating}>
            {Array.from({ length: review.rating }).map((_, index) => (
              <Image src="/star.png" alt="Star" key={index} width={16} height={16} />
            ))}
          </div>
          {review.heading && <p className={styles.reviewHeading}>{review.heading}</p>}
          {review.body && <p className={styles.reviewBody}>{review.body}</p>}
          {review.media?.map((media) => (
            <Image
              src={media.url}
              key={media.id}
              alt=""
              width={100}
              height={50}
              className={styles.mediaImage}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
