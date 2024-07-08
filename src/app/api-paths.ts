export const HOST_PORT = `${process.env.HOST}:${process.env.PORT || 3000}`;

export const PLACES_PATH = `${HOST_PORT}/api/places`;
export const PLACES_WITH_ID_PATH = (placeId: number) => `${HOST_PORT}${PLACES_PATH}/${placeId}`;
