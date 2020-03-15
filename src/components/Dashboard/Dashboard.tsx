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

interface RootState {
    widgetData: WidgetData[],
}

const mapStateToProps = (state: RootState) => ({
    widgetData: state.widgetData,
});

const dispatchProps = {
    getCompanies: actions.getCompanies,
};

const connector = connect(mapStateToProps, dispatchProps);

type PropsFromRedux = ConnectedProps<typeof connector>

class Dashboard extends React.Component<PropsFromRedux, {}> {

    componentDidMount() {
        this.props.getCompanies();
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
        )
    }
}

export default connect(
    mapStateToProps,
    dispatchProps
)(Dashboard);