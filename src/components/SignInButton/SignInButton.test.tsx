import React from 'react';
import { render } from '@testing-library/react';
import SignInButton from './SignInButton';

import * as router from 'react-router-dom';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

let wrapper;

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        push: jest.fn(),
    }),

    useHistory: () => ({
        push: jest.fn(),
    }),
}));

window.gapi = {
  load: jest.fn(),
};

beforeEach(() => {
    jest.spyOn(router, 'useLocation').mockImplementation(() => {});
    jest.spyOn(router, 'useHistory').mockImplementation(() => {});

    wrapper = mount(<SignInButton />);
});

describe('SignInButton', () => {
    test('renders properly', () => {
        expect(wrapper.find('.signin-button')).toHaveLength(1);
        expect(wrapper.find('.signin-button')).toHaveLength(1);
    });
});