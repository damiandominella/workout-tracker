import React from "react";
import {Container, Content, Form, Item, Input, Label, Button, Text} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class ExerciseFormScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Add exercise'), // 2nd arg is default fallback
        };
    };

    constructor(props) {
        super(props);

        let workout = this.props.navigation.getParam('workout', null);
        this.exercise = this.props.navigation.getParam('exercise', null);

        this.ref = firebase.firestore().doc('workouts/' + workout.key).collection('exercises');

        if (this.exercise !== null) {
            this.state = {
                name: this.exercise.name,
                volume: this.exercise.volume,
                rest: this.exercise.rest,
                key: this.exercise.key
            }
        } else {
            this.state = {
                key: null,
                name: null,
                volume: null,
                rest: null
            }
        }
    }

    onSubmit() {

        let errors = [];

        if (!this.state.name || this.state.name === "") {
            errors.push('Name');
        }
        if (!this.state.volume || this.state.volume === "") {
            errors.push('Volume');
        }
        if (!this.state.rest || this.state.rest === "") {
            errors.push('Rest');
        }

        if (errors.length > 0) {
            if (errors.length === 1) {
                alert(errors.join('') + ' is required!');
            } else {
                alert(errors.join(', ') + ' are required!');
            }
        } else {
            let body = {
                name: this.state.name,
                volume: this.state.volume,
                rest: this.state.rest,
                createdAt: +new Date()
            };

            if (this.state.key) {
                this.ref.doc(this.state.key).set(body, {merge: true}).then(() => {
                    console.log("Document successfully written");
                    this.props.navigation.goBack();
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            } else {
                this.ref.add(body).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    this.props.navigation.goBack();
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            }
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(name) => this.setState({name})}
                                   value={this.state.name}/>
                        </Item>
                        <Item fixedLabel>
                            <Label>Set x Rep</Label>
                            <Input
                                onChangeText={(volume) => this.setState({volume})}
                                value={this.state.volume}
                            />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Rest</Label>
                            <Input onChangeText={(rest) => this.setState({rest})}
                                   value={this.state.rest}/>
                        </Item>
                    </Form>

                    <Button block onPress={() => this.onSubmit()}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}