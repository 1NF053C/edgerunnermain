import styles from "./page.module.css";
import { StateProvider } from '@/contexts/MapVisualization/store';
import { MapVisualizationContainer } from "@/contexts/MapVisualization/components/MapVisualizationContainer/v0";

export default async function Home() {
  return (
    <StateProvider>
      <main className={styles.main}>
        <div className={styles.center}>
          <MapVisualizationContainer />
        </div>
      </main>
    </StateProvider>
  );
}
