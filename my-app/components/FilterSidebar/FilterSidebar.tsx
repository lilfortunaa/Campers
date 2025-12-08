'use client';

import { useState, ChangeEvent } from 'react';
import { useCampers } from '@/store/useCampers';
import { CampersFilters } from '@/types/filters';
import styles from './FilterSidebar.module.css';

export default function FilterSidebar() {
  const { setFilters } = useCampers();

  const [localFilters, setLocalFilters] = useState({
    location: '',
    form: '',
    AC: false,
    automatic: false,
    kitchen: false,
    bathroom: false,
    TV: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setLocalFilters((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setLocalFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRadioClick = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      form: prev.form === value ? '' : value,
    }));
  };

  const applyFilters = async () => {
    const filters: CampersFilters = {};

    if (localFilters.location) filters.location = localFilters.location;
    if (localFilters.form) filters.form = localFilters.form;
    if (localFilters.AC) filters.AC = true;
    if (localFilters.kitchen) filters.kitchen = true;
    if (localFilters.bathroom) filters.bathroom = true;
    if (localFilters.TV) filters.TV = true;
    if (localFilters.automatic) filters.transmission = 'automatic';

    await setFilters(filters);
  };

  const resetFilters = async () => {
    setLocalFilters({
      location: '',
      form: '',
      AC: false,
      automatic: false,
      kitchen: false,
      bathroom: false,
      TV: false,
    });
    await setFilters({});
  };

  return (
    <aside className={styles.sidebar}>

      <div>
        <p className={styles.title}>Location</p>
        <div className={styles.locationInput}>
          <svg className={styles.icon}>
            <use href="/icons/symbol-defs.svg#icon-Map" />
          </svg>
          <input
            type="text"
            name="location"
            value={localFilters.location}
            onChange={handleChange}
            className={styles.input}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>

      <div>
        <p className={styles.title}>Filters</p>

        <p className={styles.subtitle}>Vehicle equipment</p>

        <div className={styles.iconGrid}>
          {['AC', 'automatic', 'kitchen', 'TV', 'bathroom'].map((key) => (
            <button
              key={key}
              className={`${styles.iconBtn} ${localFilters[key as keyof typeof localFilters] ? styles.active : ''}`}
              onClick={() =>
                key === 'automatic'
                  ? setLocalFilters((prev) => ({ ...prev, automatic: !prev.automatic }))
                  : setLocalFilters((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
              }
            >
              <svg>
                <use href={`/icons/symbol-defs.svg#icon-${key === 'automatic' ? 'diagram' : key === 'AC' ? 'wind' : key === 'kitchen' ? 'cup-hot' : key === 'TV' ? 'tv' : 'ph_shower'}`} />
              </svg>
              <span>{key === 'AC' ? 'AC' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </button>
          ))}
        </div>

        <p className={styles.subtitle}>Vehicle type</p>

        <div className={styles.iconGrid}>
          {[
            { value: 'panelTruck', label: 'Van', icon: 'bi_grid-1x2' },
            { value: 'fullyIntegrated', label: 'Fully Integrated', icon: 'bi_grid' },
            { value: 'alcove', label: 'Alcove', icon: 'bi_grid-3x3-gap' },
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              className={`${styles.iconBtn} ${localFilters.form === value ? styles.active : ''}`}
              onClick={() => handleRadioClick(value)}
            >
              <svg><use href={`/icons/symbol-defs.svg#icon-${icon}`} /></svg>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

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
