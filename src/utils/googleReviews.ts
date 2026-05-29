export interface GoogleReview {
  id: string;
  name: string;
  country: string;
  text: string;
  rating: number;
}

export interface GoogleReviewsSummary {
  placeName: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

const staticGoogleReviews: GoogleReview[] = [
  {
    id: "review-priya-sharma",
    name: "Priya Sharma",
    country: "Delhi, India",
    text: "Shivaya Yogashala transformed my understanding of yoga. The spiritual depth and authentic Hatha Yoga teaching changed my life completely. The teachers are truly masters of their craft.",
    rating: 5,
  },
  {
    id: "review-rajesh-kumar",
    name: "Rajesh Kumar",
    country: "Mumbai, India",
    text: "The ashram environment is perfect for deep learning. The teachers are highly experienced and the traditional approach to yoga here is unparalleled. Highly recommended!",
    rating: 5,
  },
  {
    id: "review-ananya-patel",
    name: "Ananya Patel",
    country: "Bangalore, India",
    text: "I came as a complete beginner and left as a confident yoga teacher. The 200hr Multistyle YTT course is comprehensive and covers everything from asanas to philosophy beautifully.",
    rating: 5,
  },
];

const staticGoogleReviewsSummary: GoogleReviewsSummary = {
  placeName: "Shivaya Yogashala",
  rating: 4.9,
  totalReviews: 186,
  reviews: staticGoogleReviews,
};

export function getGoogleReviewsSummary() {
  return staticGoogleReviewsSummary;
}
