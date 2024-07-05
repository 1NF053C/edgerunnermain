import { googleGeocode } from "./googleGeocode";

export async function googleNearbySearch(query: string) {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")

    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const location = await googleGeocode();
    const queryString = `location=${location}&radius=5000&keyword=pharmacy&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await fetch(`${baseUrl}?${queryString}`);
        const data = await response.json();
        const { results } = data;

        if (results && results.length > 0) {
            return results;
        } else {
            console.log('No results found.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching results:', error);
        return [];
    }
}
