import { createStore } from 'zustand';

type FetchMethod = () => Promise<Response>;

type DataStore = {
    data: any,
    loading: boolean,
    error: any,
    fetchData: () => Promise<void>
}

export const useDataStore = (fetchMethod: FetchMethod) => createStore(set => ({
    data: null,
    loading: false,
    error: null,
    fetchData: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchMethod();
            set({ data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
