import { Station } from '../classes/station';

export const STATIONS: Station[] = [
    {
        id: '66e5debc-26d0-40a1-9d33-d61ad6877747',
        stationName: '横浜',
        stationNumbering: 'SO01',
        routeId: 'db745f3f-f20c-46c4-a410-9435d7ae8a86',
        operatingKilometers: '0.0',
        sortOrder: 1,
        createdAt: '2018-09-10T07:11:24.790Z',
        updatedAt: '2018-09-10T07:11:24.790Z',
        Route: {
            id: 'db745f3f-f20c-46c4-a410-9435d7ae8a86',
            routeName: '本線',
            sortOrder: 1,
            createdAt: '2018-09-10T07:08:56.693Z',
            updatedAt: '2018-09-10T07:08:56.693Z'
        }
    }
];
