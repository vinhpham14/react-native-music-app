import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { actionCreators } from '../actions/redux-persist';
import { defaultPlaylistArtUrl } from '../constant';

class AddToPlaylistPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = { playlistName: '' };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { navigation } = this.props;
      navigation.navigate('Player');
      return true;
    });
  }

  render() {
    const { userPlaylists } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['rgb(50, 50, 50)', 'rgb(20, 20, 20)']}
          style={{ width: '100%', height: '100%' }}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            // justifyContent: 'center',
            // alignItems: 'center',
            position: 'absolute',
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'white',
                paddingVertical: 30,
                textAlign: 'center',
                marginTop: 80,
              }}
            >
              Choose one of your playlists.
            </Text>
            <FlatList
              style={{ flex: 1, width: '100%' }}
              contentContainerStyle={{ paddingTop: 15 }}
              data={userPlaylists}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  onPlaylistPressed={() => {
                    const { dispatch, playingTrack, navigation } = this.props;
                    dispatch(actionCreators.addTrackToPlaylist(playingTrack, item));
                    navigation.goBack();
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const Item = ({ item, onPlaylistPressed }) => {
  return (
    <TouchableOpacity onPress={onPlaylistPressed}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          marginBottom: 30,
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
          <Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>{item.name}</Text>
          <Text style={{ color: 'rgb(179, 179, 179)', fontSize: 13, marginLeft: 10 }}>
            {`${item.tracks.length} songs`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const specifiedGrey = 'rgb(147,147,148)';
const { height, width } = Dimensions.get('window');
const buttonWidth = 0.45 * width;
const buttonHeight = 0.07 * height;
const imagePlaylistSize = 0.1 * width;

export default connect(({ userPlaylists, playingTrack }) => {
  return {
    userPlaylists,
    playingTrack,
  };
})(AddToPlaylistPage);
