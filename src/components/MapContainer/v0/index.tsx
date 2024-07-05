"use client";

import { useEffect, useState } from "react";
import { Map } from './Map';

export function MapContainer() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        setData([])
        // fetch('/api/running-shoe-pois')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setData(data);
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //         throw error;
        //     });
    }, []);

    if (data && Array.isArray(data)) return <Map data={data} />
    else if (loading) return <div>loading...</div>
    return <div>error</div>
}
