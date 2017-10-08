import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

export default class Start extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.props.scan}
          title="Scan QR Code"
          color="#654321"
        />
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
  input: {
    width: 160,
    padding: 8,
    margin: 8,
    borderColor: '#000',
    borderRadius: 4,
  }
});
