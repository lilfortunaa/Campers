// 'use client';
// import { useState } from 'react';
// import { Camper } from '@/types/camper';
// import Features from '@/components/Features/Features';
// import Details from '@/components/Details/Details';
// import Reviews from '@/components/Reviews/Reviews';

// export default function CamperTabs({ camper }: { camper: Camper }) {
//   const [tab, setTab] = useState<'features' | 'details' | 'reviews'>('features');

//   return (
//     <div>
//       <div className="flex gap-4 mb-4">
//         <button onClick={() => setTab('features')} className={tab === 'features' ? 'font-bold' : 'text-gray-500'}>Features</button>
//         <button onClick={() => setTab('details')} className={tab === 'details' ? 'font-bold' : 'text-gray-500'}>Details</button>
//         <button onClick={() => setTab('reviews')} className={tab === 'reviews' ? 'font-bold' : 'text-gray-500'}>Reviews</button>
//       </div>
//       <div>
//         {tab === 'features' && <Features camper={camper} />}
//         {tab === 'details' && <Details camper={camper} />}
//         {tab === 'reviews' && <Reviews reviews={camper.reviews} />}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Camper } from '@/types/camper';
import Features from '@/components/Features/Features';
import Reviews from '@/components/Reviews/Reviews';

export default function CamperTabs({ camper }: { camper: Camper }) {
  const [tab, setTab] = useState<'features' | 'reviews'>('features');

  return (
    <div>
      {/* TABS HEADER */}
      <div className="flex gap-8 border-b mb-6">
        <button
          onClick={() => setTab('features')}
          className={`pb-3 ${
            tab === 'features'
              ? 'font-semibold border-b-2 border-red-500'
              : 'text-gray-500'
          }`}
        >
          Features
        </button>

        <button
          onClick={() => setTab('reviews')}
          className={`pb-3 ${
            tab === 'reviews'
              ? 'font-semibold border-b-2 border-red-500'
              : 'text-gray-500'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* TABS CONTENT */}
      <div>
        {tab === 'features' && <Features camper={camper} />}
        {tab === 'reviews' && <Reviews reviews={camper.reviews} />}
      </div>
    </div>
  );
}

