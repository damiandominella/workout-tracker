import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import WeightCard from './WeightCard';

export default class WeightList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Weights</Text>
                <FlatList
                    data={this.props.data}
                    renderItem={({item}) => <WeightCard onEdit={this.props.onEdit}
                                                        onDelete={this.props.onDelete}
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