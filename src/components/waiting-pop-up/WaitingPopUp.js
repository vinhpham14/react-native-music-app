import React from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';

export default class WaitingPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeDotOne: new Animated.Value(sizeDotDefault),
      sizeDotTwo: new Animated.Value(sizeDotDefault),
      sizeDotThree: new Animated.Value(sizeDotDefault)
    };
  }

  animationDotOne = () => {
    return Animated.timing(this.state.sizeDotOne, {
      toValue: sizeDotDefault + 10,
      duration: 450,
    }).start(() => {
      Animated.timing(this.state.sizeDotOne, {
        toValue: sizeDotDefault,
        duration: 450,
      }).start();
    });
  };

  animationDotTwo = () => {
    return Animated.timing(this.state.sizeDotTwo, {
      toValue: sizeDotDefault + 10,
      duration: 450,
    }).start(() => {
      Animated.timing(this.state.sizeDotTwo, {
        toValue: sizeDotDefault,
        duration: 450,
      }).start();
    });
  };

  animationDotThree = () => {
    return Animated.timing(this.state.sizeDotThree, {
      toValue: sizeDotDefault + 10,
      duration: 450,
    }).start(() => {
      Animated.timing(this.state.sizeDotThree, {
        toValue: sizeDotDefault,
        duration: 450,
      }).start();
    });
  };

  animationWaiting = () => {
    // setTimeout(this.animationDotOne, 0);
    // setTimeout(this.animationDotTwo, 1000),
    // setTimeout(this.animationDotThree, 3000);
    setTimeout(() => {
      this.animationDotOne();
      setTimeout(() => {
        this.animationDotTwo();
        setTimeout(() => {
          this.animationDotThree();
        }, 250)
      }, 250);
    }, 0);
  };

  componentDidMount() {
    this.animationWaiting();
    setInterval(this.animationWaiting, 1700);
  }

  render() {
    return (
      <Animated.View style={styles.box}>
        <Dot size={this.state.sizeDotOne} />
        <Dot size={this.state.sizeDotTwo} />
        <Dot size={this.state.sizeDotThree} />
      </Animated.View>
    );
  }
}

const Dot = ({ size }) => {
  return <Animated.View style={[styles.dot, { width: size, height: size }]} />;
};

const { width, height } = Dimensions.get('window');
const boxSize = width * 0.374;
const sizeDotDefault = boxSize * 0.107;
const topBox = (height - boxSize) / 2;
const leftBox = (width - boxSize) / 2;
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: boxSize,
    height: boxSize,
    backgroundColor: 'black',
    top: topBox,
    left: leftBox,
    borderRadius: 10,
    paddingHorizontal: 0.24 * boxSize,
    opacity: 0.8,
    position: 'absolute',
  },

  dot: {
    backgroundColor: 'white',
    borderRadius: 90
  }
});
