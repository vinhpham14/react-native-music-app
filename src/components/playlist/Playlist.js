/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Playlist extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.onBackPressed();
      return true;
    });
  }

  render() {
    const { playlist } = this.props;

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <LinearGradient colors={['#2b3535', '#121212']} style={styles.header} />

          <View style={styles.playlistDetails}>
            <Image style={styles.playlistArt} source={{ uri: playlist.playlistArtUrl }} />
            <Text style={styles.playlistTitle}>{playlist.name}</Text>
            <Text style={styles.playlistSubtitle}>{`${playlist.tracks.length} SONGS`}</Text>
            <TouchableOpacity style={styles.playlistButton}>
              <Text style={styles.playlistButtonText}>SHUFFLE PLAY</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.list}
            data={playlist.tracks}
            renderItem={({ item }) => (
              <View style={styles.playlistItem}>
                <Text style={styles.playlistItemTitle}>{item.title}</Text>
                <Text style={styles.playlistItemMeta}>{`${item.artist}`}</Text>
                {/* <Text style={styles.playlistItemMeta}>{`${item.artist} • ${item.album}`}</Text> */}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: (5 * height) / 100 + 400, // 400: height of playlistDetails
  },
  list: {
    width: '100%',
    backgroundColor: '#121212',
  },
  playlistDetails: {
    width: '100%',
    height: 400,
    position: 'absolute',
    top: 50,
    display: 'flex',
    alignItems: 'center',
  },
  playlistArt: {
    width: 180,
    height: 180,
  },
  playlistTitle: {
    // fontFamily: 'gibson-bold',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
  },
  playlistSubtitle: {
    // fontFamily: 'gibson-regular',
    color: '#b9bdbe',
    fontSize: 12,
    marginTop: 15,
  },
  playlistButton: {
    backgroundColor: '#2ab759',
    width: 230,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 30,
  },
  playlistButtonText: {
    // fontFamily: 'gibson-bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  playlistItem: {
    marginLeft: 25,
    marginBottom: 25,
  },
  playlistItemTitle: {
    // fontFamily: 'gibson-bold',
    fontSize: 18,
    color: '#fff',
  },
  playlistItemMeta: {
    // fontFamily: 'gibson-regular',
    color: '#b9bdbe',
    fontSize: 15,
  },
});
