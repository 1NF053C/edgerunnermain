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
            return route;
        }
    }
}

/*
// example client side usage
// const geojson = {
//     type: 'Feature',
//     properties: {},
//     geometry: {
//         type: 'LineString',
//         coordinates: route // <----------- api response
//     }
// };
// Add the route to the map
map.on('load', async () => {
    const routeData = await getRoute(start, end);

    map.addLayer({
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: routeData
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
        }
    });

    // Fit the map to the route
    const coordinates = routeData.geometry.coordinates;
    const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
        padding: 50
    });
});
*/