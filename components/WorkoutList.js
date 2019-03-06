import React from 'react';
import {FlatList} from 'react-native';
import WorkoutCard from './WorkoutCard';

export default class WorkoutList extends React.Component {

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={({item}) => <WorkoutCard navigation={this.props.navigation}
                                                     item={item}/>}
            />
        );
    }
}