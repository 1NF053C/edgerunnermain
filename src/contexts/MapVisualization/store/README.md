# store design version 0

- the `useCONTEXTState()` and `useCommit()` features are nice to use

- `store/*` implementations are not convenient to maintain

Design Principles:

- extending actions should be simple
- extending action commits should be simple
- extendng mutation types should be simple
- discovering this context's state, useCONTEXTState(), actions, and mutations should be simple
- should be able to debug a method's internals without getting lost in store files
