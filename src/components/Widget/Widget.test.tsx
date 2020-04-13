import React from 'react';
import * as reactRedux from "react-redux";
import { Company, WidgetData } from '../../store/types';
import configureStore from 'redux-mock-store';
import Widget from './Widget';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const companies: Company[] = [
    {id: "bianzone-in-bici", name: "Bianzone in Bici", city: "Bianzone", country: "IT"},
    {id: "bici-in-busto", name: "Bici in Busto", city: "Busto Arsizio", country: "IT"},
    {id: "bicilascondes", name: "Bici las Condes", city: "Las Condes", country: "CL"}];


const widgetData: WidgetData = {
    id: '1',
    name: 'name',
    city: 'city',
    stations: [
        {
            name: 'BikeSt',
            id: '0',
            empty_slots: 5,
            free_bikes: 3,
            latitude: '32.6',
            longitude: '43.7'
        },
        {
            name: 'BikeSt2',
            id: '5',
            empty_slots: 7,
            free_bikes: 2,
            latitude: '36.6',
            longitude: '93.7'
        }
    ],
};

jest.mock('react-redux', () => ({
    useDispatch: () => ({
        push: jest.fn(),
    }),
}));


jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => {});

let wrapper;
let store;

beforeEach(() => {
    store = configureStore()({
        companies,
        widgetData
    });

    wrapper = mount(<Widget company={widgetData}/>);
});

describe('CompanyList', () => {
    test('renders properly', () => {
        expect(wrapper.find('.station-name')).toHaveLength(2);
        expect(wrapper.find('Icon').last().hasClass('remove-button')).toBeTruthy();
    });
});
