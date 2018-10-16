export class Trip {
    id: string;
    serviceId: string;
    tripNumber: string;
    tripClassId: string;
    tripName: string;
    tripDirectionId: number;
    blockId: string;
    calenderId: string;
    extraCalenderId: string;
    createdAt: string;
    updatedAt: string;
    Times: [
        {
            id: string
            tripId: string
            stopId: string
            stopSequence: number
            pickupType: number
            dropoffType: number
            arrivalDays: number
            arrivalTime: string
            departureDays: number
            departureTime: string
            createdAt: string
            updatedAt: string
            Stop: {
                id: string
                stationId: string
                stopName: string
                stopDescription: string
                createdAt: string
                updatedAt: string
                Station: {
                    id: string
                    stationName: string
                    stationNumbering: string
                    routeId: string
                    operatingKilometers: number
                    sortOrder: number
                    createdAt: string
                    updatedAt: string
                }
            }
        }
    ];
    Calender: {
        id: string
        calenderName: string
        sunday: boolean
        monday: boolean
        tuesday: boolean
        wednesday: boolean
        thursday: boolean
        friday: boolean
        saturday: boolean
        startDate: string
        endDate: string
        createdAt: string
        updatedAt: string
    };
}
