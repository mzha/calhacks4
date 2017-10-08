import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
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
        percent: 80,
        balance: 0
      },
      target: null,
      response: null,
      style: null
    };
  }

  componentWillMount () {
    Image.prefetch('http://gifimage.net/wp-content/uploads/2017/02/Loading-GIF-Image-18.gif');
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
            data={{
              target: this.state.target,
              percent: this.state.data.percent,
              balance: (this.state.data.balance / 100000000).toFixed(2)
            }}
            style={this.state.style}
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
          <Loading target={this.state.target}/>
        );
    }
  }

  _handleBarCodeRead = ({ type, data}) => {
    if (type == "QR_CODE" || type == "org.iso.QRCode") {
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
        fetch('http://cfc7a45a.ngrok.io/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: cleaned_address
          })
        })
        .then((response2) => response2.json())
        .then((responseJson2) => {
          var red = 255
          var green = 255
          if (responseJson < 50) {
            red = 255 * (responseJson / 50)
          } else {
            green = 255 * ((100 - responseJson) / 50)
          }
          this.setState({
            data: {
              percent: responseJson,
              balance: responseJson2.balance
            },
            response: responseJson,
            style: StyleSheet.create({
              percent: {
                color: "rgb(" + red + ", " + green + ", 0)"
              }
            }),
            screen: "show"})
        })
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
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});
