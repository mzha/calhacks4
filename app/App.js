import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { ImagePicker, BarCodeScanner, Font, LinearGradient } from 'expo';

import Results from './screens/results.js';
import Start from './screens/start.js';
import Loading from './screens/loading.js';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      screen: "splash", // possible values: start, scan, show, loading, splash
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
  async componentDidMount() {
    await Font.loadAsync({
      'avenir-light': require('./assets/Avenir-Light.ttf'),
      'avenir-next-ultralight': require('./assets/AvenirNext-UltraLight.ttf')
    });
    this.setState({ screen: "start" });
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
      case "splash":
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
            </LinearGradient>
          </View>
        )
    }
  }

  _handleBarCodeRead = ({ type, data}) => {
    if (type == "QR_CODE" || type == "org.iso.QRCode") {
      let cleaned_address = data.substring(data.indexOf(":") + 1);
      fetch('http://calhacks4.azurewebsites.net/history', {
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
        fetch('http://calhacks4.azurewebsites.net/test', {
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
          this.setState({
            data: {
              percent: responseJson,
              balance: responseJson2.balance
            },
            response: responseJson,
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
