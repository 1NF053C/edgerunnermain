import { CurrentlyHiringService } from '@/services/CurrentlyHiringService/v0';

export function createApiNameCurrentlyHiringService(): CurrentlyHiringService {
    const API_NAME_API_KEY = process.env.API_NAME_API_KEY;
    if (!API_NAME_API_KEY) {
        throw TypeError("process.env.API_NAME_API_KEY is missing")
    }
    return {
        getCurrentlyHiringPois() {
            return []
        }
    }
}
