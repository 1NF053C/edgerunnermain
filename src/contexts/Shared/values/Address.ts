export interface Address {
    street: {
        number: number,
        name: string,
        unit?: string
    },
    formatted: string
}
