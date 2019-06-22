import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/redux-persist';
import MiniPlayer from '../components/mini-player/MiniPlayer';
import SubjectList from '../components/subject-list/SubjectList';
import { port } from '../constant';

class HomePage extends Component {
  constructor(props) {
    super(props);
    const { playingTrack, playlist, screen, currentTime, listOfSubjectInfo, paused } = this.props;
    this.state = {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
      paused,
    };
  }

  componentDidMount() {
    const subjects = [];
    const { dispatch } = this.props;
    // dispatch(actionCreators.purge());

    fetch(`${port}/recommends`)
      .then(res => res.json())
      .then(json => {
        json.forEach(data => {
          const obj = {};
          obj.subject = data.title;
          obj.description = data.description;
          obj.playlists = data.playlists;
          subjects.push(obj);
        });
        dispatch(actionCreators.setListOfSubjectInfo(subjects));
        console.log(subjects);
      });
  }

  onPressedPlaylist = item => {
    const { dispatch, navigation } = this.props;
    let playlist = {};
    fetch(`${port}/playlists/${item._id}`)
      .then(res => res.json())
      .then(data => {
        playlist = {
          name: data.title,
          tracks: data.songs,
          playlistArtUrl: data.playlistArtUrl,
        };
        dispatch(actionCreators.setPlayingPlaylist(playlist));
        dispatch(actionCreators.setCurrentSongTime(0));
        dispatch(actionCreators.setPlayingTrack(playlist.tracks[0]));
        dispatch(
          actionCreators.addRecentlyPlayed({
            type: 'playlist',
            data: playlist,
          })
        );

        navigation.navigate('Player');
      });

    // Add to recent play
    // console.log('Plalist on pressed: 1');
    // console.log(playlist);
    // (playlist.name);
    // const recentItem = {
    //   type: 'playlist',
    //   data: {
    //     name: playlist.name,
    //     tracks: playlist.tracks,
    //     playlistArtUrl: playlist.playlistArtUrl,
    //   },
    // };

    // dispatch(actionCreators.addRecentlyPlayed(recentItem));
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

  render() {
    const { listOfSubjectInfo, paused, playingTrack, duration, currentTime } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#2b3535', '#121212', '#121212']}
            style={styles.linearGradientEffect}
          />
          <FlatList
            style={styles.flatList}
            data={listOfSubjectInfo}
            renderItem={({ item }) => (
              <Item subjectInfo={item} onPressedItem={this.onPressedPlaylist} />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => <View style={{ height: 100 }} />}
          />
        </View>
        <View style={{ flex: 0.095, backgroundColor: '#121212' }}>
          <MiniPlayer
            songName={playingTrack.title}
            artist={playingTrack.artist}
            paused={paused}
            onPressedPlay={this.togglePlayingState}
            onPressedUpArrow={this.navigateToPlayer}
            onPressedText={this.navigateToPlayer}
            duration={duration}
            currentTime={currentTime}
          />
        </View>
      </View>
    );
  }
}

const Item = ({ subjectInfo, onPressedItem }) => {
  return (
    <View style={styles.item}>
      <SubjectList subjectInfo={subjectInfo} onPressedItem={onPressedItem} />
    </View>
  );
};

const { height } = Dimensions.get('window');
const verticalMarginOfSubjectList = 0.036;
const styles = StyleSheet.create({
  container: {
    flex: 0.905,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(18,18,18)',
  },
  linearGradientEffect: {
    width: '100%',
    height: '100%',
  },
  flatList: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 30,
  },
  item: {
    marginTop: verticalMarginOfSubjectList * height,
    marginBottom: verticalMarginOfSubjectList * height,
  },
});

export default connect(
  ({ playingTrack, playlist, screen, currentTime, listOfSubjectInfo, paused, duration }) => {
    return {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
      paused,
      duration,
    };
  }
)(HomePage);
