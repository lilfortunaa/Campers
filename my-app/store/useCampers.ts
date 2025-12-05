// import { create } from "zustand";
// import { getCampers, CampersParams } from "@/lib/api";
// import { Camper, CampersResponse } from "@/types/camper";
// import { CampersFilters } from "@/types/filters";

// type CampersState = {
//   items: Camper[];
//   total: number;
//   page: number;
//   limit: number;
//   isLoading: boolean;
//   filters: CampersFilters;

//   fetchInitial: () => Promise<void>;
//   loadMore: () => Promise<void>;
//   setFilters: (filters: CampersFilters) => Promise<void>;
// };

// export const useCampers = create<CampersState>((set, get) => ({
//   items: [],
//   total: 0,
//   page: 1,
//   limit: 4,
//   isLoading: false,
//   filters: {},

//   fetchInitial: async () => {
//     set({ isLoading: true, items: [], page: 1 });

//     const { filters, limit } = get();


//     const params: CampersParams = {
//       ...filters,
//       page: 1,
//       limit,
//     };

//     try {
//       const data: CampersResponse = await getCampers(params);
//       console.log("Fetched campers:", data);
//       set({
//         items: data.items,
//         total: data.total,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching campers:", error);
//       set({ isLoading: false });
//     }
//   },

//   loadMore: async () => {
//     const { page, limit, filters, items } = get();
//     const nextPage = page + 1;

//     set({ isLoading: true });

//     const params: CampersParams = {
//       ...filters,
//       page: nextPage,
//       limit,
//     };

//     try {
//       const data: CampersResponse = await getCampers(params);
//       set({
//         items: [...items, ...data.items],
//         page: nextPage,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Error loading more campers:", error);
//       set({ isLoading: false });
//     }
//   },

//   setFilters: async (newFilters: CampersFilters) => {
//     set({
//       filters: newFilters,
//       items: [],
//       page: 1,
//     });

//     await get().fetchInitial();
//   },
// }));

import { create } from "zustand";
import axios from "axios";
import { getCampers, CampersParams } from "@/lib/api";
import { Camper, CampersResponse } from "@/types/camper";
import { CampersFilters } from "@/types/filters";

type CampersState = {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  filters: CampersFilters;
  error: boolean;

  fetchInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
  setFilters: (filters: CampersFilters) => Promise<void>;
};

export const useCampers = create<CampersState>((set, get) => ({
  items: [],
  total: 0,
  page: 1,
  limit: 4,
  isLoading: false,
  filters: {},
  error: false,

  fetchInitial: async () => {
    set({ isLoading: true, items: [], page: 1, error: false });

    const { filters, limit } = get();

    const params: CampersParams = {
      ...filters,
      page: 1,
      limit,
    };

    try {
      const data: CampersResponse = await getCampers(params);

      set({
        items: data.items,
        total: data.total,
        isLoading: false,
        error: false,
        page: 1,
      });
    } catch (error: unknown) {
      // Проверка на AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // Сервер не нашёл совпадений — пустой результат
          set({ items: [], total: 0, isLoading: false, error: false });
        } else {
          console.error("Axios error:", error.message);
          set({ isLoading: false, error: true });
        }
      } else {
        console.error("Unknown error:", error);
        set({ isLoading: false, error: true });
      }
    }
  },

  loadMore: async () => {
    const { page, limit, filters, items } = get();
    const nextPage = page + 1;

    set({ isLoading: true, error: false });

    const params: CampersParams = {
      ...filters,
      page: nextPage,
      limit,
    };

    try {
      const data: CampersResponse = await getCampers(params);

      set({
        items: [...items, ...data.items],
        page: nextPage,
        isLoading: false,
        error: false,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // Пустая страница
          set({ isLoading: false, error: false });
        } else {
          console.error("Axios error:", error.message);
          set({ isLoading: false, error: true });
        }
      } else {
        console.error("Unknown error:", error);
        set({ isLoading: false, error: true });
      }
    }
  },

  setFilters: async (newFilters: CampersFilters) => {
    set({ filters: newFilters, items: [], page: 1 });
    await get().fetchInitial();
  },
}));

