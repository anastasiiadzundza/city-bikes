import React, { FunctionComponent } from 'react';
import * as actions from '../../store/actions/actions';
import { useDispatch } from 'react-redux';
import './Widget.scss';
import { Card, Icon } from 'semantic-ui-react';
import { Station } from './../../store/types';
import { map } from "lodash";

interface CompanyWithStations {
    id: string,
    name: string,
    city: string,
    stations: Station[],
}

interface WidgetProps {
    company: CompanyWithStations
}

const Widget: FunctionComponent<WidgetProps> = (props) => {
    
    const dispatch = useDispatch();
    const roundNumber = num => Math.round((num + Number.EPSILON) * 100) / 100;

    const renderStations = () => {
        return map(props.company.stations, (station => (

            <Card.Content key={station.id}>
                <p className="station-name">{station.name} {roundNumber(station.latitude)}<Icon
                    name='map marker alternate'/>{roundNumber(station.longitude)}</p>
                <p><span className="station-prop">empty slots</span> <span>{station.empty_slots}</span></p>
                <p><span className="station-prop">free bikes</span> <span>{station.free_bikes}</span></p>
            </Card.Content>
        )));
    };
     
     const removeWidget = (id) => {
        dispatch(actions.removeWidget(id));
     };

     return (
         <div className="widget">
             <Card>
                 <Card.Content>
                     <Card.Header>{ props.company.city } { `"${props.company.name}"` }</Card.Header>
                 </Card.Content>
                 {renderStations()}
             </Card>
             <Icon className="remove-button" name='close' onClick={() => removeWidget(props.company.id)}/>
         </div>
     );
};

export default Widget;