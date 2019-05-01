import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Header extends Component {
  onPlaylistPress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onPlaylistPress === 'function') {
      this.props.onPlaylistPress();
    }
  };

  onMessagePress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onMessagePress === 'function') {
      this.props.onMessagePress();
    }
  };

  render() {
    const { onDownPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onDownPress}>
          <Image
            style={styles.button}
            source={require('../../images/ic_keyboard_arrow_down_white.png')}
          />
        </TouchableOpacity>

        <Text onPress={this.onMessagePress} style={styles.message}>
          {this.props.message.toUpperCase()}
        </Text>

        <TouchableOpacity onPress={this.onPlaylistPress}>
          <Image style={styles.button} source={require('../../images/ic_queue_music_white.png')} />
        </TouchableOpacity>
      </View>
    );
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
    opacity: 0.8,
  },
});
