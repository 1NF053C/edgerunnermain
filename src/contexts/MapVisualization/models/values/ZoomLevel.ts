export type ZoomLevel = number & { readonly brand: unique symbol };

export const createZoomLevel = (value: number): ZoomLevel => {
    if (value < 1 || value > 15) {
        throw new Error('Value must be between 1 and 15');
    }
    return value as ZoomLevel;
};
