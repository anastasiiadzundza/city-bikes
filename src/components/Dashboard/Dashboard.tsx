import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import './Dashboard.scss';
import * as actions from '../../store/actions/actions';
import { Grid } from 'semantic-ui-react';
import Widget from './../Widget/Widget';
import CompanyList from './../CompanyList/CompanyList';
import SignOutButton from './../SignOutButton/SignOutButton';
import { WidgetData } from './../../store/types';
import { map } from "lodash";
import storageService from './../../services/storage.service';
import { Offline } from "react-detect-offline";

interface RootState {
    widgetData: WidgetData[],
}

const mapStateToProps = (state: RootState) => ({
    widgetData: state.widgetData,
});

const dispatchProps = {
    getCompanies: actions.getCompanies,
    getBikeNetworkDetails: actions.getBikeNetworkDetails,
};

const connector = connect(mapStateToProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export class Dashboard extends React.Component<PropsFromRedux, {}> {

    interval: any;

    updateWidgetData = () => {
        const widgetIds = storageService().getWidgetIds();
        if (widgetIds.length) {
            map(widgetIds, id => {
                this.props.getBikeNetworkDetails(id)
            });
        }
    };

    componentDidMount() {
        this.props.getCompanies();

        this.updateWidgetData();
        this.interval = setInterval(() => {
            this.updateWidgetData()
        }, 1000 * 10);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderWidgets = () => {
        return map(this.props.widgetData, (company) => {
            return <Grid.Column key={company.id}>
                <Widget company={company}></Widget>
            </Grid.Column>
        });
    };

    render () {
        return (
            <div>
                <div className="offline-string">
                    <Offline>You have no internet connection</Offline>
                </div>
                <div className="dashboard-view">
                    <div className="side-buttons">
                        <CompanyList></CompanyList>
                        <SignOutButton></SignOutButton>
                    </div>
                    <div className="widgets">
                        <Grid columns={3}>
                            {this.renderWidgets()}
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    dispatchProps
)(Dashboard);