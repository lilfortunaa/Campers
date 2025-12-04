// 'use client';

// import { Camper } from '@/types/camper';

// export default function Features({ camper }: { camper: Camper }) {
//   const list: [string, string | number | boolean | undefined][] = [
//     ['Transmission', camper.transmission],
//     ['Engine', camper.engine],
//     ['AC', camper.AC],
//     ['Bathroom', camper.bathroom],
//     ['Kitchen', camper.kitchen],
//     ['TV', camper.TV],
//     ['Radio', camper.radio],
//     ['Refrigerator', camper.refrigerator],
//     ['Microwave', camper.microwave],
//     ['Gas', camper.gas],
//     ['Water', camper.water],
//   ];

//   return (
//     <div className="mt-4">
//       <h3 className="text-xl font-semibold mb-2">Features</h3>

//       <ul className="grid grid-cols-2 gap-2">
//         {list
//           .filter(([, v]) => v !== undefined && v !== null)
//           .map(([k, v]) => (
//             <li key={k} className="text-sm">
//               <strong>{k}:</strong> {String(v)}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

'use client';

import { Camper } from '@/types/camper';
import styles from './Features.module.css';

export default function Features({ camper }: { camper: Camper }) {
  const featureMap: Record<string, { label: string; icon: string }> = {
    AC: { label: 'AC', icon: 'wind' },
    kitchen: { label: 'Kitchen', icon: 'cup-hot' },
    bathroom: { label: 'Bathroom', icon: 'ph_shower' },
    TV: { label: 'TV', icon: 'tv' },
    radio: { label: 'Radio', icon: 'ui-radios' },
    refrigerator: { label: 'Refrigerator', icon: 'solar_fridge-outline' },
    microwave: { label: 'Microwave', icon: 'microwave' },
    gas: { label: 'Gas', icon: 'hugeicons_gas-stove' },
    water: { label: 'Water', icon: 'water-outline' },
    transmission: { label: 'Automatic', icon: 'diagram' },
  };

  const activeFilters = Object.entries(featureMap)
    .filter(([key]) => {
      const k = key as keyof Camper;

      if (key === 'transmission') {
        return camper.transmission === 'automatic';
      }

      return Boolean(camper[k]);
    })
    .map(([, value]) => value);

  if (!activeFilters.length) return null;

  return (
    <div>
      <div className={styles.activeFilters}>
        {activeFilters.map((filter) => (
          <span key={filter.label}>
            <svg>
              <use href={`/icons/symbol-defs.svg#icon-${filter.icon}`} />
            </svg>
            {filter.label}
          </span>
        ))}
      </div>
    </div>
  );
}
