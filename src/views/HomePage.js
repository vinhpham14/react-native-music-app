import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import SubjectList from '../components/subject-list/SubjectList';
import { actionCreators } from '../actions/ReduxImplement';

class HomePage extends Component {
  constructor(props) {
    super(props);

    const { store } = this.props;
    const { playingSong, playlist, screen, currentTime, listOfSubjectInfo } = store;
    this.state = {
      playingSong,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
    };
  }

  onPressedPlaylist = item => {
    const { dispatch, navigation } = this.props;

    dispatch(actionCreators.setPlayingPlaylist(item));
    dispatch(actionCreators.setCurrentSongTime(0));
    dispatch(actionCreators.setPlayingTrack(item.tracks[0]));
    navigation.navigate('Player');
  };

  render() {
    const { listOfSubjectInfo } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2b3535', '#121212', '#121212']}
          style={styles.linearGradientEffect}
        />
        <FlatList
          style={styles.flatList}
          data={listOfSubjectInfo}
          renderItem={({ item }) => (
            <Item subjectInfo={item} onPressedItem={this.onPressedPlaylist} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => <View style={{ height: 300 }} />}
        />
      </View>
    );
  }
}

const Item = ({ subjectInfo, onPressedItem }) => {
  return (
    <View style={styles.item}>
      <SubjectList subjectInfo={subjectInfo} onPressedItem={onPressedItem} />
    </View>
  );
};

const { height, width } = Dimensions.get('window');
const verticalMarginOfSubjectList = 0.036;
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
  },
  linearGradientEffect: {
    width: '100%',
    height: '100%',
    // height: 200,
  },
  flatList: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // display: 'flex',
    top: 30,
  },
  item: {
    marginTop: verticalMarginOfSubjectList * height,
    marginBottom: verticalMarginOfSubjectList * height,
  },
});

export default connect(state => {
  return { store: state };
})(HomePage);
