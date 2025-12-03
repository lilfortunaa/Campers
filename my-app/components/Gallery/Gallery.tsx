'use client';

import { Camper } from '@/types/camper';
import Image from 'next/image';

export default function Gallery({ camper }: { camper: Camper }) {
  if (!camper.gallery?.length) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {camper.gallery.map((img) => (
        <Image
          key={img.original}
          src={img.thumb}
          alt={camper.name}
          className="w-full h-32 object-cover rounded"
        />
      ))}
    </div>
  );
}
