import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

export default class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(
      this.state.xPosition,
      {
        toValue: 100,
        easing: Easing.back,
        duration: 2000,
      }
      ).start();                      // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;
    let { temp } = this.props.style;
    let stylesheet2 = StyleSheet.flatten([
      {opacity: fadeAnim},
      temp
    ])

    return (
      <Animated.View                 // Special animatable View
        style={stylesheet2}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

// // You can then use your `FadeInView` in place of a `View` in your components:
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
//           <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
//         </FadeInView>
//       </View>
//     )
//   }
// }
