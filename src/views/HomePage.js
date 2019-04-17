import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SubjectList from '../components/subject-list/SubjectList';

const HomePage = ({ listOfSubjectInfo }) => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#2b3535', '#121212', '#121212']}
      style={styles.linearGradientEffect}
    />
    <FlatList
      style={styles.flatList}
      data={listOfSubjectInfo}
      renderItem={({ item }) => <Item subjectInfo={item} />}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={() => <View style={{ height: 300 }} />}
    />
    <NavigationBar />
  </View>
);

const Item = ({ subjectInfo }) => {
  return (
    <View style={styles.item}>
      <SubjectList subjectInfo={subjectInfo} />
    </View>
  );
};

const NavigationBar = () => <View style={styles.navigationBar} />;

export default HomePage;

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
