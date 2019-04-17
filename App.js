/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import SubjectList from './src/components/subject-list/SubjectList';
import HomePage from './src/views/HomePage';
import Navigator from './src/components/navigator/Navigator';

export const TRACKS = [
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl:
      'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: 'https://data.chiasenhac.com/data/cover/103/102529.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3',
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: 'https://data.chiasenhac.com/data/cover/103/102271.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl:
      'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: 'https://data.chiasenhac.com/data/cover/103/102529.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3',
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: 'https://data.chiasenhac.com/data/cover/103/102271.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl:
      'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl:
      'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
];

export const PLAYLIST = [
  {
    name: 'TOP 5',
    playlistArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
    tracks: TRACKS,
  },
  {
    name: 'TOP 10',
    playlistArtUrl:
      'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
    tracks: TRACKS,
  },
];

export const SUBJECT_INFO = {
  subject: 'Test Subject Name',
  description: 'This is a test description',
  playlists: [
    {
      name: 'TOP 5',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 10',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 5',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 10',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 5',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 10',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 5',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
    {
      name: 'TOP 10',
      playlistArtUrl:
        'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg',
      tracks: TRACKS,
      // artists: 'Various Artists',
    },
  ],
};

export const LIST_SUBJECT_INFO = [
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
  SUBJECT_INFO,
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.914 }}>
          <HomePage listOfSubjectInfo={LIST_SUBJECT_INFO} />
        </View>
        <View style={styles.nagivatior}>
          <Navigator selector="home" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nagivatior: {
    flex: 0.086,
    backgroundColor: 'rgb(34,35,38)',
  },
});
