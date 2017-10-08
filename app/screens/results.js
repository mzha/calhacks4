import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

export default class Results extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Showing results for {this.props.data.target}</Text>
        <Text style={styles.percent}>{this.props.data.percent}%</Text>
        <Text>tainted</Text>
        <Button
          onPress={this.props.onBackPress}
          title="Try another"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>responseJson: {JSON.stringify(this.props.response)}</Text>
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
  },
  percent: {
    fontSize: 120
  }
});
