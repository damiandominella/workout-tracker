import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default class WorkoutCard extends React.Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#f5f5f5'}
                onPress={() => this._onPress()}
            >
                <View style={styles.container}>

                    <Image source={{uri: this.props.item.image}} style={styles.image}/>


                    <Text style={styles.title}>
                        {this.props.item.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _onPress() {
        console.log('test');
        this.props.navigation.navigate('Workout', {item: this.props.item, title: this.props.item.name});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    title: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    image: {
        borderRadius: 10,
        flex: 1,
        height: 200,
    },
});