"use client";

import { useEffect, useState } from "react";
import { getCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import Details from "@/components/Details/Details";
import Features from "@/components/Features/Features";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import Form from "@/components/Form/Form";

export default function CamperPage({ params }: { params: { id: string } }) {
  const [camper, setCamper] = useState<Camper | null>(null);
  const [tab, setTab] = useState<"features" | "reviews">("features");

  useEffect(() => {
    getCamperById(params.id).then(setCamper);
  }, [params.id]);

  if (!camper) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Заголовок и цена */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="text-2xl font-bold">{camper.name}</h1>
        <p className="text-xl font-semibold">{camper.price} ₴</p>
      </header>

      {/* Галерея */}
      <Gallery camper={camper} />

      {/* Вкладки Features / Reviews */}
      <div className="flex gap-4 border-b">
        <button
          className={`py-2 ${tab === "features" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setTab("features")}
        >
          Features
        </button>
        <button
          className={`py-2 ${tab === "reviews" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Контент вкладки */}
      {tab === "features" && (
        <div className="space-y-4">
          <Features camper={camper} />
          <Details camper={camper} />
        </div>
      )}

      {tab === "reviews" && <Reviews reviews={camper.reviews} />}

      {/* Форма бронирования */}
      <div className="mt-6">
        <Form camperId={camper.id} />
      </div>
    </div>
  );
}
