import React from 'react';
import {StyleSheet} from 'react-native';
import {SwipeRow, Button, Text, View, Icon} from 'native-base';

export default class WeightCard extends React.Component {

    constructor(props) {
        super(props);
    }

    delete() {
        this.props.onDelete(this.props.item.key);
    }

    edit() {
        this.props.onEdit(this.props.item);
    }

    render() {

        let date = new Date(this.props.item.createdAt);

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
                        <Text style={[styles.data, styles.date]}>
                            {date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
                        </Text>
                        <Text style={[styles.data, styles.weight]}>
                            {this.props.item.value} {this.props.item.unitMeasure}
                        </Text>
                    </View>
                }
                right={
                    <Button danger onPress={() => this.delete()}>
                        <Icon active name="trash" />
                    </Button>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -16,
        marginTop: -16,
        marginBottom: -16,
        padding: 16,
    },
    weight: {
        flex: 0.30,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    date: {
        flex: 0.70,
    },
});