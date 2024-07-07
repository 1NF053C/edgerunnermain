import { Coordinates } from "@/contexts/Shared"
import { ZoomLevel } from "@/contexts/MapVisualization";
import { PublicToken } from '@/contexts/MapVisualization';

export interface LiveMap {
    id: string,
    currentCoordinates: Coordinates,
    startingZoom: ZoomLevel,
    publicToken: PublicToken
}
