import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import IconGenerator, { iconNames } from '../icon-generator/IconGenerator';

const MiniPlayer = ({
  songName,
  artist,
  onPressedUpArrow,
  onPressedPlay,
  onPressedText,
  isPlaying,
}) => {
  const textLength = songName.length + artist.length;
  const speedPerChar = 145;
  const toggleIconPlayer = isPlaying ? iconNames.PauseMusic : iconNames.PlayMusic;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressedUpArrow}>
        <IconGenerator iconName={iconNames.UpArrow} size={16} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedText}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.7,
            flexWrap: 'nowrap',
            paddingHorizontal: 20,
          }}
        >
          {/* 
        NOTE:
          TextTicker Componenet seems like cracked when we use multiple Text components
          as content value.
          Actual behavior: Content scrolls too fast.
        */}
          <TextTicker
            style={styles.songText}
            duration={textLength * speedPerChar}
            animationType="scroll"
            loop
            repeatSpacer={100}
            marqueeDelay={500}
          >
            {songName} <ArtistTextStyle> • {artist} </ArtistTextStyle>
          </TextTicker>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedPlay}>
        <IconGenerator iconName={toggleIconPlayer} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const ArtistTextStyle = ({ children }) => <Text style={styles.artistText}>{children}</Text>;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(34,35,38)',
    marginBottom: 2,
    paddingRight: 10,
    paddingLeft: 20,
  },
  songText: {
    fontWeight: 'bold',
    color: 'white',
  },
  artistText: {
    color: '#b3b3b3',
  },
});

export default MiniPlayer;
