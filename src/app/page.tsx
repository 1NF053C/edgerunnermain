import styles from "./page.module.css";
import { MapContainer } from "@/contexts/MapVisualization/components/MapContainer/v0";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <MapContainer />
      </div>
    </main>
  );
}
