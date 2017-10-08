import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading data for {this.props.target}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
