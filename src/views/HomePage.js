import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import SubjectList from '../components/subject-list/SubjectList';
import { actionCreators } from '../actions/ReduxImplement';
import MiniPlayer from '../components/mini-player/MiniPlayer';

class HomePage extends Component {
  constructor(props) {
    super(props);

    const {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
      isPlaying,
    } = this.props;
    this.state = {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
      isPlaying,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('getDerivedStateFromProps of homepage:');
  //   // console.log(nextProps.isPlaying);
  //   // if (nextProps.isPlaying !== prevState.isPlaying) return { isPlaying: nextProps.isPlaying };
  //   // return {};
  // }

  onPressedPlaylist = item => {
    const { dispatch, navigation } = this.props;

    dispatch(actionCreators.setPlayingPlaylist(item));
    dispatch(actionCreators.setCurrentSongTime(0));
    dispatch(actionCreators.setPlayingTrack(item.tracks[0]));
    navigation.navigate('Player');
  };

  togglePlayingState = () => {
    const { dispatch, isPlaying } = this.props;
    dispatch(actionCreators.setMusicIsPlaying(!isPlaying));

    // NOTE:
    // After dispatch, the getDerivedStateFromProps() method
    // have not been called yet util finishing this method
  };

  render() {
    const { listOfSubjectInfo, isPlaying, playingTrack } = this.props;
    console.log('Inside the render of HomPage: ');
    console.log(this.props);
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
            ListFooterComponent={() => <View style={{ height: 150 }} />}
          />
        </View>
        <View style={{ flex: 0.095, backgroundColor: '#121212' }}>
          <MiniPlayer
            songName={playingTrack.title}
            artist={playingTrack.artist}
            isPlaying={isPlaying}
            onPressedPlay={this.togglePlayingState}
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
    backgroundColor: 'blue',
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
  ({ playingTrack, playlist, screen, currentTime, listOfSubjectInfo, isPlaying }) => {
    return {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
      isPlaying,
    };
  }
)(HomePage);
