# store design version 0

- the `useMapVisualizationState()` feature is nice to use

- `useActions` and `useCommit` are nice in isolation but not convenient to discover

- `store/*` implementations are not convenient to maintain

Design Principles:

- discovering how to use this context's state, actions, and mutations should be simple
- extending this context's state and then updating useData hook subsequently as needed should be simple
- extending actions should be simple
- extending committed mutations within an action should be simple
- extendng mutation types should be simple
- should be able to debug a method's internals without getting lost in store files
- set up other context's providers in uniform way so dev doesnt need to worry about more boilerplate in order to use a context's state, actions, and mutations
