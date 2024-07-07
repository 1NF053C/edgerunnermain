interface PoiListProps {
    data: any[]
}

export function PoiList({ data }: PoiListProps) {
    if (data.length === 0) return <div>empty list</div>
    return (
        <ul>
            {data.map((item, i) => <PoiListItem key={i} title={"title"} description={"desc"} coords={{ lng: 5, lat: -5 }} streetAddress={"300"} cityState={""} />)}
        </ul>
    )
}

interface Coordinates {
    lng: number,
    lat: number
}

interface PoiListItemProps {
    title: string,
    description: string,
    coords: Coordinates,
    streetAddress: string,
    cityState: string,
}

export function PoiListItem(props: PoiListItemProps) {
    const { title, description, coords, streetAddress, cityState } = props;
    return (
        <li>
            <ul>
                <li>{title}</li>
                <li>{description}</li>
                <li>{coords.lng}, {coords.lat}</li>
                <li>{streetAddress}</li>
                <li>{cityState}</li>
            </ul>
        </li>
    )
}
