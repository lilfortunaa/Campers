'use client';

import Image from "next/image";
import Link from "next/link";
import styles from './Card.module.css';
import { Camper } from "@/types/camper";
import { useFavorites } from "@/store/useFavorites";
import { useCampers } from "@/store/useCampers";
import { CampersFilters } from "@/types/filters";

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  const toggle = useFavorites(s => s.toggleFavorite);
  const isFav = useFavorites(s => Boolean(s.favorites?.[camper.id]));
  const { filters } = useCampers(); // выбранные фильтры из сайдбара

  const image = camper.gallery?.[0]?.thumb || '/placeholder.jpg';

  const filterMap: Partial<Record<keyof CampersFilters, { label: string; icon: string }>> = {
    AC: { label: 'AC', icon: 'wind' },
    kitchen: { label: 'Kitchen', icon: 'cup-hot' },
    bathroom: { label: 'Bathroom', icon: 'ph_shower' },
    TV: { label: 'TV', icon: 'tv' },
    radio: { label: 'Radio', icon: 'radio' },
    refrigerator: { label: 'Refrigerator', icon: 'refrigerator' },
    microwave: { label: 'Microwave', icon: 'microwave' },
    gas: { label: 'Gas', icon: 'gas' },
    water: { label: 'Water', icon: 'water' },
    transmission: { label: 'Automatic', icon: 'diagram' },
  };

  const activeFilters = Object.entries(filterMap)
    .filter(([key]) => {
      const k = key as keyof CampersFilters;
      if (k === 'transmission') return filters.transmission === 'automatic' && camper.transmission === 'automatic';
      return filters[k] && camper[k as keyof Camper];
    })
    .map(([, val]) => val);

  if (filters.form && camper.form === filters.form) {
    const formIconsMap: Record<string, string> = {
      panelTruck: 'bi_grid-1x2',
      fullyIntegrated: 'bi_grid',
      alcove: 'bi_grid-3x3-gap',
    };
    activeFilters.push({ label: filters.form, icon: formIconsMap[filters.form] });
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles['header-right']}>
            <p className={styles.price}>{camper.price.toFixed(2)} ₴</p>
            <button
              className={`${styles.favButton}`}
              onClick={() => toggle(camper)}
              aria-label="Add to favorites"
            >
              <svg width="26" height="24" fill={isFav ? "red" : "black"}>
                <use href="/icons/symbol-defs.svg#icon-Property-1pressed" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${styles.location} ${styles.info}`}>
          <span className={styles.rating}>
            <svg width="16" height="16" fill="#FFC107" style={{ marginRight: '4px' }}>
              <use href="/icons/symbol-defs.svg#icon-Property-1Pressed-star" />
            </svg>
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles['location-text']}>
            <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" style={{ marginRight: '4px' }}>
              <use href="/icons/symbol-defs.svg#icon-Map" />
            </svg>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>
          {camper.description}
        </p>

        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilters.map(filter => (
              <span key={filter.label}>
                <svg width="16" height="16">
                  <use href={`/icons/symbol-defs.svg#icon-${filter.icon}`} />
                </svg>
                <span>{filter.label}</span>
              </span>
            ))}
          </div>
        )}

        <Link href={`/catalog/${camper.id}`}>
          <button className={styles.showMoreButton}>
            Show more
          </button>
        </Link>
      </div>
    </article>
  );
}
