export function PoiListContainer({ data }: any) {
    return <PoiList data={data} />
}

interface PoiListProps {
    data: any[]
}

export function PoiList({ data }: PoiListProps) {
    return <ul>
        {data.map(item => <li key={item.name}>{JSON.stringify(item, null, 2)}</li>)}
    </ul>
}
