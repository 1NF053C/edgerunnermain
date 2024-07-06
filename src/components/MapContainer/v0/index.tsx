"use client";

import { useEffect, useState } from "react";
import { Map, MapProps } from './Map';

export function MapContainer() {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [pois, setPois] = useState<any[]>();

    const [data, setData] = useState<MapProps>();

    useEffect(() => {
        const fetchCurrentLocation = () => fetch('/api/current-location')
            .then((res) => res.json())
            .then((coords) => {
                setCurrentLocation(coords);
            })

        const fetchPois = () => fetch('/api/running-shoe-pois')
            .then((res) => res.json())
            .then((pois) => {
                setPois(pois);
            });

        const fetchMapboxToken = () => fetch('/api/mapbox-access-token')
            .then((res) => res.json())
            .then((token) => setAccessToken(token));

        const setLoadingFalse = () => setLoading(false);

        const logErr = (err: any) => console.log(err);

        fetchMapboxToken()
            .then(fetchCurrentLocation)
            .then(fetchPois)
            .then(setLoadingFalse)
            .catch(logErr);
    }, []);

    useEffect(() => {
        if (!loading && accessToken && currentLocation && pois) {
            setData({
                mapboxGlAccessToken: accessToken,
                startingCoords: currentLocation,
                startingZoom: 14,
                pois: pois
            });
        }
    }, [loading])

    if (data) return (
        <Map
            pois={data.pois}
            startingCoords={data.startingCoords}
            startingZoom={data.startingZoom}
            mapboxGlAccessToken={data.mapboxGlAccessToken}
        />
    )
    else if (loading) return <div>loading...</div>
    return <div>error</div>
}
