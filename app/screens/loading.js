import React from 'react';
import { Image, Text, Button, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

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
              source={{uri: 'http://gifimage.net/wp-content/uploads/2017/02/Loading-GIF-Image-18.gif'}}
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
    width: 200,
    height: 200
  }
});
