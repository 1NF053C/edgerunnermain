"use client";

import { useMapbox } from "../../hooks/useMapbox";

export function LiveMapContainer() {

    //const {mapRef, MapContainer} = useMapbox();

    const loading = false;
    const error = false;
    const data = 'test';

    if (loading) return <div>loading...</div>;
    if (!data) return <div>no data</div>;
    if (error) return <div>error</div>;

    return (
        <div>{data}</div>
    );
}
