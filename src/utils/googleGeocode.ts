import { Coordinates } from '@/contexts/Shared/values/Coordinates'

export async function googleGeocode(): Promise<Coordinates> {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")

    const CITY_STATE = process.env.CITY_STATE;
    if (!CITY_STATE) throw TypeError("process.env.CITY_STATE is missing")

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(CITY_STATE)}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    if (data.status !== 'OK') {
        throw new Error(`Geocoding API error: ${data.status}`);
    }
    const location = data.results[0].geometry.location;
    return {
        lat: location.lat,
        lng: location.lng,
    };
}
