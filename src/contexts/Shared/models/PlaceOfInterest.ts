import { Address } from '@/contexts/Shared/values/Address'
import { Coordinates } from '@/contexts/Shared/values/Coordinates'

export interface PlaceOfInterest {
    id: string,
    name: string,
    description: string,
    address: Address,
    coordinates: Coordinates
}
