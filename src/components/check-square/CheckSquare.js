import React from 'react';
import { Animated, Image, View, StyleSheet, Dimensions } from 'react-native';

export default class CheckSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeDotOne: new Animated.Value(sizeDotDefault),
      sizeDotTwo: new Animated.Value(sizeDotDefault),
      sizeDotThree: new Animated.Value(sizeDotDefault)
    };
  }

  render() {
    return (
      <View style={styles.box}>
        <Image style={styles.tick} source={require('../../images/img-check-mark.png')}/>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const boxSize = width * 0.374;
const sizeDotDefault = boxSize * 0.107;
const topBox = (height - boxSize) / 2;
const leftBox = (width - boxSize) / 2;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: boxSize,
    height: boxSize,
    backgroundColor: 'black',
    top: topBox,
    left: leftBox,
    borderRadius: 10,
    paddingHorizontal: 0.24 * boxSize,
    opacity: 0.8,
    position: 'absolute'
  },

  tick: {
    width: boxSize * 0.60,
    height: boxSize * 0.60,
    opacity: 0.85
  }
});
