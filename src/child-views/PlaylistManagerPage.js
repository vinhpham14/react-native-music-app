import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/redux-persist';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';

class PlaylistManagerPage extends Component {
  static navigationOptions = {
    title: 'Playlists',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onRemovePressed = removePlaylist => {
    const { dispatch } = this.props;
    dispatch(actionCreators.removeUserPlaylists(removePlaylist));
  };

  render() {
    const { userPlaylists } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(18,18,18)' }}>
        <View
          style={{
            flex: 0.18,
            width: '100%',
            backgroundColor: 'rgb(18,18,18)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
              navigation.navigate('InputName');
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
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: 0.82 }}
          data={userPlaylists}
          renderItem={({ item }) => (
            <Item
              item={item}
              onRemovePressed={() => this.onRemovePressed(item)}
              onPressItem={() => {
                const { dispatch, navigation } = this.props;
                const playlist = { ...item };
                if (playlist.tracks.length !== 0) {
                  playlist.playlistArtUrl =
                    'https://contentpl-a.akamaihd.net/images/genre_moods/image/medium/Compilation.jpg';
                  dispatch(actionCreators.setPlayingPlaylist(playlist));
                  dispatch(actionCreators.setPlayingTrack(playlist.tracks[0]));
                  dispatch(actionCreators.setShowPlaylistInPlayer(true));
                  navigation.navigate('Player');
                }
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const Item = ({ item, onRemovePressed, onPressItem }) => {
  return (
    <View
      style={{
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 25,
        marginTop: 7,
      }}
    >
      <View style={{ flex: 0.2, alignItems: 'center' }}>
        <Image
          source={require('../images/ic-playlists.png')}
          style={{
            width: imagePlaylistSize,
            height: imagePlaylistSize,
          }}
        />
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Text onPress={onPressItem} style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>
          {item.name}
        </Text>
        <Text style={{ color: 'rgb(179, 179, 179)', fontSize: 13, marginLeft: 10 }}>
          {`${item.tracks.length} songs`}
        </Text>
      </View>

      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={onRemovePressed}>
          <IconGenerator iconName={iconNames.RemoveButton} size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get('window');
const buttonWidth = 0.45 * width;
const buttonHeight = 0.07 * height;
const imagePlaylistSize = 0.1 * width;
const styles = StyleSheet.create({
  playlistList: {},
});

export default connect(({ userPlaylists }) => {
  return {
    userPlaylists,
  };
})(PlaylistManagerPage);
