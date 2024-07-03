import { createMappingService } from '@/services/MappingService'

export function placeMarker() {
    const mappingService = createMappingService();
    return mappingService.placeMarker;
}
