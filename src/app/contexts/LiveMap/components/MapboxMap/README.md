# @1nf053c/mapbox-map

a Reactjs component that renders a mapbox map

<img alt="screenshot of @1nf053c/mapbox-map reactjs component" src="https://github.com/1NF053C/mapbox-map/blob/260260e388031f06e0c9d4b27008175eab3dc9c6/%401nf053c__mapbox-map.png" />

### Getting Started

```sh
npm i @1nf053c/mapbox-map
```
<a href="https://www.npmjs.com/package/@1nf053c/mapbox-map">https://www.npmjs.com/package/@1nf053c/mapbox-map</a>

```tsx
"use client";

import { MapboxMap } from "@1nf053c/mapbox-map";

export function MapboxMapContainer() {

    const config = {
        publicKey="YOUR_MAPBOX_PUBLIC_KEY",
        startLng=50,
        startLat=-51,
        zoomLevel=12
    }

    return <MapboxMap
        publicKey={config.publicKey}
        startLng={config.startLng}
        startLat={config.startLat}
        zoomLevel={config.zoomLevel} 
    />
}

// 1. import MapboxMap component
// 2. Create or fetch your MapboxMap config
// 3. Render MapboxMap component with config
```

### What's Next:

##### Feature extensions with hooks

```tsx
"use client";

import {
    MapboxMap,
    MapboxMapAthleticsAdvisorPlugin,
    MapboxMapRestaurantAdvisorPlugin,
    // ...etc
} from "@1nf053c/mapbox-map";

export function MapboxMapContainer() {

    const config = {
        publicKey="YOUR_MAPBOX_PUBLIC_KEY",
        startLng=50,
        startLat=-51,
        zoomLevel=12
    };

    const plugins = [MapboxMapAthleticsAdvisor, MapboxMapRestaurantAdvisor];
    
    return (
        <MapboxMap
            plugins={plugins}
            publicKey={config.publicKey}
            startLng={config.startLng}
            startLat={config.startLat}
            zoomLevel={config.zoomLevel} 
        />
    );
}
```
