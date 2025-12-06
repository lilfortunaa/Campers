import axios from "axios";
import { Camper, CampersResponse } from "@/types/camper";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export type CampersParams = {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
};


export const getCampers = async (
  params?: CampersParams
): Promise<CampersResponse> => {
  try {
    const res = await api.get("", { params });

    return {
      items: res.data.items,
      total: res.data.total,
    };
  } catch (error: unknown) {
  
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {

        return { items: [], total: 0 };
      } else {
        console.error("Axios error:", error.message);
        return { items: [], total: 0 };
      }
    }

    console.error("Unknown error:", error);
    return { items: [], total: 0 };
  }
};


export const getCamperById = async (id: string): Promise<Camper | null> => {
  try {
    const res = await api.get(`/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching camper by ID:", error);
    return null;
  }
};

