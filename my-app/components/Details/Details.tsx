'use client';
import { Camper } from '@/types/camper';
import styles from './Details.module.css';

export default function Details({ camper }: { camper: Camper }) {
  const details: [string, string | number | undefined][] = [
    ['Form', camper.form],
    ['Length', camper.length],
    ['Width', camper.width],
    ['Height', camper.height],
    ['Tank', camper.tank],
    ['Consumption', camper.consumption],
  ];

  return (
    <div className={styles.details}>
      <h3 className={styles.title}>Vehicle details</h3>

      <ul className={styles.list}>
        {details
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => (
            <li key={k} className={styles.item}>
              <strong className={styles.label}>{k}:</strong>
              <span className={styles.value}>{v}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
