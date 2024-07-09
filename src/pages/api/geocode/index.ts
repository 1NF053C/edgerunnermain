import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getCoords(req, res)
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getCoords(_req: NextApiRequest, res: NextApiResponse) {
    const CITY_STATE = process.env.CITY_STATE;
    if (!CITY_STATE) throw TypeError('process.env.CITY_STATE is invalid');

    const coords = await googleGeocode(CITY_STATE);
    res.status(200).json(coords)
}

export async function googleGeocode(cityState: string): Promise<any> {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) throw TypeError("process.env.GOOGLE_MAPS_API_KEY is missing")

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityState)}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(geocodingUrl);
    const location = response.data.results[0].geometry.location;
    return {
        lat: location.lat,
        lng: location.lng,
    };
}
