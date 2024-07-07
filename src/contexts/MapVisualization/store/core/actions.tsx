"use client";
import useSWR from 'swr';
import { useCommit } from '../utils/useCommit';
import { createZoomLevel } from '../../models/values/ZoomLevel';

export const useActions = () => {
    const commit = useCommit();

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: loc, error: locError } = { data: {}, error: null } // useSWR('/api/current-location', fetcher);
    const { data: tok, error: tokError } = { data: {}, error: null } // useSWR('/api/mapbox-access-token', fetcher);

    const fetchData = async () => {
        const loading = !loc || !tok;
        if (loading) commit('SET_LOADING', true);

        [locError, tokError].filter(e => !!e).map(e => commit('APPEND_ERROR', e))

        if (!loading) {
            // commit('SET_DATA', {
            //     id: "tbd",
            //     startingZoom: createZoomLevel(10),
            //     currentCoordinates: loc,
            //     publicToken: tok
            // });
            commit('SET_LOADING', false);
        }
    };

    return { fetchData };
};
