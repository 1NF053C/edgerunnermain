"use client";

import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";
import useSWR from "swr";

export function useMapboxPublicConfig() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    return useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });
}
