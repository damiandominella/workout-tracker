import React from "react";
import {Button} from 'react-native';
import {Content, Container} from 'native-base';
import WeightList from "../components/WeightList";
import * as firebase from 'firebase';
import 'firebase/firestore';

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
            data: []
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
        querySnapshot.forEach((doc) => {
            const {value, createdAt, unitMeasure} = doc.data();
            data.push({
                key: doc.id,
                createdAt,
                value,
                unitMeasure
            });
        });

        this.setState({
            data,
            loading: false,
        });
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
        return (
            <Container>
                <Content>
                    <WeightList
                        onEdit={(entity) => this.onEdit(entity)}
                        onDelete={(key) => this.onDelete(key)}
                        data={this.state.data}
                    />
                </Content>
            </Container>
        );
    }
}