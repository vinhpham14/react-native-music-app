import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/redux-persist';
import MiniPlayer from '../components/mini-player/MiniPlayer';
import SubjectList from '../components/subject-list/SubjectList';
import { port } from '../constant';
import { getUser, findUser, createUser, updateUser } from '../actions/server-api';

let showing = '';

export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '1234',
      username: 'hitonasi',
      question: 'one',
      answer: '1',
      newPassword: '111'
    };
  }

  componentDidMount() {
    const { username, password, question, answer, newPassword } = this.state;
    const id = '5d1641953a079a002ffbf344';

    // Test login => OK
    // getUser('vinh', '1230').then(rs => {
    //   console.log(rs);
    // });

    // Test forget password => OK
    // findUser(username, question, answer, newPassword).then(rs => {
    //   console.log(rs);
    // })

    // //
    // // Test create account => Oke
    // //
    // createUser('vinh', 'two', 2, '1230').then(rs => {
    //   console.log(rs);
    // })

    // //
    // // Test update account => Oke
    // //
    updateUser(id, [{ songs: [], name: 'nHac' }], []).then(rs => {
      console.log(rs);
    });
  }

  render() {
    const { username, password, question, answer } = this.state;
    return (
      <ScrollView style={{ backgroundColor: 'gray' }}>
        <Text style={{ color: 'red' }}>{showing}</Text>
      </ScrollView>
    );
  }
}

const { height } = Dimensions.get('window');
const verticalMarginOfSubjectList = 0.036;
const styles = StyleSheet.create({
  container: {
    flex: 0.905,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(18,18,18)'
  },
  linearGradientEffect: {
    width: '100%',
    height: '100%'
  },
  flatList: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 30
  },
  item: {
    marginTop: verticalMarginOfSubjectList * height,
    marginBottom: verticalMarginOfSubjectList * height
  }
});
