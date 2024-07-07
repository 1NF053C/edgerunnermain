import { Mutations } from '../utils/MapVisualizationStateProvider';
import { MapVisualizationState } from './state';

export type MutationType = 'SET_DATA' | 'SET_LOADING' | 'APPEND_ERROR'

export type MutationPayloads = {
  SET_DATA: MapVisualizationState['data'];
  SET_LOADING: boolean;
  APPEND_ERROR: any
};

export const mutations: Mutations = {
  SET_DATA: (state, payload) => ({ ...state, data: payload }),
  SET_LOADING: (state, payload) => ({ ...state, loading: payload }),
  APPEND_ERROR: (state, payload) => ({ ...state, error: state.error ? state.error.concat(payload) : [] })
};
