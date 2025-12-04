import { getCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import Gallery from "@/components/Gallery/Gallery";
import Form from "@/components/Form/Form";
import CamperTabs from "@/components/Tabs/Tabs"; // <-- импорт нового компонента

interface PageProps {
  params: { id: string };
}

export default async function CamperPage({ params }: PageProps) {
  const camper: Camper = await getCamperById(params.id);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="text-2xl font-bold">{camper.name}</h1>
        <p className="text-xl font-semibold">{camper.price.toFixed(2)} ₴</p>
      </header>

      <Gallery camper={camper} />

      <CamperTabs camper={camper} /> {/* <-- здесь используем новый компонент */}

      <div className="mt-6">
        <Form camperId={camper.id} />
      </div>
    </div>
  );
}
