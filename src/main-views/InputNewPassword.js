import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';
import CheckSqure from '../components/check-square/CheckSquare';
import { findUser } from '../actions/server-api';

export default class FindAccountPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      question: '',
      answer: '',
      newPassword: '',
      confirmNewPassword: '',
      showTick: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const _username = navigation.getParam('username');
    const _question = navigation.getParam('question');
    const _answer = navigation.getParam('answer');

    this.setState({
      username: _username,
      question: _question,
      answer: _answer
    });
  }

  hiddenText = text => {
    let hiddenText = '';
    for (let i = 0; i < text.length; i++) {
      hiddenText += '*';
    }

    return hiddenText;
  };

  updateNewPassword = value => {
    const { newPassword } = this.state;

    // Need to refactoring
    if (value.length < this.state.newPassword.length)
      this.setState({
        newPassword: newPassword.substr(0, this.state.newPassword.length - 1)
      });
    else
      this.setState({
        newPassword: newPassword + value[value.length - 1]
      });
  };

  updateConfirmNewPassword = value => {
    const { confirmNewPassword } = this.state;

    // Need to refactoring
    if (value.length < this.state.confirmNewPassword.length)
      this.setState({
        confirmNewPassword: confirmNewPassword.substr(0, this.state.confirmNewPassword.length - 1)
      });
    else
      this.setState({
        confirmNewPassword: confirmNewPassword + value[value.length - 1]
      });
  };

  onPressCreate = () => {
    const { newPassword, confirmNewPassword, username, question, answer } = this.state;
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Create New Password Failed', 'Confirm the new password not match.', [
        {
          text: 'TRY AGAIN',
          onPress: () => {
            // Nothing here
          },
          style: 'default'
        }
      ]);
    } else {
      // confirming matched
      findUser(username, question, answer, newPassword).then(json => {
        this.setState({
          showTick: true,
        })

        setTimeout(() => {
          this.setState({
            showTick: false,
          });

          this.props.navigation.navigate('InputAccount');
        }, 600)
      })
    }
  };

  enableLoginButton = () => {
    const { newPassword, confirmNewPassword } = this.state;
    if (newPassword === '' || confirmNewPassword === '') return false;
    return true;
  };

  render() {
    const { newPassword, confirmNewPassword, showTick } = this.state;

    return (
      <LinearGradient
        style={styles.container}
        colors={['#ef37a5', '#4100f4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 0.9 }}
      >
        {/* <View
          style={{ width: '100%', alignItems: 'flex-start', paddingLeft: (width - inputWidth) / 4 }}
        >
          <TouchableOpacity onPress={this.onPressBack}>
            <IconGenerator iconName={iconNames.BackArrowIcon} size={20} />
          </TouchableOpacity>
        </View> */}
        <Text style={styles.textHeader}>Create New Password</Text>
        <InputWithHeader
          headerText="Input your new password here: "
          value={this.hiddenText(newPassword)}
          onChange={this.updateNewPassword}
        />

        <InputWithHeader
          headerText="Confirm your new password. "
          value={this.hiddenText(confirmNewPassword)}
          onChange={this.updateConfirmNewPassword}
        />

        <TouchableOpacity
          style={[styles.buttonCreate, { opacity: this.enableLoginButton() ? 1 : 0.5 }]}
          disabled={!this.enableLoginButton()}
          onPress={this.onPressCreate}
        >
          <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>Create</Text>
        </TouchableOpacity>

        {showTick ? <CheckSqure /> : null}
      </LinearGradient>
    );
  }
}

const InputWithHeader = ({ headerText, value, onChange }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputHeader}> {headerText} </Text>
      <View>
        <View style={styles.opacityContainerForInput} />
        <TextInput style={styles.input} value={value} onChangeText={onChange} />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const inputWidth = 0.86 * width;
const inputHeight = 0.072 * height;
const buttonLoginWidth = 0.45 * width;
const buttonLoginHeight = 0.08 * height;
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
    marginVertical: 15
  },

  buttonCreate: {
    backgroundColor: 'white',
    borderRadius: 90,
    height: buttonLoginHeight,
    width: buttonLoginWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
    marginBottom: 14
  },

  textHeader: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 25,
    marginTop: 30
  },

  opacityContainerForInput: {
    width: inputWidth,
    height: inputHeight,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.5
  },

  picker: {
    width: inputWidth,
    height: inputHeight,
    position: 'absolute',
    color: 'white',
    fontWeight: '400'
  }
});
