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
            <Text style={[styles.percent, this._calculateColorStyle(this.props.data.percent)]}>{this.props.data.percent}%</Text>
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

  _calculateColorStyle = (percent) => {
    // red color: c71f16 - 199,31,22
    // green color: 57C37B - 87,195,123
    const red = 87 + ((199 - 87) * percent / 100);
    const green = 195 - ((195 - 31) * percent / 100);
    const blue = 123 - ((123 - 22) * percent / 100);
    const colorStyle = StyleSheet.create({
      percent: {
        color: "rgb(" + red + ", " + green + ", " + blue + ")"
      }
    });
    return colorStyle.percent;
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
