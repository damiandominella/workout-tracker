
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import firebaseConfig from './constants/firebase';
import HomeScreen from "./screens/Home";
import WorkoutScreen from "./screens/Workout";
import ExerciseScreen from "./screens/Exercise";
import ExerciseFormScreen from "./screens/ExerciseForm";
import WeightFormScreen from "./screens/WeightForm";

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Workout: WorkoutScreen,
        Exercise: ExerciseScreen,
        ExerciseForm: ExerciseFormScreen,
        WeightForm: WeightFormScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    render() {
        return <AppContainer />;
    }
}