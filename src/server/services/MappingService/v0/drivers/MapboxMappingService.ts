import { MappingService } from '@/server/services/MappingService/v0';

export function createMapBoxMappingService(): MappingService {
    const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
    if (!MAPBOX_ACCESS_TOKEN) {
        throw TypeError("process.env.MAPBOX_ACCESS_TOKEN is missing");
    }
    return {
        async getRoute(start, end) {
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/walking/${start.lng},${start.lat};${end.lng},${end.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            return data;
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