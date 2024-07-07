import { Route } from '@/contexts/Shared/models/Route';
import { PlaceOfInterest } from '@/contexts/Shared/models/PlaceOfInterest';

export interface Priority {
    name: string,
    placeOfInterest: PlaceOfInterest,
    activeRoute: Route
}
