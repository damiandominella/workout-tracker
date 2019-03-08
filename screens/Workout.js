import React from "react";
import {Button, StyleSheet, Image} from 'react-native';
import {Content, Container} from 'native-base';
import ExerciseList from "../components/ExerciseList";
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class WorkoutScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Workout'), // 2nd arg is default fallback,
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('ExerciseForm', {workout: navigation.getParam('item')})}
                    title="Add"
                />
            ),
        };
    };

    constructor(props) {
        super(props);

        this.workout = this.props.navigation.getParam('item');

        this.ref = firebase.firestore().doc('workouts/' + this.workout.key).collection('exercises');
        this.unsubscribe = null;

        this.state = {
            workout: this.workout,
            loading: true,
            data: [],
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.orderBy('createdAt', 'asc').onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            const {name, volume, rest} = doc.data();
            data.push({
                key: doc.id,
                workoutKey: this.workout.key,
                name,
                volume,
                rest
            });
        });

        this.setState({
            data,
            loading: false,
        });
    };

    onEdit(exercise) {
        console.log('on edit: ' + exercise);

        this.props.navigation.navigate('ExerciseForm', {
                title: exercise.name,
                workout: this.workout,
                exercise: exercise
            });
    }


    onDelete(key) {
        console.log('on delete: ' + key);

        this.ref.doc(key).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }


    render() {
        return (
            <Container>
                <Content>
                    <Image source={{uri: this.state.workout.image}} style={styles.image}/>
                    <ExerciseList
                        onEdit={(entity) => this.onEdit(entity)}
                        onDelete={(key) => this.onDelete(key)}
                        navigation={this.props.navigation}
                        data={this.state.data}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 200,
    },
});
