'use client';

import { Review } from '@/types/camper';
import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (!reviews?.length) return <p className={styles.noReviews}>No reviews yet.</p>;

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((r, i) => (
        <div key={i} className={styles.reviewCard}>
          <div className={styles.header}>
            <div className={styles.avatar}>{r.reviewer_name[0].toUpperCase()}</div>
            <div className={styles.userInfo}>
              <strong className={styles.name}>{r.reviewer_name}</strong>
              <div className={styles.stars}>
                {Array.from({ length: r.reviewer_rating }).map((_, idx) => (
                  <svg
                    key={idx}
                    width="16"
                    height="16"
                    fill="#FFC107"
                    className={styles.star}
                  >
                    <use href="/icons/symbol-defs.svg#icon-Property-1Pressed-star" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <p className={styles.comment}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
