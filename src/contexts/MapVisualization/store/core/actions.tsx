"use client";

import { useEffect } from 'react';
import { useCommit } from '../utils/useCommit';
import { createZoomLevel } from '../../models/values/ZoomLevel';
import useSWR from 'swr';
import { Coordinates, PlaceOfInterest } from '@/contexts/Shared';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useData = () => {
    const commit = useCommit();

    const { data: locData, isLoading: locLoading, error: locError } = useSWR('/api/current-location', fetcher);
    const { data: tokData, isLoading: tokLoading, error: tokError } = useSWR('/api/mapbox-access-token', fetcher);
    const { data: poiData, isLoading: poiLoading, error: poiError } = useSWR('/api/running-shoe-pois', fetcher);

    function createGetRoutePath(currentLocation: Coordinates, poiData: PlaceOfInterest[]) {
        const coordPairs = poiData.map(poi => ({ start: currentLocation, end: poi.coordinates }))
        return `/api/route?coordPairs=${encodeURIComponent(JSON.stringify(coordPairs))}`
    }

    const { data: routeData, isLoading: routeLoading, error: routeError, mutate: mutateRouteData } = useSWR(
        () => poiData && poiData.length > 0 ? createGetRoutePath(locData, poiData) : null, fetcher);

    const loading = locLoading || tokLoading || poiLoading;
    const error = [locError, tokError, poiError].filter(e => !!e);

    useEffect(() => {
        if (loading) {
            commit('SET_LOADING', true);
        } else if (error.length > 0) {
            error.forEach(e => commit('APPEND_ERROR', e));
        } else if (locData && tokData && poiData) {

            mutateRouteData();

            if (routeData && !routeLoading) {
                console.log(routeData);
                commit('SET_DATA', {
                    id: "tbd",
                    startingZoom: createZoomLevel(15),
                    currentCoordinates: locData,
                    publicToken: tokData,
                    placesOfInterest: poiData,
                    routeData: routeData
                });
                commit('SET_LOADING', false);
            }
        }
    }, [loading, error.length, locData, tokData, poiData, routeData]);

};
