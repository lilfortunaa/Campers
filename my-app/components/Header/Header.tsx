'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <svg className={styles.logoSvg} width="136" height="15">
                <use href="/icons/symbol-defs.svg#icon-Logo" />
          </svg>
        </Link>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${
              pathname === item.href ? styles.active : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{ width: '80px' }}></div>
    </header>
  );
}

