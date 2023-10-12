import React, { Component } from 'react';
import { View, Text, StatusBar, Button } from 'react-native';
import Colors from '../theme/Colors';
import Header from '../components/Header';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.main} />
                <Header navigation={navigation} title="Details" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Details Screen</Text>
                    <Button
                        title="Go to Details... again"
                        onPress={() => navigation.navigate('Details')}
                    />
                    <Button title="Go to Bingo" onPress={() => navigation.navigate('Bingo')} />
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                    <Button
                        title="Go to Details... again"
                        onPress={() => navigation.push('Details')}
                    />
                    <Button
                        title="Go back to first screen in stack"
                        onPress={() => navigation.popToTop()}
                    />
                </View>
            </View>

        );
    }
}
