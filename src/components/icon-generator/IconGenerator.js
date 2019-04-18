import React from 'react';
import { Image } from 'react-native';

export const iconNames = {
  Home: 'home',
  Player: 'player',
};

const IconGenerator = ({ iconName, size, onFocused }) => {
  console.log('inside the icon generator');
  console.log(iconName);
  console.log(size);
  console.log(onFocused);

  const opacity = onFocused ? 1 : 0.5;

  let src = '';
  if (iconName === iconNames.Home) src = require('../../images/ic-home.png');
  if (iconName === iconNames.Player) src = require('../../images/ic-play-arrow.png');

  // eslint-disable-next-line global-require
  // eslint-disable-next-line import/no-dynamic-require
  return <Image style={{ height: size, width: size, opacity }} source={src} />;
};

export default IconGenerator;
