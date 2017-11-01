import React from 'react';
import { Image, Text, Button, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import FadeInView from '../screens/fadeinview.js';

/* Loading page for BitTrace*/
export default class Loading extends React.Component {
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
            <Image style={styles.loadingImage}
              source={{uri: 'http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif'}}
            />
            <Text style={styles.text}>Loading</Text>
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
    justifyContent: 'center'
  },
  body: {
    width: 300,
    height: 300,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingImage: {
    width: 146,
    height: 124
  },
  text: {
    fontFamily: 'avenir-next-ultralight',
    fontSize: 25
  }
});
