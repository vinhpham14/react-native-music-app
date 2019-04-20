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
import { actionCreators } from '../actions/ReduxImplement';

import MiniPlayer from '../components/mini-player/MiniPlayer';

const TRACKS_2 = [
  {
    title: 'Chia Tay',
    artist: 'Bùi Anh Tuấn',
    albumArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl:
      'https://vnso-zn-15-tf-mp3-s1-zmp3.zadn.vn/d6ade15e3a1ad3448a0b/3067141731979981036?authen=exp=1555817777~acl=/d6ade15e3a1ad3448a0b/*~hmac=b7a4798f618ced153050dbf05059ad04&filename=Chia-Tay-Original-Version-By-Hai-Au-Bui-Anh-Tuan.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl:
      'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
];

const placeHolderText = 'Search';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: placeHolderText,
      showPlaceHolder: true,
      recentSearches: TRACKS_2,
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
        text: '          ',
        showPlaceHolder: false,
      });
    }
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

    this.setState({
      recentSearches: recentSearches.filter((search, i) => i !== index),
    });
  };

  clearAllRecentSearches = () => {
    this.setState({
      recentSearches: [],
    });
  };

  render() {
    const { showPlaceHolder, text, recentSearches } = this.state;
    const { playingTrack, paused, duration, currentTime } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchSpace}>
          <TextInput
            value={text}
            style={showPlaceHolder ? styles.placeHolder : styles.textInput}
            onBlur={this.onBlurInput}
            onFocus={this.onFocusInput}
            onChangeText={value => this.setState({ text: `          ${value.trim()}` })}
          />

          <View style={{ flex: 1 }}>
            {recentSearches.length !== 0 ? (
              <ScrollView style={{ height: 400 }} showsHorizontalScrollIndicator={false}>
                <Text style={styles.categoryText}> Recent Searches</Text>
                <ResultList onRemoveItem={this.removeFromRecentSearches} data={recentSearches} />
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

const ResultList = ({ data, onRemoveItem }) => {
  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={obj => (
        <Item data={obj.item} onPressedRemove={() => onRemoveItem(obj.index)} onPress={() => {}} />
      )}
    />
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

const Item = ({ data, onPressedRemove, onPress }) => {
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
          <Image style={styles.image} source={{ uri: data.albumArtUrl }} />
        </View>
        <View style={{ flex: 0.75, justifyContent: 'center' }}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.artistText}>{data.artist}</Text>
        </View>
        <View style={{ flex: 0.05 }}>
          <TouchableOpacity onPress={onPressedRemove}>
            <Image style={styles.removeIcon} source={require('../images/ic-remove.png')} />
          </TouchableOpacity>
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

export default connect(({ playingTrack, playlist, screen, currentTime, duration, paused }) => {
  return {
    playingTrack,
    playlist,
    screen,
    currentTime,
    paused,
    duration,
  };
})(SearchPage);
