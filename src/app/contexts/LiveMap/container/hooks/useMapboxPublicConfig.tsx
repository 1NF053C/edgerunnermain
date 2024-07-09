"use client";

import useSWR from "swr";
import { MapboxPublicConfigService } from "@/utils/ApiClientFactory";

export function useMapboxPublicConfig() {
    const mapboxPublicConfigService = new MapboxPublicConfigService();
    return useSWR('mbConfigCacheKey', async () => mapboxPublicConfigService.findAll(), { refreshInterval: 20000 });
}
