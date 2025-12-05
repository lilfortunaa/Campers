'use client';

import styles from '../Tabs/Tabs.module.css';

interface Props {
  tab: 'features' | 'reviews';
  setTab: (tab: 'features' | 'reviews') => void;
}

export default function TabsHeader({ tab, setTab }: Props) {
  return (
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
  );
}
