'use client';

import { Camper } from '@/types/camper';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function Gallery({ camper }: { camper: Camper }) {
  if (!camper.gallery?.length) return null;

  return (
    <div className={styles.grid}>
      {camper.gallery.slice(0, 4).map((img) => (
        <Image
          key={img.original}
          src={img.original}
          alt={camper.name}
          width={400}
          height={260}
          className={styles.image}
        />
      ))}
    </div>
  );
}
