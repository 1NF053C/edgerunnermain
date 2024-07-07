import styles from "./page.module.css";
import { StateProvider } from '@/contexts/MapVisualization/store';
import { MapContainer } from "@/contexts/MapVisualization/components/MapContainer/v0";

export default async function Home() {
  return (
    <StateProvider>
      <main className={styles.main}>
        <div className={styles.center}>
          <MapContainer />
        </div>
      </main>
    </StateProvider>
  );
}
