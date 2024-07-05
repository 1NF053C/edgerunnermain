"use client";

import { useEffect, useState } from "react";

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

interface PoiListProps {
    data: any[]
}

export function PoiList({ data }: PoiListProps) {
    if (data.length === 0) return <div>empty list</div>
    return (
        <ul>
            {data.map((item, i) => <li key={i}>{JSON.stringify(item, null, 2)}</li>)}
        </ul>
    )
}
