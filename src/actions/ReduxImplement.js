import { PLAYLIST, SUBJECT_INFO, LIST_SUBJECT_INFO } from '../fake-data';

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
  SET_RECENT_SEARCHES: 'SET_RECENT_SEARCHES',
  PURGE: 'PURGE',
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
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
  setRecentSearches: list => {
    return { type: types.SET_RECENT_SEARCHES, payload: list };
  },
  purge: () => {
    return { type: types.PURGE };
  },
};

// Initial state of the store
const initialState = {
  playingTrack: {
    title: 'No song is playing',
    artist: ' •  • ',
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
};

// Function to handle actions and update the state of the store.
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { favoriteTracks, recentlyPlayedItems, userPlaylists } = state;

  switch (type) {
    case types.SET_CURRENT_SCREEN: {
      return {
        ...state,
        screen: payload,
      };
    }
    case types.SET_LIST_OF_SUBJECT_INFO: {
      return {
        ...state,
        listOfSubjectInfo: payload,
      };
    }
    case types.SET_CURRENT_SONG_TIME: {
      return {
        ...state,
        currentTime: payload,
      };
    }
    case types.SET_PLAYING_PLAYLIST: {
      return {
        ...state,
        playlist: payload,
      };
    }
    case types.SET_PLAYING_TRACK: {
      return {
        ...state,
        playingTrack: payload,
      };
    }
    case types.SET_PAUSED: {
      return {
        ...state,
        paused: payload,
      };
    }
    case types.SET_DURATION: {
      return {
        ...state,
        duration: payload,
      };
    }
    case types.ADD_FAVORITE_TRACKS: {
      if (favoriteTracks.indexOf(payload) !== -1) return {};

      return {
        ...state,
        favoriteTracks: [payload, ...favoriteTracks],
      };
    }
    case types.REMOVE_FAVORITE_TRACKS: {
      return {
        ...state,
        favoriteTracks: favoriteTracks.filter((track, i) => track !== payload),
      };
    }
    case types.ADD_RECENTLY_PLAYED: {
      return {
        ...state,

        // Get 15 recently played: playlist or song.
        recentlyPlayedItems: [payload, ...recentlyPlayedItems].slice(0, 14),
      };
    }
    case types.REMOVE_RECENTLY_PLAYED: {
      return {
        ...state,
        recentlyPlayedItems: recentlyPlayedItems.filter((track, i) => track !== payload),
      };
    }
    case types.ADD_USER_PLAYLISTS: {
      return {
        ...state,

        // Get 15 recently played: playlist or song.
        userPlaylists: [payload, ...userPlaylists],
      };
    }
    case types.REMOVE_USER_PLAYLISTS: {
      return {
        ...state,
        userPlaylists: userPlaylists.filter((track, i) => track !== payload),
      };
    }
    case types.ADD_TRACK_TO_PLAYLIST: {
      const index = userPlaylists.indexOf(payload.playlist);
      userPlaylists[index].push(payload.track);
      return {
        ...state,
        userPlaylists,
      };
    }
    case types.SET_RECENT_SEARCHES: {
      return {
        ...state,
        recentSearches: payload,
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
