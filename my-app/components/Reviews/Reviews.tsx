'use client';

import { Review } from '@/types/camper';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) return <p>No reviews yet.</p>;

  return (
    <div className="mt-4 space-y-4">
      {reviews.map((r, i) => (
        <div key={i} className="border p-3 rounded">
          <div className="flex justify-between items-center mb-1">
            <strong>{r.reviewer_name}</strong>
            <span>{'★'.repeat(r.reviewer_rating)}</span>
          </div>
          <p className="text-sm text-gray-700">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
