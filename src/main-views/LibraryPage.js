import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Item, SearchResult } from './SearchPage';
import MiniPlayer from '../components/mini-player/MiniPlayer';
import { actionCreators } from '../actions/ReduxImplement';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';

class LibraryPage extends Component {
  static navigationOptions = {
    title: 'Your Library',
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
    } else if (label === 'Favorite Songs') {
      navigation.navigate('FavoriteSongs');
    }
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
        <View style={{ flex: 0.905 }}>
          <ScrollView style={{ flex: 1 }}>
            <FlatList
              style={{ width: '100%', marginTop: 15 }}
              data={[
                { label: 'Playlists', iconName: 'playlists' },
                { label: 'Favorite Songs', iconName: 'fav-songs' },
              ]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={obj => {
                return (
                  <CategoryItem
                    item={obj.item}
                    onPress={() => {
                      this.onPressedCategoryItem(obj.item);
                    }}
                  />
                );
              }}
            />
            <Text style={styles.categoryText}> Recently Played </Text>
            <RecentlyPlayedList
              onItemPressed={item => {
                if (item.type === 'playlist') {
                  this.updatePlayingPlaylist(item.data);
                  this.navigateToPlaylist();
                } else {
                  this.updatePlayingTrack(item.data);
                  this.navigateToPlayer();
                }
              }}
              data={recentlyPlayedItems}
              onPressedRemove={item => {
                dispatch(actionCreators.removeRecentlyPlayed(item));
              }}
            />
          </ScrollView>
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
  const imgStyle = item.type === 'song' ? styles.imageSong : styles.imagePlaylist;
  const { data } = item;

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
          <Image
            style={imgStyle}
            source={{ uri: item.type === 'song' ? data.albumArtUrl : data.playlistArtUrl }}
          />
        </View>
        <View style={{ flex: 0.75, justifyContent: 'center' }}>
          <Text style={styles.titleText} numberOfLines={1}>
            {item.type === 'song' ? data.title : data.name}
          </Text>
          <Text style={styles.artistText} numberOfLines={1}>
            {item.type === 'song' ? `Song by ${data.artist}` : 'Playlist'}
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

const CategoryItem = ({ onPress, item }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          marginVertical: 18,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <View style={{ flex: 0.184, justifyContent: 'center', alignItems: 'center' }}>
          <IconGenerator size={iconCategorySize} iconName={item.iconName} />
        </View>
        <View style={{ flex: 0.816, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }} numberOfLines={1}>
            {item.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const HeaderPage = ({ text }) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: 'rgb(34, 35, 38)',
//       }}
//     >
//       <View style={{ flex: 0.1, alignContent: 'center', justifyContent: 'center' }}>
//         <TouchableOpacity>
//           <Image
//             source={require('../images/ic-back-arrow.png')}
//             style={{ width: 30, height: 30 }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={{ flex: 0.8 }}>
//         <Text
//           style={{
//             color: 'white',
//             fontWeight: 'bold',
//             fontSize: 18,
//             textAlign: 'center',
//           }}
//         >
//           {text}
//         </Text>
//       </View>
//       <View style={{ flex: 0.1 }} />
//     </View>
//   );
// };

const { width } = Dimensions.get('window');
const imageSize = 0.14 * width;
const iconCategorySize = 0.0625 * width;
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
)(LibraryPage);
