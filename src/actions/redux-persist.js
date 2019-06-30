import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import { PLAYLIST, SUBJECT_INFO, LIST_SUBJECT_INFO } from '../fake-data';
import { updateUserFavoriteSongs, updateUserPlaylists } from '../actions/server-api';
import { defaultPlaylistArtUrl } from '../constant';

export const types = {
  SET_PLAYING_PLAYLIST: 'SET_PLAYING_PLAYLIST',
  SET_PLAYING_TRACK: 'SET_PLAYING_TRACK',
  SET_CURRENT_SONG_TIME: 'SET_CURRENT_SONG_TIME',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  SET_LIST_OF_SUBJECT_INFO: 'SET_LIST_OF_SUBJECT_INFO',
  SET_PAUSED: 'SET_PAUSED',
  SET_DURATION: 'SET_DURATION',
  ADD_FAVORITE_TRACKS: 'ADD_FAVORITE_TRACKS',
  REMOVE_FAVORITE_TRACKS: 'REMOVE_FAVORITE_TRACKS',
  ADD_RECENTLY_PLAYED: 'ADD_RECENTLY_PLAYED',
  REMOVE_RECENTLY_PLAYED: 'REMOVE_RECENTLY_PLAYED',
  ADD_USER_PLAYLISTS: 'ADD_USER_PLAYLISTS',
  REMOVE_USER_PLAYLISTS: 'REMOVE_USER_PLAYLISTS',
  ADD_TRACK_TO_PLAYLIST: 'ADD_TRACK_TO_PLAYLIST',
  REMOVE_TRACK_FROM_PLAYLIST: 'REMOVE_TRACK_FROM_PLAYLIST',
  SET_RECENT_SEARCHES: 'SET_RECENT_SEARCHES',
  PURGE: 'PURGE',
  SET_USER: 'SET_USER',
  SET_APP_STATE: 'SET_APP_STATE',
  CLEAR_FOR_USER_LOGIN: 'CLEAR_FOR_USER_LOGIN',
  SET_SHOW_PLAYLIST_IN_PLAYER: 'SET_SHOW_PLAYLIST_IN_PLAYER'
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  clearForUserLogin: () => {
    return { type: types.CLEAR_FOR_USER_LOGIN };
  },
  setAppState: state => {
    return { type: types.SET_APP_STATE, payload: state };
  },
  setUser: user => {
    return { type: types.SET_USER, payload: user };
  },
  setPlayingPlaylist: playlist => {
    return { type: types.SET_PLAYING_PLAYLIST, payload: playlist };
  },
  setPlayingTrack: playingTrack => {
    return { type: types.SET_PLAYING_TRACK, payload: playingTrack };
  },
  setCurrentSongTime: currentTime => {
    return { type: types.SET_CURRENT_SONG_TIME, payload: currentTime };
  },
  setCurrentScreen: screen => {
    return { type: types.SET_CURRENT_SCREEN, payload: screen };
  },
  setListOfSubjectInfo: listOfSubjectInfo => {
    return { type: types.SET_LIST_OF_SUBJECT_INFO, payload: listOfSubjectInfo };
  },
  setPaused: paused => {
    return { type: types.SET_PAUSED, payload: paused };
  },
  setDuration: duration => {
    return { type: types.SET_DURATION, payload: duration };
  },
  addFavoriteTrack: track => {
    return { type: types.ADD_FAVORITE_TRACKS, payload: track };
  },
  removeFavoriteTrack: track => {
    return { type: types.REMOVE_FAVORITE_TRACKS, payload: track };
  },
  addRecentlyPlayed: item => {
    return { type: types.ADD_RECENTLY_PLAYED, payload: item };
  },
  removeRecentlyPlayed: item => {
    return { type: types.REMOVE_RECENTLY_PLAYED, payload: item };
  },
  addUserPlaylists: item => {
    return { type: types.ADD_USER_PLAYLISTS, payload: item };
  },
  removeUserPlaylists: item => {
    return { type: types.REMOVE_USER_PLAYLISTS, payload: item };
  },
  addTrackToPlaylist: (track, playlist) => {
    return { type: types.ADD_TRACK_TO_PLAYLIST, payload: { track, playlist } };
  },
  // removeTrackFromPlaylist: (track, playlist) => {
  //   return { type: types.REMOVE_TRACK_FROM_PLAYLIST, payload: { track, playlist } };
  // },
  setRecentSearches: list => {
    return { type: types.SET_RECENT_SEARCHES, payload: list };
  },
  purge: () => {
    return { type: types.PURGE };
  },
  setShowPlaylistInPlayer: showPlaylistInPlayer => {
    return { type: types.SET_SHOW_PLAYLIST_IN_PLAYER, payload: showPlaylistInPlayer };
  }
};

// Initial state of the store
const initialState = {
  playingTrack: {
    title: 'No song is playing',
    artist: ' •  • '
  },
  playlist: PLAYLIST,
  screen: 'home',
  currentTime: 0,
  listOfSubjectInfo: [],
  paused: true,
  duration: 1,
  favoriteTracks: [],
  recentlyPlayedItems: [],
  userPlaylists: [],
  recentSearches: [],
  user: {
    _id: -1
  },
  appState: {
    isOpenFirstTime: 'true'
  },
  showPlaylistInPlayer: false
};

