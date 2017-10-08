import React from 'react';
import { Image, Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

export default class Start extends React.Component {

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
          <Image style={{width: 128, height: 114}} source={{uri: 'https://i.imgur.com/qiMnqJF.png'}} />
          <Text style={styles.title}>Upstream</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.scan}>
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#F8F9F4',
    fontSize: 56,
    textAlign: 'center',
    padding: 20,
    marginBottom: 40,
    backgroundColor: 'transparent',
    fontFamily: 'avenir-next-ultralight'
  },
  button: {
    backgroundColor: '#F8F9F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12
  },
  buttonText: {
    color: '#5693A2',
    fontSize: 24,
    fontFamily: 'avenir-light'
  }
});
