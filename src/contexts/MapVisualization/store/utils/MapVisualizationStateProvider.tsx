"use client";

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { MapVisualizationState, initialState } from '../core/MapVisualizationState';
import { MutationPayloads, mutations, MutationType } from '../core/mutations';

// Create contexts
export const MapVisualizationStateContext = createContext<MapVisualizationState | undefined>(undefined);
export const CommitContext = createContext<((mutation: MutationType, payload: MutationPayloads[MutationType]) => void) | undefined>(undefined);

// Provider component
interface MapVisualizationStateProvider {
  children: ReactNode;
}

export type Mutations = {
  [T in MutationType]: (state: MapVisualizationState, payload: MutationPayloads[T]) => MapVisualizationState;
};

export const MapVisualizationStateProvider: React.FC<MapVisualizationStateProvider> = ({ children }) => {
  const [state, setState] = useState<MapVisualizationState>(initialState);

  // Commit function
  const commit = useCallback((mutation: MutationType, payload: MutationPayloads[MutationType]) => {
    setState((prevState) => mutations[mutation](prevState, payload as any));
    console.log("[MUTATION]", mutation, "[PAYLOAD]", payload);
  }, []);

  return (
    <MapVisualizationStateContext.Provider value={state}>
      <CommitContext.Provider value={commit}>
        {children}
      </CommitContext.Provider>
    </MapVisualizationStateContext.Provider>
  );
};
