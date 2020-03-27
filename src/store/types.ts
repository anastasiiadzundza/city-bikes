export interface Company {
    id: string,
    name: string,
    city: string,
    country: string,
}

export interface Station {
    name: string,
    id: string,
    empty_slots: number,
    free_bikes: number,
    latitude: string,
    longitude: string
}

export interface WidgetData {
    id: string,
    name: string,
    city: string,
    stations: Station[],
}