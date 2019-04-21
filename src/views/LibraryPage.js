import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Item, SearchResult } from './SearchPage';
import MiniPlayer from '../components/mini-player/MiniPlayer';
import { actionCreators } from '../actions/ReduxImplement';

class LibraryPage extends Component {
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
    console.log('AAAAAAAAAA>>>>><<><><><><<');
    const { navigation } = this.props;
    navigation.navigate('Player');
  };

  updatePlayingTrack = payload => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setPlayingTrack(payload));
  };

  render() {
    const { favoriteTracks, playingTrack, paused, duration, currentTime } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(18,18,18)' }}>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HeaderPage text="Your Library" />
        </View>
        <View style={{ flex: 0.805 }}>
          <ScrollView style={{ flex: 1, height: '100%' }}>
            <Text style={styles.categoryText}> Your favorite songs </Text>
            <CustomList
              onItemPressed={track => {
                this.updatePlayingTrack(track);
                this.navigateToPlayer();
              }}
              data={favoriteTracks}
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

const CustomList = ({ data, onItemPressed }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ width: '100%', marginTop: 15 }}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={obj => (
          <Item
            data={obj.item}
            onPress={() => onItemPressed(obj.item)}
            enableRemove={false}
            imageStyle={styles.image}
          />
        )}
      />
    </View>
  );
};

const HeaderPage = ({ text }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(34, 35, 38)',
      }}
    >
      <View style={{ flex: 0.1, alignContent: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Image
            source={require('../images/ic-back-arrow.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.8 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {text}
        </Text>
      </View>
      <View style={{ flex: 0.1 }} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const imageSize = 0.15 * width;
const styles = StyleSheet.create({
  categoryText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    marginTop: 25,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 2,
  },
});

export default connect(({ favoriteTracks, playingTrack, paused, duration, currentTime }) => {
  return {
    favoriteTracks,
    playingTrack,
    paused,
    duration,
    currentTime,
  };
})(LibraryPage);
