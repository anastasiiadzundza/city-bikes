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
            return addWidget(state, action.data);
        case 'REMOVE_WIDGET':
            return removeWidget(action.companyId, state);
        case 'CLEAR_WIDGET_DATA':
            return [];
        default:
            return state;
    }
};

function addWidget(state, data) {
    const hasState = Array.isArray(state) && state.length;
    const isNewWidget = hasState ? !state.find(el => el.id === data.id) : true;

    if (hasState && isNewWidget) {
        return [...state, data];
    } else if (hasState && !isNewWidget) {
        return [...state];
    } else if (data) {
        return [data];
    }
}

function removeWidget(companyId, widgetData) {
    const copiedData = JSON.parse(JSON.stringify(widgetData));
    return copiedData.filter(widget => (widget.id !== companyId));
};

export const rootReducer = combineReducers({
    companies,
    widgetData,
});
