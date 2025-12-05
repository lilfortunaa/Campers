"use client";

import { useEffect } from "react";
import { useCampers } from "@/store/useCampers";
import Card from "@/components/Card/Card";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { items, fetchInitial, loadMore, total, isLoading } = useCampers();

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return (
    <div className={styles.catalogContainer}>
      <FilterSidebar />

      <div className={styles.itemsContainer}>
        {isLoading && items.length === 0 && (
          <p className={styles.message}>Loading campers...</p>
        )}

        {!isLoading && Array.isArray(items) && items.length > 0 && (
          <>
            <div>
              {items.map(camper => (
                <Card key={camper.id} camper={camper} />
              ))}
            </div>

            {items.length < total && (
              <button
                type="button"
                className={styles.showMoreButton}
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}

        {!isLoading && items.length === 0 && (
          <p className={styles.message}>No campers found</p>
        )}
      </div>
    </div>
  );
}

