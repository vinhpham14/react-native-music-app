import React from 'react';
import { View, Image, StyleSheet, Text, FlatList, Dimensions } from 'react-native';

const SubjectList = ({ subjectInfo, subject, playlists, description }) => {
  let _subject = subject;
  let _playlists = playlists;
  let _description = description;

  // Only need this.props.subjectInfo OR both subject and playlists
  if (_subject === undefined || _playlists === undefined) {
    _subject = subjectInfo.subject;
    _playlists = subjectInfo.playlists;
  }

  if (_description === undefined) _description = subjectInfo.description;

  console.log(_description);

  return (
    <View>
      <Header subject={_subject} />
      <Description description={_description} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={_playlists}
        renderItem={({ item }) => {
          return <Item playlist={item} />;
        }}
        // renderItem={({ item }) => <Item playlist={item} />}
      />
    </View>
  );
};

const Item = ({ playlist }) => {
  const { itemImage, itemContainer, imageText } = styles;
  return (
    <View style={itemContainer}>
      <Image style={itemImage} source={{ uri: playlist.playlistArtUrl }} />
      <Text style={imageText} numberOfLines={2}>
        {playlist.name}
      </Text>
    </View>
  );
};

const Header = ({ subject }) => {
  const { header } = styles;
  return (
    <View>
      <Text style={header}>{subject}</Text>
    </View>
  );
};

const Description = ({ description }) => {
  const { descriptionStyle } = styles;
  console.log('XXXXXXXXXXXXXXXX');
  console.log(description);
  if (description !== undefined && description.length > 0) {
    return (
      <View>
        <Text style={descriptionStyle}>{description}</Text>
      </View>
    );
  }

  return null;
};

const { height, width } = Dimensions.get('window');
const imageSize = width * 0.36;
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0.045 * width,
    // backgroundColor: 'yellow',
  },
  imageText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  flatList: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
  },
  itemImage: {
    flex: 1,
    width: imageSize,
    height: imageSize,
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // padding: 5,
    textAlign: 'center',
    // backgroundColor: 'blue',
  },
  descriptionStyle: {
    color: '#b3b3b3',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 10,
  },
});

export default SubjectList;
