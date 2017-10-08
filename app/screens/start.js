import React from 'react';
import { Image, Text, Button, View, StyleSheet } from 'react-native';
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
          <View style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Button
                onPress={this.props.scan}
                title="Scan QR Code"
                color="#5693A2"
              />
            </View>
          </View>
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
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
    marginBottom: 40,
    backgroundColor: 'transparent'
  },
  buttonWrapper: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 150,
    height: 50
  }
});
