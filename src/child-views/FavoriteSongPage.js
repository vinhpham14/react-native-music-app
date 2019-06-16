import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { actionCreators } from '../actions/ReduxImplement';
import { defaultPlaylistArtUrl } from '../constant';
import MiniPlayer from '../components/mini-player/MiniPlayer';

class FavoriteSongPage extends Component {
  static navigationOptions = {
    title: 'Favorite Songs',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  togglePlayingState = () => {
    const { dispatch, paused } = this.props;
    dispatch(actionCreators.setPaused(!paused));

    // NOTE:
    // After dispatch, the getDerivedStateFromProps() method
    // have not been called yet util finishing this method
  };

  navigateToPlayer = () => {
    const { navigation } = this.props;
    navigation.navigate('Player', {
      showPlaylist: 'false',
    });
  };

  navigateToPlaylist = () => {
    const { navigation } = this.props;
    navigation.navigate('Player', {
      showPlaylist: 'true',
    });
  };

  updatePlayingTrack = payload => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setPlayingTrack(payload));
  };

  updatePlayingPlaylist = payload => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setPlayingPlaylist(payload));
  };

  onPressedCategoryItem = item => {
    const { label } = item;
    const { navigation } = this.props;

    if (label === 'Playlists') {
      navigation.navigate('PlaylistManager');
    }
    // else (lable === 'Favorite Songs') {

    // }
  };

  render() {
    const {
      dispatch,
      favoriteTracks,
      playingTrack,
      paused,
      duration,
      currentTime,
      recentlyPlayedItems,
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(18,18,18)' }}>
        {/* <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeaderPage text="Your Library" />
      </View> */}
        <View
          style={{ flex: 0.125, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}
        >
          <TouchableOpacity
            style={{
              height: buttonHeight,
              width: buttonWidth,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 90,
            }}
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate('Player');
              dispatch(
                actionCreators.setPlayingPlaylist({
                  name: 'Your Favorite Songs',
                  playlistArtUrl:
                    'data:image/jpeg;base64,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',
                  tracks: [...favoriteTracks],
                })
              );
              dispatch(actionCreators.setPlayingTrack(favoriteTracks[0]));
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Play
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.78 }}>
          <RecentlyPlayedList
            onItemPressed={item => {
              if (item.type === 'playlist') {
                // this.updatePlayingPlaylist(item.data);
                // this.navigateToPlaylist();
              } else {
                this.updatePlayingTrack(item);
                this.navigateToPlayer();
              }
            }}
            data={favoriteTracks}
            onPressedRemove={item => {
              dispatch(actionCreators.removeFavoriteTrack(item));
            }}
          />
        </View>
        <View style={{ flex: 0.095, backgroundColor: '#121212' }}>
          <MiniPlayer
            songName={playingTrack.title}
            artist={playingTrack.artist}
            paused={paused}
            onPressedPlay={this.togglePlayingState}
            onPressedUpArrow={() => {
              this.navigateToPlayer();
            }}
            onPressedText={() => {
              this.navigateToPlayer();
            }}
            duration={duration}
            currentTime={currentTime}
          />
        </View>
      </View>
    );
  }
}

const RecentlyPlayedList = ({ data, onItemPressed, onPressedRemove }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ width: '100%', marginTop: 15 }}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={obj => (
          <RecentlyPlayedItem
            item={obj.item}
            onPress={() => onItemPressed(obj.item)}
            enableRemove
            onPressedRemove={() => onPressedRemove(obj.item)}
          />
        )}
      />
    </View>
  );
};

const RecentlyPlayedItem = ({ onPress, item, enableRemove, onPressedRemove }) => {
  const imgStyle = styles.imageSong;
  const data = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginVertical: 12,
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 0.2 }}>
          <Image style={imgStyle} source={{ uri: data.albumArtUrl }} />
        </View>
        <View style={{ flex: 0.75, justifyContent: 'center' }}>
          <Text style={styles.titleText} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.artistText} numberOfLines={1}>
            {`Song by ${data.artist}`}
          </Text>
        </View>
        <View style={{ flex: 0.05 }}>
          {enableRemove ? (
            <TouchableOpacity onPress={onPressedRemove}>
              <Image
                style={{ width: 18, height: 18 }}
                source={require('../images/ic-remove.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const { width, height } = Dimensions.get('window');
const imageSize = 0.14 * width;
const iconCategorySize = 0.0625 * width;
const buttonWidth = 0.45 * width;
const buttonHeight = 0.07 * height;
const imagePlaylistSize = 0.1 * width;
const styles = StyleSheet.create({
  categoryText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    marginTop: 25,
  },
  imageSong: {
    width: imageSize,
    height: imageSize,
    borderRadius: 90,
  },
  imagePlaylist: {
    width: imageSize,
    height: imageSize,
    borderRadius: 0,
  },
  artistText: {
    paddingHorizontal: 10,
    color: '#b3b3b3',
  },
  titleText: {
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default connect(
  ({ favoriteTracks, playingTrack, paused, duration, currentTime, recentlyPlayedItems }) => {
    return {
      favoriteTracks,
      playingTrack,
      paused,
      duration,
      currentTime,
      recentlyPlayedItems,
    };
  }
)(FavoriteSongPage);
