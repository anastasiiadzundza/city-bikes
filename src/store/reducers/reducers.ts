import { combineReducers } from 'redux';
import { Company, Station} from '../types';


const initialStateCompanies: Company[] | [] = [];

const companies = (state = initialStateCompanies, action) => {
    switch (action.type) {
        case 'ADD_COMPANY':
            return [
                ...state,
                action.company
            ];
        case 'REMOVE_COMPANY':
            return removeCompany(action.id, state);
        default:
            return state;
    }
};

const initialStateStations: Station[] | [] = [];

const stations = (state = initialStateStations, action) => {
    switch (action.type) {
        case 'ADD_STATIONS':
            return [
                ...state,
                ...action.stations
            ];
        case 'REMOVE_STATIONS':
            return removeStations(action.companyId, state);
        default:
            return state;
    }
};

const initialIsSignedIn: boolean = false;

const isSignedIn = (state = initialIsSignedIn, action) => {
    switch (action.type) {
        case 'SET_IF_SIGNED_IN':
            return action.isSignedIn;
        default:
            return state;
    }
};

function removeCompany(id, companies) {
    const copiedCompanies = JSON.parse(JSON.stringify(companies));
    const index = copiedCompanies.findIndex((company) => (company.id === id));
    return copiedCompanies.splice(index, 1)
};

function removeStations(companyId, stations) {
    const copiedStations = JSON.parse(JSON.stringify(stations));
    return copiedStations.filter(station => (station.id !== companyId));
};

export const rootReducer = combineReducers({
    companies,
    stations,
    isSignedIn
});

export type RootState = ReturnType<typeof rootReducer>