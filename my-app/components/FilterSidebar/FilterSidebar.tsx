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

    await setFilters(filters); 
  };

  const resetFilters = async () => {
    setLocation('');
    setForm('');
    setAC(false);
    setKitchen(false);
    setBathroom(false);
    setTV(false);
    await setFilters({}); 
  };

  return (
    <div className={styles.sidebar}>
      
      <div className={styles.field}>
        <label className={styles.label}>Location</label>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          className={styles.input}
          placeholder="Kyiv"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Тип кузова</label>
        <select
          value={form}
          onChange={e => setForm(e.target.value)}
          className={styles.select}
        >
          <option value="">Всі</option>
          <option value="alcove">Alcove</option>
          <option value="panelTruck">Panel Truck</option>
          <option value="fullyIntegrated">Fully Integrated</option>
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={AC} onChange={e => setAC(e.target.checked)} />
          AC
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={kitchen} onChange={e => setKitchen(e.target.checked)} />
          Kitchen
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={bathroom} onChange={e => setBathroom(e.target.checked)} />
          Bathroom
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={TV} onChange={e => setTV(e.target.checked)} />
          TV
        </label>
      </div>

      <div className={styles.buttons}>
        <button onClick={applyFilters} className={`${styles.button} ${styles.buttonApply}`}>
          Search
        </button>
        <button onClick={resetFilters} className={`${styles.button} ${styles.buttonReset}`}>
          Скинути
        </button>
      </div>

    </div>
  );
}

