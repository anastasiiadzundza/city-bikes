import {Company, Station} from '../types';

export const addCompany = (company: Company) => ({
    type: 'ADD_COMPANY',
    company,
});

export const removeCompany = (id: string) => ({
    type: 'REMOVE_COMPANY',
    id,
});

export const addStations = (stations: Array<Station>) => ({
    type: 'ADD_STATIONS',
    stations,
});

export const removeStations = (companyId: string) => ({
    type: 'REMOVE_STATIONS',
    companyId,
});

export const setIfSignedIn = (isSignedIn: boolean) => ({
    type: 'SET_IF_SIGNED_IN',
    isSignedIn,
});
