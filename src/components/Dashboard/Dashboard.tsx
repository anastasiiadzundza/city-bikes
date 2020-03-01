import React, { FunctionComponent } from 'react';
import './Dashboard.scss';
import * as actions from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Grid } from 'semantic-ui-react';
import Widget from './../Widget/Widget';
import CompanyList from './../CompanyList/CompanyList';
import signInService from './../../services/sign-in.service';
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

    const renderWidgets = () => {
        return map(storeState.widgetData, (company) => {
            return <Grid.Column key={company.id}>
                <Widget company={company}></Widget>
            </Grid.Column>
        });
    };

    const signOut = () => {
        signInService().signOut()
            .then(() => {
                dispatch(actions.setIfSignedIn(false));
                history.push("/dashboard")
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