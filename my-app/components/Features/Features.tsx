// 'use client';

// import { Camper } from '@/types/camper';
// import styles from './Features.module.css';

// export default function Features({ camper }: { camper: Camper }) {
//   const featureMap: Record<string, { label: string; icon: string }> = {
//     AC: { label: 'AC', icon: 'wind' },
//     kitchen: { label: 'Kitchen', icon: 'cup-hot' },
//     bathroom: { label: 'Bathroom', icon: 'ph_shower' },
//     TV: { label: 'TV', icon: 'tv' },
//     radio: { label: 'Radio', icon: 'ui-radios' },
//     refrigerator: { label: 'Refrigerator', icon: 'solar_fridge-outline' },
//     microwave: { label: 'Microwave', icon: 'microwave' },
//     gas: { label: 'Gas', icon: 'hugeicons_gas-stove' },
//     water: { label: 'Water', icon: 'water-outline' },
//     transmission: { label: 'Automatic', icon: 'diagram' },
//   };

//   const activeFilters = Object.entries(featureMap)
//     .filter(([key]) => {
//       const k = key as keyof Camper;

//       if (key === 'transmission') {
//         return camper.transmission === 'automatic';
//       }

//       return Boolean(camper[k]);
//     })
//     .map(([, value]) => value);

//   if (!activeFilters.length) return null;

//   return (
//     <div>
//       <div className={styles.activeFilters}>
//         {activeFilters.map((filter) => (
//           <span key={filter.label}>
//             <svg>
//               <use href={`/icons/symbol-defs.svg#icon-${filter.icon}`} />
//             </svg>
//             {filter.label}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import { Camper } from '@/types/camper';
import styles from './Features.module.css';

type Feature = {
  label: string;
  icon: string;
};

export default function Features({ camper }: { camper: Camper }) {
  // Булевые фильтры + transmission
  const booleanFeatures: Record<string, Feature> = {
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

  // Собираем активные фильтры
  const activeFilters: Feature[] = Object.entries(booleanFeatures)
    .filter(([key,]) => {
      if (key === 'transmission') return camper.transmission === 'automatic';
      return Boolean(camper[key as keyof Camper]);
    })
    .map(([, value]) => value);

  // Двигатель (engine)
  if (camper.engine) {
    const engineIcon = camper.engine === 'diesel' ? 'petrol' : 'petrol'; // можешь подставить разные иконки, если есть
    activeFilters.push({
      label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
      icon: engineIcon,
    });
  }

  if (!activeFilters.length) return null;

  return (
    <div>
      <div className={styles.activeFilters}>
        {activeFilters.map((filter) => (
          <span key={filter.label} className={styles.feature}>
            <svg className={styles.featureIcon}>
              <use href={`/icons/symbol-defs.svg#icon-${filter.icon}`} />
            </svg>
            {filter.label}
          </span>
        ))}
      </div>
    </div>
  );
}
