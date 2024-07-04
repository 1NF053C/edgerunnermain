import { PointOfInterest } from "@/utils/PointOfInterest";
import { createApiNameFreeBookService } from "./drivers/ApiNameFreeBookService";

export interface FreeBookService {
    getFreeBookPois: () => PointOfInterest
}

export function createFreeBookService() {
    const FREE_BOOK_SERVICE = process.env.FREE_BOOK_SERVICE;

    if(FREE_BOOK_SERVICE === 'TBD'){
        return createApiNameFreeBookService();
    }
    else {
        throw TypeError('process.env.FREE_BOOK_SERVICE is invalid');
    }
}
