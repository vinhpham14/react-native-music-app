import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  Picker
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconGenerator, { iconNames } from '../components/icon-generator/IconGenerator';

export default class FindAccountPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      question: '',
      answer: ''
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
    this.setState({
      password: value
    });
  };

  updateUsername = value => {
    this.setState({
      username: value
    });
  };

  updateQuestion = value => {
    this.setState({
      question: value
    });
  };

  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  updateAnswer = value => {
    this.setState({
      answer: value
    });
  };

  enableLoginButton = () => {
    const { username, password, question, answer } = this.state;
    if (username === '' || password === '' || question === 'Nothing' || answer === '') return false;
    return true;
  };

  render() {
    const { password, username, answer, question } = this.state;

    return (
      <LinearGradient
        style={styles.container}
        colors={['#ef37a5', '#4100f4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 0.9 }}
      >
        <View
          style={{ width: '100%', alignItems: 'flex-start', paddingLeft: (width - inputWidth) / 4 }}
        >
          <TouchableOpacity onPress={this.onPressBack}>
            <IconGenerator iconName={iconNames.BackArrowIcon} size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textHeader}>Find Account</Text>
        <InputWithHeader
          headerText="Let us know your username."
          value={username}
          onChange={this.updateUsername}
        />
        <PickerWithHeader
          selectedValue={question}
          headerText="Your security question is:"
          onValueChange={this.updateQuestion}
        />
        <InputWithHeader
          headerText="Answer above question here."
          value={answer}
          onChange={this.updatePassword}
        />
        <TouchableOpacity
          style={[styles.buttonCreate, { opacity: this.enableLoginButton() ? 1 : 0.5 }]}
          disabled={!this.enableLoginButton()}
        >
          <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>Create</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const PickerWithHeader = ({ headerText, onValueChange, selectedValue }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputHeader}>{headerText}</Text>
      <View>
        <View style={styles.opacityContainerForInput} />
        <Picker style={styles.picker} selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label="-- Please choose one question --" value="Nothing" />
          <Picker.Item
            label="What is your hometown's name?"
            value="What is your hometown's name?"
          />
          <Picker.Item label="What is your pet's name?" value="What is your pet's name?" />
          <Picker.Item label="What is your favorite color?" value="What is your favorite color?" />
          <Picker.Item label="What is your favorite movie?" value="What is your favorite movie?" />
          <Picker.Item label="What is your favorite sport?" value="What is your favorite sport?" />
          <Picker.Item
            label="What is your favorite number?"
            value="What is your favorite number?"
          />
        </Picker>
      </View>
    </View>
  );
};

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
    marginBottom: 6
  },

  textHeader: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    marginBottom: 10
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
