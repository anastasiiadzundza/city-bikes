import { Company } from '../types';
import bikesService from './../../services/bikes.service';

export const setCompanies = (companies: Company[]) => ({
    type: 'SET_COMPANIES',
    companies,
});

export const addWidget = (data: any) => ({
    type: 'ADD_WIDGET',
    data,
});

export const removeWidget = (companyId: string) => ({
    type: 'REMOVE_WIDGET',
    companyId,
});

export const clearWidgetData = () => {
    return {
        type: 'CLEAR_WIDGET_DATA',
    }
};

const sort = (items): any => {
    return items.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        
        return 0;
    });
};

export const getCompanies = () => {
    return async dispatch => {
        const companies = await bikesService().getCompanies();
        dispatch(setCompanies(sort(companies)));
    }
};

export const getBikeNetworkDetails = (id: string) => {
    return async dispatch => {
        const network = await bikesService().getBikeNetworkDetails(id);
        dispatch(addWidget(network));
    }
};


