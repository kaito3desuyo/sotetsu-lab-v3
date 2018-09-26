export class Station {
    id: string;
    stationName: string;
    stationNumbering: string;
    routeId: string;
    operatingKilometers: string;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    Route: {
        id: string
        routeName: string
        sortOrder: number
        createdAt: string
        updatedAt: string
    };
}
