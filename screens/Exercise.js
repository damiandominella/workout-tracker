import React from "react";
import {Button, StyleSheet, View} from 'react-native';
import {Content, Container, Text} from 'native-base';
import * as firebase from 'firebase';
import WeightList from "../components/WeightList";
import 'firebase/firestore';
import {LineChart, Grid, YAxis} from 'react-native-svg-charts'

export default class ExerciseScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Exercise'),
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('WeightForm', {exercise: navigation.getParam('item')})}
                    title="Add"
                />
            ),
        };
    };

    constructor(props) {
        super(props);

        this.exercise = this.props.navigation.getParam('item');

        this.ref = firebase.firestore()
            .doc('workouts/' + this.exercise.workoutKey + '/exercises/' + this.exercise.key);

        this.unsubscribe = null;

        this.state = {
            loading: true,
            data: [],
            weights: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.collection('weights').orderBy("createdAt", "asc").onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = [];
        const weights = [];
        querySnapshot.forEach((doc) => {
            const {value, createdAt, unitMeasure} = doc.data();
            data.push({
                key: doc.id,
                createdAt,
                value,
                unitMeasure
            });

            weights.push(value);
        });

        this.setState({
            data,
            weights,
            loading: false,
        });

        console.log(this.state.weights);
    };

    onEdit(weight) {
        console.log('on edit: ' + weight);

        this.props.navigation.navigate('WeightForm', {
            exercise: this.exercise,
            weight: weight
        });
    }

    onDelete(key) {
        console.log('on delete: ' + key);

        this.ref.collection('weights').doc(key).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

    render() {

        const data = [30, 40, 50, 60, 70, 50, 80];
        const contentInset = {top: 20, bottom: 20};

        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <Text style={styles.title}>Your progress</Text>
                        <View style={{height: 200, flexDirection: 'row'}}>
                            <YAxis
                                data={data}
                                contentInset={contentInset}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                            />
                            <LineChart
                                style={{flex: 1, marginLeft: 16}}
                                data={data}
                                svg={{stroke: 'rgb(134, 65, 244)'}}
                                contentInset={contentInset}
                            >
                                <Grid/>
                            </LineChart>
                        </View>
                    </View>

                    <View styles={{marginTop: 24}}>
                        <Text style={[styles.title, {marginLeft: 16}]}>Weights</Text>
                        <WeightList
                            onEdit={(entity) => this.onEdit(entity)}
                            onDelete={(key) => this.onDelete(key)}
                            data={this.state.data}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});