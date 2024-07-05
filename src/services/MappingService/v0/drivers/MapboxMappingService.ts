import { MappingService } from '@/services/MappingService/v0';

export function createMapBoxMappingService(): MappingService {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    if (!MAPBOX_API_KEY) {
        throw TypeError("process.env.MAPBOX_API_KEY is missing")
    }
    return {
        placeMarker(lng, lat) {
            return '';
        },
        removeMarker(id) { },
        placeRoute(a, b) {
            return ''
        },
        removeRoute(id) { }
    }
}