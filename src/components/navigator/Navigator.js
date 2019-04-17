import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const Navigator = ({ onHomePressed, onSearchPressed, onPlayerPressed, selector }) => {
  let opacityHome = 0.55;
  let opacityPlayer = 0.55;
  let opacitySearch = 0.55;

  if (selector === 'home') opacityHome = 1;
  if (selector === 'search') opacitySearch = 1;
  if (selector === 'player') opacityPlayer = 1;

  console.log(selector);
  console.log(opacityHome);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onHomePressed}
        style={[styles.touchableOpacity, { opacity: opacityHome }]}
      >
        <Image style={styles.image} source={require('../../images/ic-home.png')} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPlayerPressed}
        style={[styles.touchableOpacity, { opacity: opacityPlayer }]}
      >
        <Image style={styles.image} source={require('../../images/ic-play-arrow.png')} />
        <Text style={styles.text}>Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSearchPressed}
        style={[styles.touchableOpacity, { opacity: opacitySearch }]}
      >
        <Image style={styles.image} source={require('../../images/ic-glass-brower.png')} />
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '20%',
  },
  image: {
    height: 22,
    width: 22,
  },
  text: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  touchableOpacity: {
    alignItems: 'center',
  },
});
