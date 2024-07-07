import { PlaceOfInterest } from '@/contexts/Shared';
import { RunningService } from '@/server/services/RunningService/v0';
import { googleGeocode } from '@/utils/googleGeocode';
import { Client } from "@googlemaps/google-maps-services-js";

export async function createGoogleMapsRunningService(): Promise<RunningService> {

    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
        throw TypeError('process.env.GOOGLE_MAPS_API_KEY is invalid');
    }

    return {
        async getRunningShoePois() {
            try {
                const client = new Client({});
                const loc = await googleGeocode();
                const response = await client.placesNearby({
                    params: {
                        location: `${loc.lat},${loc.lng}`,
                        radius: 5000,
                        keyword: "running shoe stores",
                        key: GOOGLE_MAPS_API_KEY
                    }
                });
                
                // translate google api response to this context's PlaceOfInterest model
                const results: PlaceOfInterest[] = response.data.results.map(result => {
                    return {
                        id: String(result.place_id),
                        name: String(result.name),
                        description: String(result.editorial_summary),
                        address: {
                            street: {
                                number: 0,
                                name: '',
                                unit: ''
                            },
                            formatted: String(result.formatted_address)
                        },
                        coordinates: {
                            lng: result.geometry ? result.geometry.location.lng : NaN,
                            lat: result.geometry ? result.geometry.location.lat : NaN
                        }
                    }
                });
                return results;
            } catch (err) {
                throw err;
            }
        }
    }
}
