"use client";

import { useEffect } from "react";
import { useCampers } from "@/store/useCampers";
import Card from "@/components/Card/Card";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";

export default function CatalogPage() {
  const { items, fetchInitial, loadMore, total, isLoading } = useCampers();

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <FilterSidebar />

      <div>
        {Array.isArray(items) && items.length > 0 ? (
          <>
            <div>
              {items.map(camper => (
                <Card key={camper.id} camper={camper} />
              ))}
            </div>

            {items.length < total && (
              <button onClick={loadMore} disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        ) : (
          <p>No campers found</p>
        )}
      </div>
    </div>
  );
}
