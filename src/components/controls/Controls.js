import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.paused = false;
    this.shuffleOn = false;
    this.repeatOn = false;
    this.forwardDisabled = false;

    this.props.onPressPlay = () => { }
    this.props.onPressPause = () => { }
    this.props.onBack = () => { }
    this.props.onForward = () => { }
    this.props.onPressShuffle = () => { }
    this.props.onPressRepeat = () => { }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.0} onPress={this.props.onPressShuffle}>
          <Image style={[styles.secondaryControl, this.props.shuffleOn ? [] : styles.off]}
            source={require('../../images/ic_shuffle_white.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={this.props.onBack}>
          <Image source={require('../../images/ic_skip_previous_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        {!this.props.paused ?
          <TouchableOpacity onPress={this.props.onPressPause}>
            <View style={styles.playButton}>
              <Image source={require('../../images/ic_pause_white_48pt.png')} />
            </View>
          </TouchableOpacity> :
          <TouchableOpacity onPress={this.props.onPressPlay}>
            <View style={styles.playButton}>
              <Image source={require('../../images/ic_play_arrow_white_48pt.png')} />
            </View>
          </TouchableOpacity>
        }
        <View style={{ width: 20 }} />
        <TouchableOpacity onPress={this.props.onForward}
          disabled={this.props.forwardDisabled}>
          <Image style={[this.props.forwardDisabled && { opacity: 0.3 }]}
            source={require('../../images/ic_skip_next_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity activeOpacity={0.0} onPress={this.props.onPressRepeat}>
          <Image style={[styles.secondaryControl, this.props.repeatOn ? [] : styles.off]}
            source={require('../../images/ic_repeat_white.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})