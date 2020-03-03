import { combineReducers } from 'redux';
import { Company, WidgetData} from '../types';

const initialStateCompanies: Company[] | [] = [];

const companies = (state = initialStateCompanies, action) => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return [
                ...action.companies
            ];
        default:
            return state;
    }
};

const initialStateWidget: WidgetData[] | [] = [];

const widgetData = (state = initialStateWidget, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return [
                ...state,
                action.data
            ];
        case 'REMOVE_WIDGET':
            return removeWidget(action.companyId, state);
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

function removeWidget(companyId, widgetData) {
    const copiedData = JSON.parse(JSON.stringify(widgetData));
    console.log(copiedData.filter(widget => (widget.id !== companyId)));
    return copiedData.filter(widget => (widget.id !== companyId));
};

export const rootReducer = combineReducers({
    companies,
    widgetData,
    isSignedIn
});

export type RootState = ReturnType<typeof rootReducer>