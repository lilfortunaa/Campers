'use client';
import { Camper } from '@/types/camper';

export default function Details({ camper }: { camper: Camper }) {
  const details: [string, string | number | undefined][] = [
    ['Form', camper.form],
    ['Length', camper.length],
    ['Width', camper.width],
    ['Height', camper.height],
    ['Tank', camper.tank],
    ['Consumption', camper.consumption],
  ];

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Details</h4>
      <ul className="space-y-1">
        {details
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => (
            <li key={k} className="text-sm">
              <strong>{k}:</strong> {v}
            </li>
          ))}
      </ul>
    </div>
  );
}
