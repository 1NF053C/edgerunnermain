"use client";
import { useContext, useEffect } from "react";
import { LiveMap } from "../../models/LiveMap";
import { StateContext } from "../utils/StateProvider";
import { useData } from "./actions";

export interface State {
    data: LiveMap | null,
    loading: boolean,
    error: null | any[]
}

export const initialState: State = {
    data: null,
    loading: false,
    error: null
};

export const useMapVisualizationState = (): State => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within a StateProvider');
    }

    useData();

    return context;
};
