import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ExerciseCard from './ExerciseCard';

export default class ExerciseList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={({item}) =>
                        <ExerciseCard
                            onEdit={this.props.onEdit}
                            onDelete={this.props.onDelete}
                            navigation={this.props.navigation}
                            item={item}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});