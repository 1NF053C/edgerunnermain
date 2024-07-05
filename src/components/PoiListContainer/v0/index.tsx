"use client";

import { useEffect, useState } from "react";
import { PoiList } from "./PoiList";

export function PoiListContainer() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        fetch('/api/pharmacy-pois')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                throw error;
            });
    }, [])

    if (data) return <PoiList data={data} />
    else if (loading) return <div>loading...</div>
    else return <div>error</div>
}
