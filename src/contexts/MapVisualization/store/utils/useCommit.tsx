import { useContext } from "react";
import { MutationPayloads, MutationType } from '../core/mutations';
import { CommitContext } from "./StateProvider";

export const useCommit = (): (<T extends MutationType>(mutation: T, payload: MutationPayloads[T]) => void) => {
    const context = useContext(CommitContext);
    if (!context) {
        throw new Error('useCommit must be used within a StateProvider');
    }
    return context as <T extends MutationType>(mutation: T, payload: MutationPayloads[T]) => void;
};
