/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { actionCreators } from '../actions/ReduxImplement';
import MiniPlayer from '../components/mini-player/MiniPlayer';
import { port } from '../constant';

const SEARCH_RESULT = [];

const placeHolderText = 'Search';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    const { recentSearches } = this.props;
    this.state = {
      text: placeHolderText,
      showPlaceHolder: true,
      recentSearches,
      showResult: false,
      searchResults: [],
      keySearch: '',
    };
  }

  componentWillMount() {
    // TO-DO: send request to get the Recent Search
    // NOTE: setState has no effect when used here
    // NOTE: Getting warning when change directly this.state
  }

  componentWillUnmount() {
    // TO-DO: push all the current Recent Search
  }

  onBlurInput = () => {
    const { text } = this.state;
    if (text.trim().length === 0) {
      this.setState({
        text: placeHolderText,
        showPlaceHolder: true,
      });
    }
  };

  onFocusInput = () => {
    const { showPlaceHolder } = this.state;
    if (showPlaceHolder === true) {
      this.setState({
        showPlaceHolder: false,
      });
    }

    // Clear text on focus
    this.setState({
      text: '          ',
      keySearch: '',
    });
  };

  onPressedPlaylist = item => {
    const { dispatch, navigation } = this.props;

    dispatch(actionCreators.setPlayingPlaylist(item));
    dispatch(actionCreators.setCurrentSongTime(0));
    dispatch(actionCreators.setPlayingTrack(item.tracks[0]));
    navigation.navigate('Player');
  };

  togglePlayingState = () => {
    const { dispatch, paused } = this.props;
    dispatch(actionCreators.setPaused(!paused));

    // NOTE:
    // After dispatch, the getDerivedStateFromProps() method
    // have not been called yet util finishing this method
  };

  navigateToPlayer = () => {
    const { navigation } = this.props;
    navigation.navigate('Player');
  };

  removeFromRecentSearches = index => {
    const { recentSearches } = this.state;
    const { dispatch } = this.props;
    const newRecentSearches = recentSearches.filter((search, i) => i !== index);

    this.setState({
      recentSearches: newRecentSearches,
    });
    dispatch(actionCreators.setRecentSearches(newRecentSearches));
  };

  clearAllRecentSearches = () => {
    this.setState({
      recentSearches: [],
    });
  };

  updatePlayingTrack = payload => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setPlayingTrack(payload));
    console.log('done update playing track');
  };

  onSubmitEditing = text => {
    // TO-DO: Get list of results matches with input
    fetch(`${port}/songs/search/${text}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          searchResults: json,
          showResult: true,
          keySearch: text,
        });
      });
  };

  render() {
    const {
      showPlaceHolder,
      text,
      recentSearches,
      showResult,
      searchResults,
      keySearch,
    } = this.state;
    const { playingTrack, paused, duration, currentTime } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchSpace}>
          <TextInput
            value={text}
            style={showPlaceHolder ? styles.placeHolder : styles.textInput}
            onBlur={this.onBlurInput}
            onFocus={this.onFocusInput}
            onChangeText={value => this.setState({ text: `${value}` })}
            onSubmitEditing={value => this.onSubmitEditing(value.nativeEvent.text.trim())}
          />

          <View style={{ flex: 1 }}>
            {/* TO-DO: Need a cleaner way */}
            {showResult ? (
              <SearchResult
                data={searchResults}
                onItemPressed={track => {
                  const { dispatch } = this.props;
                  const newRecentSearches = [track, ...recentSearches];

                  this.setState({
                    recentSearches: newRecentSearches,
                    showResult: false,
                    keySearch: '',
                    text: 'Search',
                    showPlaceHolder: true,
                  });

                  this.updatePlayingTrack(track);
                  dispatch(
                    actionCreators.addRecentlyPlayed({
                      type: 'song',
                      data: track,
                    })
                  );

                  // Keep track the recently played
                  dispatch(
                    actionCreators.addFavoriteTrack({
                      type: 'song',
                      data: track,
                    })
                  );

                  dispatch(actionCreators.setRecentSearches(newRecentSearches));

                  this.navigateToPlayer();
                }}
                keySearch={keySearch}
              />
            ) : recentSearches.length !== 0 ? (
              <ScrollView showsHorizontalScrollIndicator={false}>
                <Text style={styles.categoryText}> Recent Searches</Text>
                <RecentSearchList
                  onRemoveItem={this.removeFromRecentSearches}
                  data={recentSearches}
                  onItemPressed={track => {
                    this.updatePlayingTrack(track);
                    const { navigation } = this.props;
                    navigation.navigate('Player');
                  }}
                />
                <ClearText onPress={this.clearAllRecentSearches} />
              </ScrollView>
            ) : (
              <EmptySearch />
            )}
          </View>
        </View>
        <View style={{ flex: 0.095, backgroundColor: '#121212', width: '100%' }}>
          <MiniPlayer
            songName={playingTrack.title}
            artist={playingTrack.artist}
            paused={paused}
            duration={duration}
            currentTime={currentTime}
            onPressedPlay={this.togglePlayingState}
            onPressedUpArrow={this.navigateToPlayer}
            onPressedText={this.navigateToPlayer}
            // NOTE: Duplicating all the on pressed handler. Need a cleaner way.
          />
        </View>
      </View>
    );
  }
}

const RecentSearchList = ({ data, onRemoveItem, onItemPressed }) => {
  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={obj => (
        <Item
          data={obj.item}
          onPressedRemove={() => onRemoveItem(obj.index)}
          onPress={() => {
            console.log('Item Pressed in Recent List: ');
            onItemPressed(obj.item);
          }}
        />
      )}
    />
  );
};

// Compare to RecentSearchList, this has gradient color
export const SearchResult = ({ data, keySearch, onItemPressed, showEmptyMessage = true }) => {
  return data.length > 0 && showEmptyMessage ? (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#2b3535', '#121212']} style={{ width: '100%', height: '100%' }} />
      <FlatList
        style={{ position: 'absolute', width: '100%', height: '100%', top: 30 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={obj => (
          <Item
            data={obj.item}
            onPress={() => {
              onItemPressed(obj.item);
            }}
            enableRemove={false}
          />
        )}
      />
    </View>
  ) : (
    <NotFound keySearch={keySearch} />
  );
};

const ClearText = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: 'rgb(179, 179, 179)',
          marginLeft: 20,
          fontWeight: 'normal',
          fontSize: 16,
          marginTop: 10,
        }}
      >
        Clear recent searches
      </Text>
    </TouchableOpacity>
  );
};

export const Item = ({ data, onPressedRemove, onPress, enableRemove = true, imageStyle }) => {
  const imgStyle = imageStyle !== undefined ? imageStyle : styles.image;
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
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.artistText}>{data.artist}</Text>
        </View>
        <View style={{ flex: 0.05 }}>
          {enableRemove ? (
            <TouchableOpacity onPress={onPressedRemove}>
              <Image style={styles.removeIcon} source={require('../images/ic-remove.png')} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EmptySearch = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.emptySearchImage} source={require('../images/img-search.png')} />
      <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 16, marginTop: 25 }}>
        Search Music
      </Text>
      <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 14, marginTop: 5 }}>
        Find your favorite songs.
      </Text>
    </View>
  );
};

const NotFound = ({ keySearch }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={styles.emptySearchImage} source={require('../images/img-flag.png')} />
      <Text
        style={{
          color: 'white',
          fontWeight: 'normal',
          fontSize: 16,
          marginTop: 25,
          textAlign: 'center',
        }}
      >
        No results found for {'\n'} {`"${keySearch.trim()}"`}
      </Text>
      <Text
        style={{
          color: 'white',
          fontWeight: 'normal',
          fontSize: 12,
          marginTop: 5,
          textAlign: 'center',
        }}
      >
        Please check you have the right spelling, or {'\n'} try different keywords
      </Text>
    </View>
  );
};

const { width } = Dimensions.get('window');
const imageSize = 0.15 * width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(18, 18, 18)',
    // backgroundColor: 'red',
  },
  searchSpace: {
    flex: 0.905,
    padding: 10,
    backgroundColor: 'rgb(20, 21, 22)',
    width: '100%',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgb(66, 67, 69)',
    borderRadius: 3,
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
    paddingLeft: 15,
  },
  placeHolder: {
    backgroundColor: 'rgb(66, 67, 69)',
    borderRadius: 3,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  categoryText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    marginTop: 15,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 90,
  },
  list: {
    marginVertical: 5,
  },
  artistText: {
    paddingHorizontal: 10,
    color: '#b3b3b3',
  },
  titleText: {
    paddingHorizontal: 10,
    color: 'white',
  },
  removeIcon: {
    width: 18,
    height: 18,
  },
  emptySearchImage: {
    width: 100,
    height: 100,
  },
});

export default connect(
  ({ playingTrack, playlist, screen, currentTime, duration, paused, recentSearches }) => {
    return {
      playingTrack,
      playlist,
      screen,
      currentTime,
      paused,
      duration,
      recentSearches,
    };
  }
)(SearchPage);
