import { useMapVisualizationState } from '@/contexts/MapVisualization/store/core/state';
import { Map } from './Map';

export function MapContainer() {
    const { data, loading, error } = useMapVisualizationState();

    if (loading) return <div>loading...</div>;
    if (!data || error) return <div>error</div>;

    return (
        <Map
            pois={[]}
            startingCoords={data.currentCoordinates}
            startingZoom={data.startingZoom}
            mapboxGlAccessToken={data.publicToken}
        />
    );
}
