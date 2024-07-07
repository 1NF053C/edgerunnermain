import { useContext } from "react";
import { LiveMap } from "../../models/LiveMap";
import { StateContext } from "../utils/StateProvider";
import { useActions } from "./actions";

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
    const { fetchData } = useActions();

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within a StateProvider');
    }

    fetchData();

    return context;
};
