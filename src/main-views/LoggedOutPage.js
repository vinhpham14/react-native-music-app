import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';
import { actionCreators } from '../actions/redux-persist';
import { connect } from 'react-redux';

class LoggedOutPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateAccount');
  };

  onPressLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('InputAccount');
  };

  onPressUseAsGuest = () => {
    const { navigation, dispatch } = this.props;

    // Set as guest user
    dispatch(actionCreators.setUser({
      _id: -1,
    }));
    navigation.navigate('Home');
  };

  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={['#4100f4', '#ef37a5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 0.7 }}
      >
        <AppLogo />
        <View
          style={{
            marginBottom: (15 * height) / 100,
            marginTop: (12 * height) / 100,
            alignItems: 'center'
          }}
        >
          <Text style={styles.textBig}>Millions of songs.</Text>
          <Text style={styles.textBig}>Free on iMusic.</Text>
        </View>
        <TouchableOpacity style={styles.buttonSignUp} onPress={this.onPressSignUp}>
          <Text style={styles.textSignUp}>SIGN UP FOR FREE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonUseAsGuest} onPress={this.onPressUseAsGuest}>
          <Text style={styles.textUseAsGuest}>USE AS GUEST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogin} onPress={this.onPressLogin}>
          <Text style={styles.textLogin}>LOGIN</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const AppLogo = () => {
  return (
    <View style={styles.appLogo}>
      <IconGenerator size={logoSize} iconName={iconNames.LogoApp} />
      <Text style={styles.textBig}>iMusic</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const buttonWidth = 0.86 * width;
const buttonHeight = 0.072 * height;
const logoSize = 0.18 * width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  appLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textBig: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    marginLeft: 7
  },

  textSologan: {
    fontSize: 35,
    fontWeight: '900',
    color: 'white',
    marginBottom: 10
  },

  buttonSignUp: {
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 45,
    backgroundColor: '#rgb(87, 182, 95)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  buttonLogin: {
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 45,
    backgroundColor: '#rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  buttonUseAsGuest: {
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 45,
    backgroundColor: '#rgb(65, 88, 147)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },

  textSignUp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#rgb(255, 255, 255)'
  },

  textLogin: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#rgb(18, 18, 18)'
  },

  textUseAsGuest: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#rgb(255, 255, 255)'
  }
});

export default connect(
  ({
  }) => {
    return {
    };
  }
)(LoggedOutPage);