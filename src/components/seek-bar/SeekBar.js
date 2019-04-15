import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const getMinutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

export default class SeekBar extends Component {

  onValueChange = (value) => {
    this.props.onSliding(value);
  }

  render() {
    const elapsed = getMinutesAndSeconds(this.props.currentPosition);
    const remaining = getMinutesAndSeconds(this.props.duration - this.props.currentPosition);

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>
            {elapsed[0] + ":" + elapsed[1]}
          </Text>
          <Text style={[styles.text, { width: 40 }]}>
            {this.props.duration > 1 && "-" + remaining[0] + ":" + remaining[1]}
          </Text>
        </View>

        <Slider 
          step={1}
          maximumValue={this.props.duration}
          minimumTrackTintColor='white'
          maximumTrackTintColor='rgb(192, 192, 192)'
          thumbTintColor='white'
          onValueChange={this.onValueChange}
          onSlidingComplete={this.props.onSlidingComplete}
          value={this.props.currentPosition}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slider: {
    borderRadius: 100
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  }
});