'use client';

import { useState, useRef, useLayoutEffect } from "react";
import { Camper } from "@/types/camper";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";
import BookingForm from "../Form/Form";
import styles from "./CamperInfo.module.css";

type Props = {
  camper: Camper;
};

export default function CamperInfo({ camper }: Props) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const capitalizeFirstLetter = (str?: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useLayoutEffect(() => {
    if (!tabsRef.current) return;
    const buttons = tabsRef.current.querySelectorAll<HTMLButtonElement>("button");
    const activeButton = activeTab === "features" ? buttons[0] : buttons[1];
    if (activeButton) {
      requestAnimationFrame(() => {
        setUnderlineStyle({
          width: `${activeButton.offsetWidth}px`,
          transform: `translateX(${activeButton.offsetLeft}px)`,
          transition: "transform 0.3s ease, width 0.3s ease",
        });
      });
    }
  }, [activeTab]);

  return (
    <div className={styles.infoSection}>

      <div className={styles.tabs} ref={tabsRef}>
        <button
          className={`${styles.tabButton} ${activeTab === "features" ? styles.active : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <span className={styles.underline} style={underlineStyle} />
      </div>


      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          {activeTab === "features" && (
            <div className={styles.featuresContainer}>

              <Features camper={camper} />


              <div className={styles.vehicleDetailsSection}>
                <h2 className={styles.featureTitle}>Vehicle details</h2>
                <ul className={styles.vehicleDetailsList}>
                  {camper.form && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Form</p>
                      <span>{capitalizeFirstLetter(camper.form)}</span>
                    </li>
                  )}
                  {camper.length && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Length</p>
                      <span>{camper.length}</span>
                    </li>
                  )}
                  {camper.width && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Width</p>
                      <span>{camper.width}</span>
                    </li>
                  )}
                  {camper.height && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Height</p>
                      <span>{camper.height}</span>
                    </li>
                  )}
                  {camper.tank && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Tank</p>
                      <span>{camper.tank}</span>
                    </li>
                  )}
                  {camper.consumption && (
                    <li className={styles.vehicleDetailsItem}>
                      <p>Consumption</p>
                      <span>{camper.consumption}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "reviews" && <Reviews reviews={camper.reviews} />}
        </div>

        <div className={styles.rightColumn}>
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}


