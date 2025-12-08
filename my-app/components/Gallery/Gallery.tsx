'use client';

import { Camper } from '@/types/camper';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function Gallery({ camper }: { camper: Camper }) {
  if (!camper.gallery?.length) return null;

  return (
    <div className={styles.grid}>
      {camper.gallery.slice(0, 4).map((img, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image
            src={img.original}
            alt={`${camper.name} ${index + 1}`}
            fill
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}
