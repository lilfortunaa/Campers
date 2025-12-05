import { getCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import Gallery from "@/components/Gallery/Gallery";
import Form from "@/components/Form/Form";
import CamperTabs from "@/components/Tabs/Tabs"; // клиентская вкладка
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CamperPage({ params }: PageProps) {
  const { id } = await params;

  let camper: Camper | null = null;

  try {
    camper = await getCamperById(id);
  } catch (err) {
    console.error("Failed to fetch camper:", err);
  }

  if (!camper) {
    return (
      <div className={styles.container}>
        <h1>Camper not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <svg width="16" height="16" fill="#FFC107" style={{ marginRight: '4px' }}>
              <use href="/icons/symbol-defs.svg#icon-Property-1Pressed-star" />
            </svg>
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>

          <span className={styles.locationText}>
            <svg width="16" height="16" fill="none" stroke="#000" strokeWidth="2" style={{ marginRight: '4px' }}>
              <use href="/icons/symbol-defs.svg#icon-Map" />
            </svg>
            {camper.location}
          </span>
        </div>

        <div className={styles.price}>€{camper.price.toFixed(2)}</div>
      </div>

      <Gallery camper={camper} />
      <p className={styles.description}>{camper.description}</p>

      <div className={styles.bottom}>
        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <CamperTabs camper={camper} />
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          <Form camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
