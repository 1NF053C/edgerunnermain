"use client";

import { MapVisualization, useMapVisualizationState } from '@/contexts/MapVisualization';

export function MapVisualizationContainer() {
    const { data, loading, error } = useMapVisualizationState();

    if (loading) return <div>loading...</div>;
    if (!data) return <div>no data</div>;
    if (error) return <div>error</div>;

    return (
        <MapVisualization data={data} />
    );
}
