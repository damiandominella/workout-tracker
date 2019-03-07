import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

export default class WorkoutCard extends React.Component {

    render() {
        return (
            <View style={styles.card}>
                <View style={{borderRadius: 10, overflow: 'hidden'}}>
                    <TouchableHighlight
                        underlayColor={'#f5f5f5'}
                        onPress={() => this._onPress()}
                    >
                        <View style={styles.cardContent}>
                            <Image source={{uri: this.props.item.image}} style={styles.image}/>
                            <Text style={styles.name}>
                                {this.props.item.name}
                            </Text>
                            <Text style={styles.title}>
                                {this.props.item.description}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _onPress() {
        console.log('test');
        this.props.navigation.navigate('Workout', {item: this.props.item, title: this.props.item.name});
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 16,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    cardContent: {
        backgroundColor: '#ffffff',
        padding: 16
    },
    name: {
        marginTop: 16,
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#777',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    image: {
        marginTop: -16,
        marginLeft: -16,
        marginRight: -16,
        flex: 1,
        height: 200,
    },
});