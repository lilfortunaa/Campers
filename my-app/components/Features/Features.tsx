'use client';

import { Camper } from '@/types/camper';

export default function Features({ camper }: { camper: Camper }) {
  const list: [string, string | number | boolean | undefined][] = [
    ['Transmission', camper.transmission],
    ['Engine', camper.engine],
    ['AC', camper.AC],
    ['Bathroom', camper.bathroom],
    ['Kitchen', camper.kitchen],
    ['TV', camper.TV],
    ['Radio', camper.radio],
    ['Refrigerator', camper.refrigerator],
    ['Microwave', camper.microwave],
    ['Gas', camper.gas],
    ['Water', camper.water],
  ];

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Features</h3>

      <ul className="grid grid-cols-2 gap-2">
        {list
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => (
            <li key={k} className="text-sm">
              <strong>{k}:</strong> {String(v)}
            </li>
          ))}
      </ul>
    </div>
  );
}
