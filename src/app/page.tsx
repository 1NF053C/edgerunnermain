"use client";

import { PoiListContainer } from "@/components/PoiListContainer/v0";
import styles from "./page.module.css";
import { createPharmacyService } from "@/services/PharmacyService/v0";

export default async function Home() {
  const pharmacyService = createPharmacyService();
  const data = await pharmacyService.getPharmacyPois();

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <PoiListContainer data={data} />
      </div>
    </main>
  );
}
