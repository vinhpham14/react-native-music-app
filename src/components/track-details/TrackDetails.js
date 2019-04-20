import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TrackDetails = ({
  onTitlePress,
  onArtistPress,
  title,
  artist,
  onHeartPress,
  liked = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsWrapper}>
        <Text style={styles.title} onPress={onTitlePress}>
          {title}
        </Text>
        <Text style={styles.artist} onPress={onArtistPress}>
          {artist}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={onHeartPress}>
          {!liked ? (
            <Image style={styles.heartImage} source={require('../../images/ic-heart-empty.png')} />
          ) : (
            <Image style={styles.heartImage} source={require('../../images/ic-heart-color.png')} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  detailsWrapper: {
    marginTop: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    fontSize: 16,
    marginTop: 4,
    color: '#b3b3b3',
    fontWeight: '400',
  },
  heartImage: {
    height: 25,
    width: 25,
  },
});
