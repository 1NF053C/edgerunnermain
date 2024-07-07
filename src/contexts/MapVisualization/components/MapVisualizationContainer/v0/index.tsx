"use client";

import { MapVisualization } from '@/contexts/MapVisualization/components/MapVisualizationContainer/v0/MapVisualization';
import { useMapVisualizationState } from '@/contexts/MapVisualization/store';

export function MapVisualizationContainer() {
    const { data, loading, error } = useMapVisualizationState();

    if (loading) return <div>loading...</div>;
    if (!data) return <div>no data</div>;
    if (error) return <div>error</div>;

    return (
        <MapVisualization data={data} />
    );
}
