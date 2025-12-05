'use client';

import { Camper } from '@/types/camper';
import Features from '@/components/Features/Features';
import Reviews from '@/components/Reviews/Reviews';
import Details from '@/components/Details/Details';
import styles from '../Tabs/Tabs.module.css';

interface Props {
  tab: 'features' | 'reviews';
  camper: Camper;
}

export default function TabsContent({ tab, camper }: Props) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabContent}>
        {tab === 'features' && <Features camper={camper} />}
        {tab === 'reviews' && <Reviews reviews={camper.reviews} />}
      </div>

      {tab === 'features' && <Details camper={camper} />}
    </div>
  );
}
