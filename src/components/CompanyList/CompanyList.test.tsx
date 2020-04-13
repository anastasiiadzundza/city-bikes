import React from 'react';
import { Provider } from "react-redux";
import { Company } from '../../store/types';
import configureStore from 'redux-mock-store';
import CompanyList from './CompanyList';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const companies: Company[] = [
    {id: "bianzone-in-bici", name: "Bianzone in Bici", city: "Bianzone", country: "IT"},
    {id: "bici-in-busto", name: "Bici in Busto", city: "Busto Arsizio", country: "IT"},
    {id: "bicilascondes", name: "Bici las Condes", city: "Las Condes", country: "CL"}];

let wrapper;
let store;

beforeEach(() => {
    store = configureStore()({
        companies,
    });

    wrapper = mount(<Provider store={store}><CompanyList /></Provider>);
});

describe('CompanyList', () => {
    test('renders properly', () => {
        expect(wrapper.find('.company-list')).toHaveLength(1);
        expect(wrapper.find('Icon')).toHaveLength(4);
    });
});
