import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { ImagePicker, BarCodeScanner } from 'expo';

import Results from './screens/results.js';
import Start from './screens/start.js';
import Loading from './screens/loading.js';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      screen: "start", // possible values: start, scan, show, loading
      data: {
        percent: 80
      },
      target: null,
      response: null
    };
  }

  render() {
    switch (this.state.screen) {
      case "start":
        return (
          <Start scan={() => this.setState({screen: "scan"})} />
        );
      case "show":
        return (
          <Results
            onBackPress={() => this.setState({screen: "start"})}
            data={{target: this.state.target, percent: this.state.data.percent}}
            response={this.state.response}
          />
        );
      case "scan":
        return (
          <BarCodeScanner style={StyleSheet.absoluteFill}
            onBarCodeRead={this._handleBarCodeRead.bind(this)}
          />
        );
      case "loading":
        return (
          <Loading target={this.state.target} />
        );
    }
  }

  _handleBarCodeRead = ({ type, data}) => {
    if (type == "QR_CODE") {
      let cleaned_address = data.substring(data.indexOf(":") + 1);
      fetch('http://cfc7a45a.ngrok.io/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: cleaned_address
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: {percent: responseJson}, response: responseJson, screen: "show"})
      })
      .catch((error) => {
        this.setState({screen: "scan"})
        alert("Networking error, please try again");
      });
      this.setState({target: cleaned_address, screen: "loading"});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
