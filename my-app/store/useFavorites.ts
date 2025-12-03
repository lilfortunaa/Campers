// store/useFavorites.ts
import { create } from 'zustand';
import type { Camper } from '../types/camper'; // или '@/types/camper' если у тебя алиасы

type FavoritesMap = Record<string, Camper>;

type State = {
  favorites: FavoritesMap;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (camper: Camper) => void;
  removeFavorite: (id: string) => void;
  clear: () => void;
};

// Helper: безопасно прочитать из localStorage (SSR-safe)
const readFavoritesFromStorage = (): FavoritesMap => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('favorites');
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FavoritesMap;
    return parsed ?? {};
  } catch {
    return {};
  }
};

// Helper: безопасно записать в localStorage (SSR-safe)
const writeFavoritesToStorage = (favs: FavoritesMap) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('favorites', JSON.stringify(favs));
  } catch {
    // ignore localStorage errors (quota, disabled, etc.)
  }
};

export const useFavorites = create<State>((set, get) => {
  // Инициализируем из localStorage (в момент создания стора на клиенте)
  const initialFavs = readFavoritesFromStorage();

  return {
    favorites: initialFavs,

    isFavorite: (id: string) => {
      const s = get();
      return Boolean(s.favorites[id]);
    },

    toggleFavorite: (camper: Camper) => {
      set((s) => {
        const exists = Boolean(s.favorites[camper.id]);
        const newFavs = { ...s.favorites };
        if (exists) {
          delete newFavs[camper.id];
        } else {
          newFavs[camper.id] = camper;
        }

        // Сразу сохраняем в localStorage
        writeFavoritesToStorage(newFavs);

        return { favorites: newFavs };
      });
    },

    removeFavorite: (id: string) => {
      set((s) => {
        if (!s.favorites[id]) return { favorites: s.favorites };
        const newFavs = { ...s.favorites };
        delete newFavs[id];
        writeFavoritesToStorage(newFavs);
        return { favorites: newFavs };
      });
    },

    clear: () => {
      set(() => {
        writeFavoritesToStorage({});
        return { favorites: {} };
      });
    },
  };
});
