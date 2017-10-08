import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { text: '' };
  }

  submit() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter a bitcoin address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this.submit}
          title="Analyze"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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
