import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import WeightCard from './WeightCard';

export default class WeightList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
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
});