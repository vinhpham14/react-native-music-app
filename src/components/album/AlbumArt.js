import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class AlbumArt extends Component {

  onPress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onPress === "function") {
      this.props.onPress();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Image
            style={styles.image}
            source={{ uri: this.props.url }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const { width, height } = Dimensions.get('window');
const imageSize = width - (20/100 * width);

const styles = StyleSheet.create({
  container: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  image: {
    width: imageSize,
    height: imageSize,
  }
})