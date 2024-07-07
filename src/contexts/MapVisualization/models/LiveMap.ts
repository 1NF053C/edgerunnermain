import { Coordinates } from "../../Shared/values/Coordinates";
import { ZoomLevel } from "./values/ZoomLevel";
import { PublicToken } from '@/contexts/MapVisualization/models/values/PublicToken';

export interface LiveMap {
    id: string,
    currentCoordinates: Coordinates,
    startingZoom: ZoomLevel,
    publicToken: PublicToken
}
