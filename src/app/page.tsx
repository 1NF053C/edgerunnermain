import styles from "./page.module.css";
import { MapVisualizationStateProvider, MapVisualizationContainer } from '@/contexts/MapVisualization';

export default async function Home() {
  return (
    <MapVisualizationStateProvider>
      <main className={styles.main}>
        <div className={styles.center}>
          <MapVisualizationContainer />
        </div>
      </main>
    </MapVisualizationStateProvider>
  );
}
