import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class TrackDetails extends Component {

  onAddPress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onAddPress === "function") {
      this.props.onAddPress();
    }
  }

  onMorePress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onMorePress === "function") {
      this.props.onMorePress();
    }
  }

  onTitlePress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onTitlePress === "function") {
      this.props.onTitlePress();
    }
  }

  onArtistPress = () => {
    // Inside proceeding

    // Invoke the callback
    if (typeof this.props.onArtistPress === "function") {
      this.props.onArtistPress();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.props.onAddPress}>
          <Image style={styles.button}
            source={require('../../images/ic_add_circle_outline_white.png')} />
        </TouchableOpacity>

        <View style={styles.detailsWrapper}>
          <Text style={styles.title} onPress={this.props.onTitlePress}>{this.props.title}</Text>
          <Text style={styles.artist} onPress={this.props.onArtistPress}>{this.props.artist}</Text>
        </View>

        <TouchableOpacity onPress={this.props.onMorePress}>
          <View style={styles.moreButton}>
            <Image style={styles.moreButtonIcon}
              source={require('../../images/ic_more_horiz_white.png')} />
          </View>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  }
});