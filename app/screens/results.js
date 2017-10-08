import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

export default class Results extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#5693A2', '#57C37B']}
          start={[0.5, 0]}
          style={ StyleSheet.create({
            wrapper: {
              ...StyleSheet.absoluteFillObject,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }
          }).wrapper }>
          <View style={styles.body}>
            <Text style={styles.address}>{this.props.data.target}</Text>
            <Text style={[styles.percent, this.props.style.percent]}>{this.props.data.percent}%</Text>
            <Text>Taint Level</Text>
            <Text>Balance: {this.props.data.balance} BTC</Text>
            <Button
              onPress={this.props.onBackPress}
              title="Try another"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </LinearGradient>
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
  address: {
    fontWeight: 'bold'
  },
  percent: {
    fontSize: 120
  },
  body: {
    backgroundColor: '#fff',
    width: 350,
    height: 300,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
