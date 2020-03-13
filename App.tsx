import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import colors from "./src/styles/colors";
import AppNavigation from './src/navigation';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.transparent} barStyle={'dark-content'} />
        <AppNavigation />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
