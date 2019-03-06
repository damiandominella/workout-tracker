import React from "react";
import WorkoutList from "../components/WorkoutList";
import {Content, Container} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('workouts');
        this.unsubscribe = null;

        this.state = {
            loading: true,
            data: [],
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            const {createdAt, name, image} = doc.data();
            data.push({
                key: doc.id,
                createdAt,
                name,
                image
            });
        });

        this.setState({
            data,
            loading: false,
        });
    };

    render() {

        return (
            <Container>
                <Content>
                    <WorkoutList
                        navigation={this.props.navigation}
                        data={this.state.data}
                    />
                </Content>
            </Container>
        );
    }
}