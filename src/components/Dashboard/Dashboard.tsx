import React, { FunctionComponent, useEffect } from 'react';
import './Dashboard.scss';
import * as actions from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Grid } from 'semantic-ui-react';
import Widget from './../Widget/Widget';
import CompanyList from './../CompanyList/CompanyList';
import googleService from '../../services/google.service';
import { WidgetData } from './../../store/types';
import { map } from "lodash";
import {
    useHistory,
} from "react-router-dom";


interface RootState {
    isSignedIn: boolean,
    widgetData: WidgetData[],
}

const Dashboard: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const storeState = useSelector((store: RootState) => {
        console.log(store);
        return {
            isSignedIn: store.isSignedIn,
            widgetData: store.widgetData,
        };
    });
    
    useEffect(() => {
        dispatch(actions.getCompanies());
    }, []);

    const renderWidgets = () => {
        console.log(storeState.widgetData);
        return map(storeState.widgetData, (company) => {
            return <Grid.Column key={company.id}>
                <Widget company={company}></Widget>
            </Grid.Column>
        });
    };

    const signOut = () => {
        googleService().signOut()
            .then(() => {
                history.push("/signin");
                localStorage.removeItem('userId');
            });
    };
    
    return (
        <div className="dashboard-view">
            <div className="side-buttons">
                <CompanyList></CompanyList>
                <Button circular className="sign-out-button" icon onClick={signOut}>
                    <Icon name='sign-out'/>
                </Button>
            </div>
            <div className="widgets">
                <Grid columns={3}>
                    {renderWidgets()}
                </Grid>
            </div>
        </div>
    );
};



export default Dashboard;