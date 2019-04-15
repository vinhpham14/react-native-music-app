import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Header extends Component {

  onDownPress = () => {
    // Inside proceeding
    this.setMessage();

    // Invoke the callback
    if (typeof this.props.onDownPress === "function") {
      this.props.onDownPress();
    }
  }

  onQueuePress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onQueuePress === "function") {
      this.props.onQueuePress();
    }
  }

  onMessagePress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onMessagePress === "function") {
      this.props.onMessagePress();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.onDownPress}>
          <Image style={styles.button}
            source={require('../../resources/ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>

        <Text onPress={this.onMessagePress}
          style={styles.message}>{this.props.message.toUpperCase()}
        </Text>

        <TouchableOpacity onPress={this.onQueuePress}>
          <Image style={styles.button}
            source={require('../../resources/ic_queue_music_white.png')} />
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 13,
  },
  button: {
    opacity: 0.80
  }
});