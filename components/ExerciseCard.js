import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {SwipeRow, Button, Text, View, Icon} from 'native-base';


export default class ExerciseCard extends React.Component {

    constructor(props) {
        super(props);
    }

    delete() {
        this.props.onDelete(this.props.item.key);
    }

    edit() {
        this.props.onEdit(this.props.item);
    }

    onPress() {
        this.props.navigation.navigate('Exercise', {item: this.props.item, title: this.props.item.name});
    }

    render() {
        return (
            <SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                    <Button info onPress={() => this.edit()}>
                        <Icon active name="create" />
                    </Button>
                }
                body={
                    <View style={styles.container}>
                        <TouchableHighlight
                            underlayColor={'#f5f5f5'}
                            onPress={() => this.onPress()}
                        >
                            <View style={styles.itemContainer}>
                                <Text style={[styles.data, styles.name]}>
                                    {this.props.item.name}
                                </Text>
                                <Text style={[styles.data, styles.total]}>
                                    {this.props.item.volume}
                                </Text>
                                <Text style={[styles.data, styles.rec]}>
                                    {this.props.item.rest}
                                </Text>
                                <Text style={[styles.data, styles.weight]}>
                                    {this.props.item.lastWeight} {this.props.item.lastWeightUnitMeasure}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
                right={
                    <Button danger onPress={() => this.delete()}>
                        <Icon active name="trash"/>
                    </Button>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    data: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    total: {
        flex: 0.15,
        textAlign: 'right',
    },
    weight: {
        flex: 0.20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    rec: {
        flex: 0.20,
        textAlign: 'right',
    },
    name: {
        flex: 0.45,
        paddingRight: 8,
        borderRightWidth: 1,
        fontWeight: 'bold',
    }
});