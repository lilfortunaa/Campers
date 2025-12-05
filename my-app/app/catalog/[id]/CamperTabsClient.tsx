// 'use client';

// import { useState } from 'react';
// import { Camper } from '@/types/camper';
// import TabsHeader from '@/components/TabsHeader/TabsHeader';
// import TabsContent from '@/components/TabsContent/TabsContent';

// export default function CamperTabsClient({ camper }: { camper: Camper }) {
//   const [tab, setTab] = useState<'features' | 'reviews'>('features');

//   return (
//     <>
//       {/* HEADER ВНЕ left */}
//       <TabsHeader tab={tab} setTab={setTab} />

//       {/* CONTENT ПЕРЕДАЁТСЯ В left */}
//       <TabsContent tab={tab} camper={camper} />
//     </>
//   );
// }


'use client';

import { useState } from 'react';
import { Camper } from '@/types/camper';
import TabsContent from '../../../components/TabsContent/TabsContent';
import styles from '../../../components/Tabs/Tabs.module.css';

export default function CamperTabsClient({ camper }: { camper: Camper }) {
  const [tab, setTab] = useState<'features' | 'reviews'>('features');

  return (
    <>
      {/* TABS HEADER над колонками */}
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tab} ${tab === 'features' ? styles.active : ''}`}
          onClick={() => setTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${tab === 'reviews' ? styles.active : ''}`}
          onClick={() => setTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Контент вкладок рендерится в левой колонке */}
      <TabsContent camper={camper} tab={tab} />
    </>
  );
}

