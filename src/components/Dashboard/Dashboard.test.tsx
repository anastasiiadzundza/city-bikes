import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WidgetData} from '../../store/types';

configure({ adapter: new Adapter() });

const widgetData: WidgetData[] = [{
    id: '1',
    name: 'name',
    city: 'city',
    stations: [],
}];

describe('Dashboard', () => {
    test('render properly', () => {
        const wrapper = shallow(<Dashboard  widgetData={widgetData} getCompanies={() => {}} getBikeNetworkDetails={() => {}}/>);

        expect(wrapper.find('.dashboard-view')).toHaveLength(1);
        expect(wrapper.find('SignOutButton')).toHaveLength(1);
        expect(wrapper.find('CompanyList')).toHaveLength(1);
        expect(wrapper.find('Widget')).toHaveLength(1);
    });
});
