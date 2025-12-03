'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Camper } from '@/types/camper';
import { useFavorites } from '@/store/useFavorites';

export default function CamperCard({ camper }: { camper: Camper }) {
  const toggle = useFavorites((s) => s.toggleFavorite);
  const isFav = useFavorites((s) => Boolean(s.favorites?.[camper.id]));

  const image =
    camper.gallery && camper.gallery.length > 0
      ? camper.gallery[0].thumb
      : '/placeholder.jpg';

  return (
    <article style={{ border: '1px solid #ccc', padding: 12, marginBottom: 12 }}>
      <Image
        src={image}
        alt={camper.name}
        width={200}
        height={140}
        style={{ objectFit: 'cover' }}
      />

      <h3>{camper.name}</h3>
      <p>{camper.location}</p>
      <p>{camper.price} ₴</p>

      <Link href={`/catalog/${camper.id}`}>Show more</Link>

      <button onClick={() => toggle(camper)}>
        {isFav ? '★ Улюблене' : '☆ В обране'}
      </button>
    </article>
  );
}
