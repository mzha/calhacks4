import React from 'react';
import { Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import FadeInView from '../screens/fadeinview.js';

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
              alignItems: 'stretch',
              padding: 20,
              justifyContent: 'center'
            }
          }).wrapper }>
          <View style={styles.body}>
            <Text style={styles.address}>{this.props.data.target}</Text>
            <Text style={[styles.percent, this._calculateColorStyle(this.props.data.percent)]}>{this.props.data.percent}%</Text>
            <Text>Taint Level</Text>
            <Text>Balance: {this.props.data.balance} BTC</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.props.onBackPress}>
              <LinearGradient
                colors={['#3EA195', '#5693A2']}
                start={[0.1, 0]}
                style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    backgroundColor: '#F8F9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    fontWeight: 'bold'
  },
  percent: {
    fontSize: 120
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12
  },
  buttonText: {
    fontFamily: 'avenir-light',
    color: '#F8F9F4',
    fontSize: 24
  },
  buttonContainer: {
    marginTop: 24
  },
  body: {
    backgroundColor: '#F8F9F4',
    borderRadius: 5,
    padding: 8,
    paddingTop: 64,
    paddingBottom: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