// Function to handle actions and update the state of the store.
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { favoriteTracks, recentlyPlayedItems, userPlaylists } = state;

  switch (type) {
    case types.CLEAR_FOR_USER_LOGIN: {
      return {
        ...state,
        favoriteTracks: [],
        userPlaylists: []
      };
    }

    case types.SET_CURRENT_SCREEN: {
      return {
        ...state,
        screen: payload
      };
    }

    case types.SET_LIST_OF_SUBJECT_INFO: {
      return {
        ...state,
        listOfSubjectInfo: payload
      };
    }

    case types.SET_APP_STATE: {
      return {
        ...state,
        appState: payload
      };
    }

    case types.SET_CURRENT_SONG_TIME: {
      return {
        ...state,
        currentTime: payload
      };
    }

    case types.SET_PLAYING_PLAYLIST: {
      return {
        ...state,
        playlist: payload
      };
    }

    case types.SET_PLAYING_TRACK: {
      return {
        ...state,
        playingTrack: payload
      };
    }

    case types.SET_PAUSED: {
      return {
        ...state,
        paused: payload
      };
    }

    case types.SET_DURATION: {
      return {
        ...state,
        duration: payload
      };
    }

    case types.ADD_FAVORITE_TRACKS: {
      if (favoriteTracks.indexOf(payload) !== -1) return {};

      const newFavoriteTracks = [payload, ...favoriteTracks];

      // Sync with server
      const updateList = [];
      newFavoriteTracks.forEach(item => {
        updateList.push(item._id);
      });
      if (state.user._id !== -1) {
        updateUserFavoriteSongs(state.user._id, updateList).then(() => {});
      }

      return {
        ...state,
        favoriteTracks: newFavoriteTracks
      };
    }

    case types.REMOVE_FAVORITE_TRACKS: {
      const newFavoriteTracks = favoriteTracks.filter((track, i) => track !== payload);
      // Sync with server
      const updateList = [];
      newFavoriteTracks.forEach(item => {
        updateList.push(item._id);
      });
      if (state.user._id !== -1) {
        updateUserFavoriteSongs(state.user._id, updateList).then(() => {});
      }

      return {
        ...state,
        favoriteTracks: newFavoriteTracks
      };
    }

    case types.ADD_RECENTLY_PLAYED: {
      return {
        ...state,

        // Get 15 recently played: playlist or song.
        recentlyPlayedItems: [payload, ...recentlyPlayedItems].slice(0, 14)
      };
    }

    case types.REMOVE_RECENTLY_PLAYED: {
      return {
        ...state,
        recentlyPlayedItems: recentlyPlayedItems.filter((track, i) => track !== payload)
      };
    }

    case types.ADD_USER_PLAYLISTS: {
      const newList = [payload, ...userPlaylists];
      syncUserPlaylists(state.user._id, newList);

      return {
        ...state,
        userPlaylists: newList
      };
    }

    case types.REMOVE_USER_PLAYLISTS: {
      const newUserPlaylists = state.userPlaylists.filter((track, i) => track !== payload);
      syncUserPlaylists(state.user._id, newUserPlaylists);

      return {
        ...state,
        userPlaylists: newUserPlaylists
      };
    }

    case types.ADD_TRACK_TO_PLAYLIST: {
      const index = userPlaylists.indexOf(payload.playlist);

      if (userPlaylists[index].tracks.indexOf(payload.track) < 0)
        userPlaylists[index].tracks.push(payload.track);

      // Trigger the screens that pulled this props to update.
      const newUserPlaylists = [...userPlaylists];

      // Sync with server
      syncUserPlaylists(state.user._id, newUserPlaylists);

      return {
        ...state,
        userPlaylists: newUserPlaylists
      };
    }

    case types.REMOVE_TRACK_FROM_PLAYLIST: {
      let i = 0;
      for (i = 0; i < userPlaylists.length; i++) {
        if (userPlaylists[i].name === payload.playlist.name) {
          break;
        }
      }

      console.log('indise');
      console.log(i);

      userPlaylists[i].tracks = userPlaylists[i].tracks.filter((track, i) => {
        track._id !== payload.track._id;
      });

      const newUserPlaylists = [...userPlaylists];

      // Sync with server
      syncUserPlaylists(state.user._id, newUserPlaylists);

      return {
        ...state,
        userPlaylists: newUserPlaylists
      };
    }

    case types.SET_RECENT_SEARCHES: {
      return {
        ...state,
        recentSearches: payload
      };
    }

    case types.SET_USER: {
      const newUser = {
        ...payload
      };
      return {
        ...state,
        user: newUser
      };
    }

    case types.SET_SHOW_PLAYLIST_IN_PLAYER: {
      console.log('inside set show playlist');
      console.log(payload);
      return {
        ...state,
        showPlaylistInPlayer: payload
      };
    }

    case types.PURGE: {
      return {};
    }

    default: {
      return state;
    }
  }
};

// Implement redux persist
// Thank to https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975.
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  timeout: null
};

const pReducer = persistReducer(persistConfig, reducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);

const syncUserPlaylists = (id, playlists) => {
  if (id === -1) return;

  const newList = [];
  playlists.forEach(item => {
    const newPlaylist = {};
    newPlaylist.name = item.name;
    newPlaylist.playlistArtUrl = defaultPlaylistArtUrl;
    newPlaylist.songs = [];
    item.tracks.forEach(track => {
      newPlaylist.songs.push(track._id);
      console.log('add song');
      console.log(track);
    });

    newList.push(newPlaylist);
  });

  updateUserPlaylists(id, newList).then(rs => {
    console.log(rs);
  });
};
