import React, { Component } from 'react';
import { View, Text, StatusBar, Button } from 'react-native';
import Colors from '../theme/Colors';
import Header from '../components/Header';

export default class PlayGame extends Component {
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
        <Header navigation={navigation} isTabBar={true} title="PlayGame" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> PlayGame </Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>

      </View>
    );
  }
}
