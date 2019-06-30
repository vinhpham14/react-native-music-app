import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';
import { getUser, getSong } from '../actions/server-api';
import WaitingPopUp from '../components/waiting-pop-up/WaitingPopUp';
import { actionCreators } from '../actions/redux-persist';
import { connect } from 'react-redux';
import { defaultPlaylistArtUrl } from '../constant';
import CheckSquare from '../components/check-square/CheckSquare';

class InputAccountPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showWaitingPopUp: false
    };
  }

  hiddenText = text => {
    let hiddenText = '';
    for (let i = 0; i < text.length; i++) {
      hiddenText += '*';
    }

    return hiddenText;
  };

  updatePassword = value => {
    const { password } = this.state;

    // Need to refactoring
    if (value.length < this.state.password.length)
      this.setState({
        password: password.substr(0, this.state.password.length - 1)
      });
    else
      this.setState({
        password: password + value[value.length - 1]
      });
  };

  updateUsername = value => {
    this.setState({
      username: value
    });
  };

  enableLoginButton = () => {
    const { username, password } = this.state;
    if (username === '' || password === '') return false;
    return true;
  };

  onPressBack = () => {
    const { navigation } = this.props;
    navigation.navigate('LoggedOut');
  };

  onPressLoginInButton = () => {
    const { username, password } = this.state;
    this.setState({
      showWaitingPopUp: true
    });

    setTimeout(() => {
      getUser(username, password).then(json => {
        this.setState({
          showWaitingPopUp: false,
        });

        // Navigate to home
        if (json.result === true) {
          this.setState({
            showTick: true,
          });

          const promise = new Promise((resolve, reject) => {
            this.props.dispatch(actionCreators.clearForUserLogin());

            // Update favorite songs
            json.user.favoriteSongs.forEach(item => {
              getSong(item).then(song => {
                this.props.dispatch(actionCreators.addFavoriteTrack(song));
              });
            });

            // Update user's playlists
            json.user.playlist.forEach(item => {
              let newPlaylist = {};
              newPlaylist.name = item.name;
              newPlaylist.playlistArtUrl = defaultPlaylistArtUrl;
              newPlaylist.tracks = [];
              item.songs.forEach(item => {
                getSong(item).then(song => {
                  newPlaylist.tracks.push(song);
                });
              });

              this.props.dispatch(actionCreators.addUserPlaylists(newPlaylist));
            });

            // Update user
            this.props.dispatch(
              actionCreators.setUser({
                ...json.user
              })
            );

            setTimeout(() => {resolve()}, 600);
          }).then(() => {
            this.setState({
              showTick: false,
            })
            this.props.navigation.navigate('Home');
          });
        } else {
          // Wrong username or password
          Alert.alert('Login Failed', 'Username or password is not correct.', [
            {
              text: 'CREATE NEW ACCOUNT',
              onPress: () => {
                this.props.navigation.navigate('CreateAccount');
              },
              style: 'destructive'
            },
            {
              text: 'TRY AGAIN',
              onPress: () => {
                // Nothing here
              },
              style: 'default'
            }
          ]);
        }
      });
    }, 1450);
  };

  onPressForgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate('FindAccount');
  };

  render() {
    const { password, username, showWaitingPopUp, showTick } = this.state;

    return (
      <LinearGradient
        style={styles.container}
        colors={['#4100f4', '#ef37a5']}
        useAngle
        angle={-45}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.5, y: 0.7 }}
      >
        <View
          style={{ width: '100%', alignItems: 'flex-start', paddingLeft: (width - inputWidth) / 4 }}
        >
          <TouchableOpacity onPress={this.onPressBack}>
            <IconGenerator iconName={iconNames.BackArrowIcon} size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>Log In</Text>
        <InputWithHeader headerText="Username" value={username} onChange={this.updateUsername} />
        <InputWithHeader
          headerText="Password"
          value={this.hiddenText(password)}
          onChange={this.updatePassword}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: (width - inputWidth) / 2,
            marginBottom: 150,
            marginTop: 30
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              height: '100%',
              textAlignVertical: 'center',
              textDecorationLine: 'underline'
            }}
            onPress={this.onPressForgotPassword}
          >
            Forgot the password?
          </Text>
          <TouchableOpacity
            style={[styles.buttonLogin, { opacity: this.enableLoginButton() ? 1 : 0.3 }]}
            disabled={!this.enableLoginButton()}
            onPress={this.onPressLoginInButton}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        {showWaitingPopUp ? <WaitingPopUp /> : null}
        {showTick ? <CheckSquare /> : null}
      </LinearGradient>
    );
  }
}

const InputWithHeader = ({ headerText, value, onChange }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputHeader}> {headerText} </Text>
      <View>
        <View
          style={{
            width: inputWidth,
            height: inputHeight,
            borderRadius: 5,
            backgroundColor: 'white',
            opacity: 0.5
          }}
        />
        <TextInput style={styles.input} value={value} onChangeText={onChange} />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const inputWidth = 0.86 * width;
const inputHeight = 0.072 * height;
const buttonLoginWidth = 0.3 * width;
const buttonLoginHeight = 0.048 * height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },

  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 20
  },

  buttonLogin: {
    backgroundColor: 'white',
    borderRadius: 90,
    height: buttonLoginHeight,
    width: buttonLoginWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    height: 50,
    width: inputWidth,
    color: 'white',
    position: 'absolute',
    marginLeft: 10,
    fontSize: 17
  },

  inputHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10
  },

  textHeader: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 10
  }
});

export default connect(({ user }) => {
  return {
    user
  };
})(InputAccountPage);
