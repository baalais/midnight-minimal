"use client";

import React from "react"; // js bibl priekš lietotāju interfeisa
import Image from "next/image";
import styles from '../styles/reviews.module.css';

const Reviews = () => {
  const reviews = [
    {
      id: "1",
      customer: {
        avatar_url: "/avatar-default.png",
        display_name: "John Doe"
      },
      rating: 5,
      heading: "Great product!",
      body: "I loved it!",
      media: []
    }
  ];

  return (
    <div className={styles.reviewsContainer}>{/* Atsauksmju konteineris */}
      {reviews.map((review) => ( // Iet cauri visām atsauksmēm
        <div key={review.id} className={styles.review}> {/* Atsauksmes elements */}
          <div className={styles.reviewHeader}> {/* Atsauksmes virsraksta sekcija */}
            <Image
              src={review.customer.avatar_url} // Klienta avatara attēls
              alt="Avatar"
              width={32}
              height={32}
              className={styles.avatar}
            />
            <span className="font-medium">{review.customer.display_name}</span> {/* Klienta vārds */}
          </div>
          <div className={styles.reviewRating}> {/* Vērtējuma sekcija */}
            {Array.from({ length: review.rating }).map((_, index) => ( // Izveido masīvu ar garumu, kas vienāds ar review, pašreizējā vērtība _, index pašreizējo iterāciju
              <Image src="/star.png" alt="Star" key={index} width={16} height={16} />
            ))}
          </div>
          {review.heading && <p className={styles.reviewHeading}>{review.heading}</p>} {/* Atsauksmes virsraksts */}
          {review.body && <p className={styles.reviewBody}>{review.body}</p>} {/* Atsauksmes teksts */}
          {review.media?.map((media) => ( // Iet cauri visiem medijiem
            <Image
              src={media.url}
              key={media.id}
              alt=""
              width={100}
              height={50}
              className={styles.mediaImage} // Mediju attēls
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
