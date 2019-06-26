import React from 'react';
import { Image } from 'react-native';

export const iconNames = {
  HomeTabButton: 'home',
  PlayerTabButton: 'player-arrow',
  UpArrow: 'up-arrow',
  PlayMusic: 'play-music-button',
  PauseMusic: 'pause',
  SearchTabButton: 'search-button',
  Library: 'library',
  Playlists: 'playlists',
  Songs: 'fav-songs',
  RemoveButton: 'remove-button',
  LogoApp: 'logo-app',
  BackArrowIcon: 'back-arrow'
};

const IconGenerator = ({ iconName, size, onFocused = 1 }) => {
  const opacity = onFocused ? 1 : 0.4;

  let src = '';
  switch (iconName) {
    case iconNames.HomeTabButton:
      src = require('../../images/ic-home.png');
      break;
    case iconNames.PlayerTabButton:
      src = require('../../images/ic-player-arrow.png');
      break;
    case iconNames.UpArrow:
      src = require('../../images/ic-up-arrow.png');
      break;
    case iconNames.PlayMusic:
      src = require('../../images/ic-play-arrow.png');
      break;
    case iconNames.PauseMusic:
      src = require('../../images/ic-pause.png');
      break;
    case iconNames.SearchTabButton:
      src = require('../../images/ic-search.png');
      break;
    case iconNames.Library:
      src = require('../../images/ic-user.png');
      break;
    case iconNames.Playlists:
      src = require('../../images/ic-playlists.png');
      break;
    case iconNames.Songs:
      src = require('../../images/ic-favorite-songs.png');
      break;
    case iconNames.RemoveButton:
      src = require('../../images/ic-remove.png');
      break;
    case iconNames.LogoApp:
      src = require('../../images/logo-app.png');
      break;
    case iconNames.BackArrowIcon:
      src = require('../../images/ic-back-arrow.png');
      break;
    default:
      break;
  }

  return <Image style={{ height: size, width: size, opacity }} source={src} />;
};

export default IconGenerator;
