import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        const current = get().favorites;
        if (current.includes(id)) {
          set({ favorites: current.filter(favId => favId !== id) });
        } else {
          set({ favorites: [...current, id] });
        }
      },
      isFavorite: (id: string) => get().favorites.includes(id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage', 
    }
  )
);
