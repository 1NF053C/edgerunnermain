"use client";

import React, { createContext, useState, ReactNode } from 'react';
import { State, initialState } from '../core/state';
import { MutationPayloads, mutations, MutationType } from '../core/mutations';

// Create contexts
export const StateContext = createContext<State | undefined>(undefined);
export const CommitContext = createContext<((mutation: MutationType, payload: MutationPayloads[MutationType]) => void) | undefined>(undefined);

// Provider component
interface StateProviderProps {
  children: ReactNode;
}

export type Mutations = {
  [T in MutationType]: (state: State, payload: MutationPayloads[T]) => State;
};

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  // Commit function
  const commit = (mutation: MutationType, payload: MutationPayloads[MutationType]) => {
    console.log("[MUTATION]", mutation, "[PAYLOAD]", payload, "[NEW_STATE]", JSON.stringify(state, null, 2));
    setState((prevState) => mutations[mutation](prevState, payload as any));
  };

  return (
    <StateContext.Provider value={state}>
      <CommitContext.Provider value={commit}>
        {children}
      </CommitContext.Provider>
    </StateContext.Provider>
  );
};
