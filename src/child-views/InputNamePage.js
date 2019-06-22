import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { actionCreators } from '../actions/redux-persist';
import { defaultPlaylistArtUrl } from '../constant';

class InputNamePage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = { playlistName: '' };
  }

  onCancelPressed = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onCreatePressed = () => {
    const { playlistName } = this.state;
    const { dispatch, navigation } = this.props;

    if (playlistName.length === 0) return;

    // TO-DO: verify name
    const newPlaylist = {
      name: playlistName,
      playlistArtUrl: defaultPlaylistArtUrl,
      tracks: [],
    };

    dispatch(actionCreators.addUserPlaylists(newPlaylist));
    navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['rgb(135, 136, 139)', 'rgb(20, 20, 20)']}
          style={{ width: '100%', height: '100%' }}
        />
        <View
          style={{
            // flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'black',
            position: 'absolute',
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white', paddingBottom: 45 }}>
            Give your playlist a name.
          </Text>
          <TextInput
            style={{
              textAlign: 'center',
              fontSize: 26,
              width: '80%',
              borderBottomWidth: 1,
              borderBottomColor: specifiedGrey,
              color: 'white',
            }}
            onChangeText={value => {
              this.setState({ playlistName: value });
            }}
          />
          <View
            style={{
              marginTop: 55,
              width: '45%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={this.onCancelPressed}>
              <Text style={{ color: 'rgb(197,197,197)', fontSize: 14, fontWeight: 'bold' }}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCreatePressed}>
              <Text style={{ color: 'rgb(29,185,84)', fontSize: 14, fontWeight: 'bold' }}>
                CREATE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const specifiedGrey = 'rgb(147,147,148)';

export default connect(({ userPlaylists }) => {
  return {
    userPlaylists,
  };
})(InputNamePage);
