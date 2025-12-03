import axios from "axios";
import { Camper, CampersResponse } from "@/types/camper";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type CampersParams = {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
};

// ✅ СПИСОК КЕМПЕРОВ — ИСПРАВЛЕННЫЙ
export const getCampers = async (
  params?: CampersParams
): Promise<CampersResponse> => {
  const res = await api.get("", { params });

  // ✅ ВАЖНО: бекенд возвращает ОБЪЕКТ, а не массив
  return {
    items: res.data.items,
    total: res.data.total,
  };
};

// ✅ ОДИН КЕМПЕР
export const getCamperById = async (id: string): Promise<Camper> => {
  const res = await api.get(`/${id}`);
  return res.data;
};
