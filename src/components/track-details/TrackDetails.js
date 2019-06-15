import React from 'react';
import TextTicker from 'react-native-text-ticker';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TrackDetails = ({
  onTitlePress,
  onArtistPress,
  title,
  artist,
  onHeartPress,
  heartEnabled = false,
  onPlusPress,
}) => {
  const textLength = title.length + artist.length;
  const speedPerChar = 145;
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.15, alignItems: 'center' }}>
        <TouchableOpacity onPress={onPlusPress}>
          <Image source={require('../../images/ic-plus.png')} style={styles.heartImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsWrapper}>
        {/* <Text style={styles.title} onPress={onTitlePress}>
          {title}
        </Text> */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          horizontal
        >
          <Text
            style={styles.title}
            // duration={textLength * speedPerChar}
            // animationType="scroll"
            // loop
            // repeatSpacer={100}
            // marqueeDelay={500}
            numberOfLines={1}
          >
            {title}
          </Text>
        </ScrollView>

        <Text style={styles.artist} onPress={onArtistPress}>
          {artist}
        </Text>
      </View>
      <View style={{ flex: 0.15, alignItems: 'center' }}>
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
    paddingHorizontal: 10,
  },
  detailsWrapper: {
    marginTop: 5,
    flex: 0.7,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    fontSize: 14,
    marginTop: 4,
    color: '#b3b3b3',
    fontWeight: '400',
  },
  heartImage: {
    height: 25,
    width: 25,
  },
});
