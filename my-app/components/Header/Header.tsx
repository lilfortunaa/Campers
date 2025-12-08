'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

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

     
      <button className={styles.burger} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </button>

   
      {isOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMenu} 
        >
     
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ''
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
