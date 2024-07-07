"use client";
import { useContext, useEffect } from "react";
import { LiveMap } from "../../models/LiveMap";
import { StateContext } from "../utils/StateProvider";
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
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within a StateProvider');
    }

    useData();

    return context;
};
