import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import ExerciseCard from './ExerciseCard';

export default class ExerciseList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Exercises</Text>
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16
    }
});