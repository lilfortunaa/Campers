'use client';

import { useState } from 'react';
import { Camper } from '@/types/camper';
import Features from '@/components/Features/Features';
import Reviews from '@/components/Reviews/Reviews';
import Details from '@/components/Details/Details';
import styles from './Tabs.module.css';

export default function CamperTabs({ camper }: { camper: Camper }) {
  const [tab, setTab] = useState<'features' | 'reviews'>('features');

  return (
    <div className={styles.tabsContainer}>
      {/* TABS HEADER */}
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

      {/* TABS CONTENT */}
      <div className={styles.tabContent}>
        {tab === 'features' && <Features camper={camper} />}
        {tab === 'reviews' && <Reviews reviews={camper.reviews} />}
      </div>

      {/* Details рендерится только на Features */}
      {tab === 'features' && <Details camper={camper} />}
    </div>
  );
}
