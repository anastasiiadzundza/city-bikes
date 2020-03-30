import React, {FunctionComponent} from 'react';
import * as actions from '../../store/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import './CompanyList.scss';
import {Dropdown, Icon} from 'semantic-ui-react';
import {Company} from './../../store/types';
import {map} from "lodash";
import storageService from './../../services/storage.service';

interface RootState {
    companies: Company[],
}

const CompanyList: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();

    const companies = useSelector((store: RootState) => store.companies);

    const selectCompany = id => {
        storageService().setWidget(id);
        dispatch(actions.getBikeNetworkDetails(id));
    };

    const renderList = () => {
        return map(companies, company => (
            <Dropdown.Item onClick={() => selectCompany(company.id)} key={company.id}>
                <span>{company.name}</span> <span>  <Icon name='map marker alternate'/> {company.city}</span>
            </Dropdown.Item>))
    };

    return (<div className="company-list">
        <Dropdown icon='plus'>
            <Dropdown.Menu>
                {renderList()}
            </Dropdown.Menu>
        </Dropdown>
    </div>)
};

export default CompanyList;