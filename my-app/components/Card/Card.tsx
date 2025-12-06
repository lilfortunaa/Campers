"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Link from "next/link";
import { Camper } from "@/types/camper";
import SpriteIcon from "../SpriteIcon/SpriteIcon";
import { useFavorites } from "@/store/useFavorites";

interface CardProps {
  camper: Camper;
}

export default function Card({ camper }: CardProps) {
  const totalReviews = camper.reviews.length;

  const toggleFavorite = useFavorites((state) => state.toggleFavorite);
  const favorites = useFavorites((state) => state.favorites);
  const isFavorite = favorites.includes(camper.id);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = () => {
    toggleFavorite(camper.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.gallery[0]?.thumb || "/placeholder.jpg"}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.rightSidePrice}>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            <button
              type="button"
              className={`${styles.favoriteBtn} ${isAnimating ? styles.animateHeart : ""}`}
              onClick={handleFavoriteClick}
            >
              <SpriteIcon
                className={styles.filterIconSvgHeart}
                name="icon-Property-1Default"
                color={isFavorite ? "#e44848" : "#000"}
              />
            </button>
          </div>
        </div>

        <div className={styles.ratingLocation}>
          <span className={styles.rating}>
            <SpriteIcon className={styles.filterIconSvg} name="icon-Property-1Pressed-star"/>
            {camper.rating} (Total reviews: {totalReviews})
          </span>

          <span className={styles.location}>
            <SpriteIcon className={styles.filterIconSvg} name="icon-Map" color="#000"/>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.AC && (
            <span className={styles.feature}>
              <SpriteIcon className={styles.featureIcon} name="icon-wind" />
              AC
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.feature}>
              <SpriteIcon className={styles.featureIcon} name="icon-cup-hot" />
              Kitchen
            </span>
          )}
          {camper.TV && (
            <span className={styles.feature}>
              <SpriteIcon className={styles.featureIcon} name="icon-tv" />
              TV
            </span>
          )}
          {camper.bathroom && (
            <span className={styles.feature}>
              <SpriteIcon className={styles.featureIcon} name="icon-ph_shower" />
              Bathroom
            </span>
          )}
          {camper.transmission === "automatic" && (
            <span className={styles.feature}>
              <SpriteIcon className={styles.featureIcon} name="icon-diagram" />
              Automatic
            </span>
          )}
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.showMoreBtn}>
          Show more
        </Link>
      </div>
    </article>
  );
}
