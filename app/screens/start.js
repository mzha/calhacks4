import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
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
          <Text style={styles.title}>Bitcoin Security Assessment</Text>
          <Button
            onPress={this.props.scan}
            title="Scan QR Code"
            color="#5693A2"
          />
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
    marginBottom: 40
  }
});
