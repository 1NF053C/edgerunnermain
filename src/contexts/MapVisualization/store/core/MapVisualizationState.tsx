"use client";

import { useContext } from "react";
import { LiveMap, MapVisualizationStateContext } from '@/contexts/MapVisualization'
import { useData } from "./actions";

export interface MapVisualizationState {
    data: LiveMap | null,
    loading: boolean,
    error: null | any[]
}

export const initialState: MapVisualizationState = {
    data: null,
    loading: false,
    error: null
};

export const useMapVisualizationState = (): MapVisualizationState => {
    const context = useContext(MapVisualizationStateContext);
    if (!context) {
        throw new Error('useMapVisualizationState must be used within a MapVisualizationStateProvider');
    }

    useData();

    return context;
};
