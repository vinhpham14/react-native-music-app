import { PLAYLIST, SUBJECT_INFO, LIST_SUBJECT_INFO, TRACKS } from '../fake-data';

export const types = {
  SET_PLAYING_PLAYLIST: 'SET_PLAYING_PLAYLIST',
  SET_PLAYING_TRACK: 'SET_PLAYING_TRACK',
  SET_CURRENT_SONG_TIME: 'SET_CURRENT_SONG_TIME',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  SET_LIST_OF_SUBJECT_INFO: 'SET_LIST_OF_SUBJECT_INFO',
  SET_MUSIC_IS_PLAYING: 'SET_MUSIC_IS_PLAYING',
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
  setMusicIsPlaying: isPlaying => {
    console.log('In set Music: ');
    console.log(isPlaying);
    return { type: types.SET_MUSIC_IS_PLAYING, payload: isPlaying };
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
  currentTime: 10,
  listOfSubjectInfo: LIST_SUBJECT_INFO,
  isPlaying: false,
};

// Function to handle actions and update the state of the store.
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

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
    case types.SET_MUSIC_IS_PLAYING: {
      return {
        ...state,
        isPlaying: payload,
      };
    }
    default: {
      return state;
    }
  }
};
