import { Coordinates } from '../values/Coordinates'

export interface Route {
    id: string,
    title: string,
    start: Coordinates,
    end: Coordinates
}
