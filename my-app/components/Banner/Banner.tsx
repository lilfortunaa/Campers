'use client';
import Link from 'next/link';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.bannerOverlay}></div>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>Campers of your dreams</h1>
        <p className={styles.bannerText}>You can find everything you want in our catalog</p>
        <Link href="/catalog" className={styles.bannerButton}>
          View Now
        </Link>
      </div>
    </section>
  );
}
