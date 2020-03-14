import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ height:'100%', backgroundColor: 'red' }}>
        <Text> posts </Text>
      </View>
    );
  }
}
