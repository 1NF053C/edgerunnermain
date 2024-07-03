//import { placeMarker } from './MappingService';

export function MapContainer(){
    // fetch data, handle Success, Loading, and Error states
    const data = "Map data";
    return <Map>{data}</Map>
}

interface MapProps {
    children?: React.ReactNode
}

export function Map(props: MapProps) {
    return <div>MapComponent NYI</div>
}
