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
        flex: 1,
        marginRight: -16,
        marginTop: -16,
        marginBottom: -16
    },
    itemContainer: {
        padding: 16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    data: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontSize: 14
    },
    total: {
        flex: 0.25,
        textAlign: 'right',
    },
    rec: {
        flex: 0.25,
        textAlign: 'right',
    },
    name: {
        flex: 0.50,
        paddingRight: 8,
        fontWeight: 'bold',
    }
});