import { MappingService } from '@/server/services/MappingService/v0';

export function createMapBoxMappingService(): MappingService {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
    if (!MAPBOX_API_KEY) {
        throw TypeError("process.env.MAPBOX_API_KEY is missing");
    }
    return {
        async getRoute(start, end) {
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/walking/${start.lat},${start.lng};${end.lat},${end.lng}?steps=true&geometries=geojson&access_token=${MAPBOX_API_KEY}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            return geojson;
        }
    }
}
