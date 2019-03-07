import React from "react";
import {Button} from 'react-native';
import {Container, Content, Form, Item, Input, Label, Picker, Icon} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {StyleSheet} from "react-native";

export default class WeightFormScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Add weight'), // 2nd arg is default fallback,
            headerRight: (
                <Button
                    onPress={navigation.getParam('onSubmit')}
                    title="Save"
                />
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ onSubmit: this.onSubmit });
    }

    constructor(props) {
        super(props);


        let exercise = this.props.navigation.getParam('exercise', null);
        this.weight = this.props.navigation.getParam('weight', null);

        this.ref = firebase.firestore().doc('workouts/' + exercise.workoutKey + '/exercises/' + exercise.key);

        if (this.weight !== null) {
            this.state = {
                createdAt: this.weight.createdAt,
                unitMeasure: this.weight.unitMeasure,
                value: this.weight.value,
                key: this.weight.key
            }
        } else {
            this.state = {
                createdAt: null,
                unitMeasure: null,
                value: null,
                key: null
            }
        }
    }

    onPickerChange(value) {
        this.setState({
            unitMeasure: value
        });
    }

    updateLastWeight() {
        this.ref.set({
            lastWeight: this.state.value,
            lastWeightUnitMeasure: this.state.unitMeasure}, {merge: true})
            .then(() => {})
            .catch(() => {});
    }

    onSubmit = () => {

        let errors = [];

        if (!this.state.value || this.state.value === "") {
            errors.push('Weight');
        }

        if (!this.state.unitMeasure || this.state.unitMeasure === "") {
            errors.push('Unit of measure');
        }

        console.log(this.state);

        if (errors.length > 0) {
            if (errors.length === 1) {
                alert(errors.join('') + ' is required!');
            } else {
                alert(errors.join(', ') + ' are required!');
            }
        } else {
            let body = {
                value: this.state.value,
                unitMeasure: this.state.unitMeasure,
                createdAt: this.state.createdAt ? this.state.createdAt : +new Date()
            };

            if (this.state.key) {
                this.ref.collection('weights').doc(this.state.key).set(body, {merge: true}).then(() => {
                    console.log("Document successfully written");
                    this.updateLastWeight();
                    this.props.navigation.goBack();
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            } else {
                this.ref.collection('weights').add(body).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    this.updateLastWeight();
                    this.props.navigation.goBack();
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            }
        }
    };

    render() {

        let date = this.state.createdAt ? new Date(this.state.createdAt) : new Date();

        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Date</Label>
                            <Input disabled value={date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
                            />
                        </Item>
                        <Item fixedLabel>
                            <Label>Weight</Label>
                            <Input onChangeText={(value) => this.setState({value})}
                                   value={this.state.value}/>
                        </Item>
                        <Item fixedLabel picker>
                            <Label style={styles.pickerLabel}>Unit of measure</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#000" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.unitMeasure}
                                onValueChange={(value) => this.onPickerChange(value)}
                            >
                                <Picker.Item label="kg" value="kg" />
                                <Picker.Item label="lb" value="lb" />
                            </Picker>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    pickerLabel: {
        marginLeft: 16
    }
});