import React, { Component } from 'react'
import { View, StatusBar, Text, Alert, ScrollView, Dimensions } from 'react-native'
import Video from 'react-native-video'

import Header from '../components/header/Header';
import AlbumArt from '../components/album/AlbumArt';
import TrackDetails from '../components/track-details/TrackDetails';
import SeekBar from '../components/seek-bar/SeekBar';
import Controls from '../components/controls/Controls';
import Playlist from '../components/playlist/Playlist'
import LinearGradient from 'react-native-linear-gradient'

export default class PlayerPage extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      paused: false,
      duration: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      isChanging: false,
      showPlaylist: false,
    };
  }

  setDuration = (data) => {
    this.setState({
      duration: Math.floor(data.duration)
    });
  }

  setCurrentPosition = (data) => {
    this.setState({
      currentPosition: Math.floor(data.currentTime)
    });
  }

  onSliding = (time) => {
    time = Math.round(time);
    this.videoPlayer.seek(time);
    this.setState({
      currentPosition: time,
      paused: true
    })
  }

  videoError = () => {
    Alert.alert(
      'Cannot found the music',
      'Cannot found the music',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  onBack = () => {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.videoPlayer !== undefined && this.videoPlayer.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        duration: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.videoPlayer.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward = () => {
    if (this.state.selectedTrack < this.props.playlist.tracks.length - 1) {
      this.videoPlayer !== undefined && this.videoPlayer.seek(0);
      this.setState({ isChanging: true });

      // Get the next track
      const nextTrack = (this.state.shuffleOn) ?
        Math.floor(Math.random() * (this.props.playlist.tracks.length)) : this.state.selectedTrack + 1;

      console.log('shuffle' + this.state.shuffleOn)
      console.log('rd' + nextTrack)

      setTimeout(() => this.setState({
        currentPosition: 0,
        duration: 1,
        paused: false,
        isChanging: false,
        selectedTrack: nextTrack
      }), 0);

      setTimeout(() => {
        this.setState
      });
    }
  }

  onEnd = () => {
    if (this.state.repeatOn === true) {
      this.videoPlayer !== undefined && this.videoPlayer.seek(0);
    } else {
      this.onForward();
    }
  }

  render() {
    const playlist = this.props.playlist;
    const track = playlist.tracks[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video
        source={{ uri: track.audioUrl }}
        ref={(ref) => {
          this.videoPlayer = ref
        }}
        paused={this.state.paused}              // Pauses playback entirely.
        resizeMode="cover"                      // Fill the whole screen at aspect ratio.
        //repeat={this.state.repeatOn}            // Repeat forever. ==> Not working, proceed by onEnd instead
        onLoadStart={this.loadStart}            // Callback when video starts to load
        onLoad={this.setDuration}               // Callback when video loads
        onProgress={this.setCurrentPosition}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}                  // Callback when playback finishes
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.audioElement}
        rate={1.0}
        volume={1.0}
        muted={false}
        audioOnly={true}
      />
    );

    const playerView = (
      //<View style={styles.container}>
      <View>
        <LinearGradient colors={['#2b3535', '#121212', '#121212']} style={styles.header} />
        <View style={{ position: 'absolute' }}>
          <StatusBar hidden={true} />
          <Header
            message="PLAYING FROM CHARTS"
            onPlaylistPress={() => this.setState({ showPlaylist: true })}
          />
          <AlbumArt url={track.albumArtUrl} />
          <TrackDetails title={track.title} artist={track.artist} />
          <SeekBar
            onSliding={this.onSliding}
            duration={this.state.duration}
            currentPosition={this.state.currentPosition}
            onSlidingComplete={() => this.setState({ paused: false })}
          />
          <Controls
            onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn })}
            repeatOn={this.state.repeatOn}
            shuffleOn={this.state.shuffleOn}
            forwardDisabled={this.state.selectedTrack === playlist.tracks.length - 1}
            onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn })}
            onPressPlay={() => this.setState({ paused: false })}
            onPressPause={() => this.setState({ paused: true })}
            onBack={this.onBack}
            onForward={this.onForward}
            paused={this.state.paused}
          />
        </View>
      </View>

      // {/* </View> */ }
    )

    const playlistView = 
      <Playlist 
        onBackPressed={() => { this.setState({ showPlaylist: false }) }} 
        playlist={playlist}
      />

    return (
      <View style={styles.container}>
        {this.state.showPlaylist ? playlistView : playerView}
        {video}
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window');
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  header: {
    width: '100%',
    height: '100%'
  },
};