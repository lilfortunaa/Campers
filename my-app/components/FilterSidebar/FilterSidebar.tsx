
'use client';

import { useState } from 'react';
import { useCampers } from '@/store/useCampers';
import { CampersFilters } from '@/types/filters';
import styles from './FilterSidebar.module.css';

export default function FilterSidebar() {
  const { setFilters } = useCampers();

  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [AC, setAC] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [bathroom, setBathroom] = useState(false);
  const [TV, setTV] = useState(false);

  const applyFilters = async () => {
    const filters: CampersFilters = {};

    if (location) filters.location = location;
    if (form) filters.form = form;
    if (AC) filters.AC = true;
    if (kitchen) filters.kitchen = true;
    if (bathroom) filters.bathroom = true;
    if (TV) filters.TV = true;
    if (automatic) filters.transmission = 'automatic';

    await setFilters(filters);
  };

  const resetFilters = async () => {
    setLocation('');
    setForm('');
    setAC(false);
    setAutomatic(false);
    setKitchen(false);
    setBathroom(false);
    setTV(false);
    await setFilters({});
  };

  return (
    <aside className={styles.sidebar}>

      {/* LOCATION */}
      <div>
        <p className={styles.title}>Location</p>
        <div className={styles.locationInput}>
          <svg className={styles.icon}>
            <use href="/icons/symbol-defs.svg#icon-Map" />
          </svg>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={styles.input}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div>
        <p className={styles.title}>Filters</p>

        {/* VEHICLE EQUIPMENT */}
        <p className={styles.subtitle}>Vehicle equipment</p>

        <div className={styles.iconGrid}>

          <button
            className={`${styles.iconBtn} ${AC ? styles.active : ''}`}
            onClick={() => setAC(prev => !prev)}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-wind" /></svg>
            <span>AC</span>
          </button>

          <button
            className={`${styles.iconBtn} ${automatic ? styles.active : ''}`}
            onClick={() => setAutomatic(prev => !prev)}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-diagram" /></svg>
            <span>Automatic</span>
          </button>

          <button
            className={`${styles.iconBtn} ${kitchen ? styles.active : ''}`}
            onClick={() => setKitchen(prev => !prev)}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-cup-hot" /></svg>
            <span>Kitchen</span>
          </button>

          <button
            className={`${styles.iconBtn} ${TV ? styles.active : ''}`}
            onClick={() => setTV(prev => !prev)}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-tv" /></svg>
            <span>TV</span>
          </button>

          <button
            className={`${styles.iconBtn} ${bathroom ? styles.active : ''}`}
            onClick={() => setBathroom(prev => !prev)}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-ph_shower" /></svg>
            <span>Bathroom</span>
          </button>

        </div>

        {/* VEHICLE TYPE */}
        <p className={styles.subtitle}>Vehicle type</p>

        <div className={styles.iconGrid}>

          <button
            className={`${styles.iconBtn} ${form === 'panelTruck' ? styles.active : ''}`}
            onClick={() => setForm('panelTruck')}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-bi_grid-1x2" /></svg>
            <span>Van</span>
          </button>

          <button
            className={`${styles.iconBtn} ${form === 'fullyIntegrated' ? styles.active : ''}`}
            onClick={() => setForm('fullyIntegrated')}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-bi_grid" /></svg>
            <span>Fully Integrated</span>
          </button>

          <button
            className={`${styles.iconBtn} ${form === 'alcove' ? styles.active : ''}`}
            onClick={() => setForm('alcove')}
          >
            <svg><use href="/icons/symbol-defs.svg#icon-bi_grid-3x3-gap" /></svg>
            <span>Alcove</span>
          </button>

        </div>
      </div>

      {/* BUTTONS */}
      <div className={styles.buttons}>
        <button onClick={applyFilters} className={styles.applyBtn}>
          Search
        </button>

        <button onClick={resetFilters} className={styles.resetBtn}>
          Reset
        </button>
      </div>

    </aside>
  );
}
