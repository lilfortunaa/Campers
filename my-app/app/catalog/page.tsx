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

  const hasMore = items.length < total;

  return (
    <section>
      <div className={styles.catalogLayout}>
        <FilterSidebar />

        <main className={styles.camperListMain}>
          <div className={styles.camperListWrapper}>
            {isLoading && items.length === 0 && (
              <p className={styles.noResultsText}>Loading campers...</p>
            )}

            {!isLoading && Array.isArray(items) && items.length > 0 && (
              <>
  
                <div className={styles.camperList}>
                  {items.map((camper) => (
                    <Card key={camper.id} camper={camper} />
                  ))}
                </div>

                {hasMore && (
                  <div className={styles.loadMoreContainer}>
                    <button
                      type="button"
                      className={styles.loadMoreButton}
                      onClick={loadMore}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}

            {!isLoading && items.length === 0 && (
              <div className={styles.centerBox}>
                <p className={styles.noResultsText}>No campers found</p>
                <button
                  className={styles.resetButton}
                  onClick={() => window.location.reload()}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

