import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex flex-col gap-4 border-b py-4">
          <div className="flex items-center gap-4">
            <Image
              src={review.customer.avatar_url}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">{review.customer.display_name}</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: review.rating }).map((_, index) => (
              <Image src="/star.png" alt="Star" key={index} width={16} height={16} />
            ))}
          </div>
          {review.heading && <p className="font-bold">{review.heading}</p>}
          {review.body && <p>{review.body}</p>}
          {review.media?.map((media) => (
            <Image
              src={media.url}
              key={media.id}
              alt=""
              width={100}
              height={50}
              className="object-cover"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
