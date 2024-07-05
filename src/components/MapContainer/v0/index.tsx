"use client";

import { useEffect, useState } from "react";

export function MapContainer() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch('/api/default-pois')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                throw error;
            });
    }, []);

    if (data) return <Map data={data} />
    else if (loading) return <div>loading...</div>
    else return <div>error</div>
}

interface MapProps {
    data: any[]
}

export function Map({ data }: MapProps) {
    if (data.length === 0) return <div>empty map</div>
    return <div>{data.map(item => <div>item</div>)}</div>
}
