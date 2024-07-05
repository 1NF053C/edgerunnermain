import { FreeBookService } from '..';

export function createApiNameFreeBookService(): FreeBookService {
    const API_NAME_API_KEY = process.env.API_NAME_API_KEY;
    if (!API_NAME_API_KEY) {
        throw TypeError("process.env.API_NAME_API_KEY is missing")
    }
    return {
        getFreeBookPois() {
            return []
        }
    }
}
