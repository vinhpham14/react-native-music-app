import React from 'react';
import TextTicker from 'react-native-text-ticker';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TrackDetails = ({
  onTitlePress,
  onArtistPress,
  title,
  artist,
  onHeartPress,
  heartEnabled = false,
}) => {
  const textLength = title.length + artist.length;
  const speedPerChar = 145;
  return (
    <View style={styles.container}>
      <View style={styles.detailsWrapper}>
        {/* <Text style={styles.title} onPress={onTitlePress}>
          {title}
        </Text> */}
        <TextTicker
          style={styles.title}
          duration={textLength * speedPerChar}
          animationType="scroll"
          loop
          repeatSpacer={100}
          marqueeDelay={500}
        >
          {title}
        </TextTicker>
        <Text style={styles.artist} onPress={onArtistPress}>
          {artist}
        </Text>
      </View>
      <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={onHeartPress}>
          {!heartEnabled ? (
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
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  detailsWrapper: {
    marginTop: 5,
    flex: 0.8,
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
