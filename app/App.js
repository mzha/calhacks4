import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { ImagePicker, BarCodeScanner } from 'expo';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
      show: false,
      screen: "start", // possible values: start, scan, show, loading
      data: {
        percent: 80
      },
      target: null
    };
  }

  submit() {
    this.setState({screen: "show"});
  }

  back() {
    this.setState({screen: "start"});
  }

  scan = async () => {
    // let result = await ImagePicker.launchCameraAsync({
    // });
    this.setState({screen: "scan"})
  }

  render() {
    switch (this.state.screen) {
      case "start":
        return (
          <View style={styles.container}>
            <Text>Please enter a bitcoin address</Text>
            <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
            <Button
              onPress={this.scan.bind(this)}
              title="Scan QR Code"
              color="#654321"
            />
            <Button
              onPress={this.submit.bind(this)}
              title="Analyze"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        );
      case "show":
        return (
          <View style={styles.container}>
            <Text>Showing results for {this.state.target}</Text>
            <Text style={styles.percent}>{this.state.data.percent}%</Text>
            <Text>tainted</Text>
            <Button
              onPress={this.back.bind(this)}
              title="Try another"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        );
      case "scan":
        return (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead.bind(this)}
            style={StyleSheet.absoluteFill}
          />
        );
      case "loading":
        return (
          <View style={styles.container}>
            <Text>Loading data for {this.state.target}</Text>
          </View>
        );
    }
  }

  _handleBarCodeRead = ({ type, data}) => {
    if (type == "QR_CODE") {
      this.setState({target: data, screen: "show"});
    }
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
  },
  percent: {
    fontSize: 120
  }
});
