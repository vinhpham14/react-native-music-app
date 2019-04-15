
import React, { Component } from 'react';
import Player from './src/components/player/Player';
import Playlist from './src/components/playlist/Playlist';
import { Text, View } from 'react-native'


export const TRACKS = [
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102529.jpg",
    audioUrl: "https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3",
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102271.jpg",
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl: 'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl: 'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102529.jpg",
    audioUrl: "https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3",
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102271.jpg",
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl: 'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl: 'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102529.jpg",
    audioUrl: "https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3",
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102271.jpg",
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl: 'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl: 'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
  {
    title: 'Anh Nhà Ở Đâu Thế',
    artist: 'AMee; B Ray',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102529.jpg",
    audioUrl: "https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003140-048a9a62/128/Anh%20Nha%20O%20Dau%20The%20-%20AMee_B%20Ray.mp3",
  },
  {
    title: 'Cảm Giác Lúc Ấy Sẽ Ra Sao',
    artist: 'Lou Hoàng',
    albumArtUrl: "https://data.chiasenhac.com/data/cover/103/102271.jpg",
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2002/1/2001890-b5f766df/128/Cam%20Giac%20Luc%20Ay%20Se%20Ra%20Sao%20-%20Lou%20Hoang.mp3',
  },
  {
    title: 'Một Bước Yêu, Vạn Dặm Đau',
    artist: 'Mr.Siro',
    albumArtUrl: 'https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/3/4/8/9/3489afd794b9fd47cfa972aa7271e13e.jpg',
    audioUrl: 'https://data.chiasenhac.com/dataxx/25/downloads/2004/1/2003979-b00c9680/128/Mot%20Buoc%20Yeu_%20Van%20Dam%20Dau%20-%20Mr_Siro.mp3',
  },
  {
    title: 'Ex Hate Me',
    artist: 'Bray; Masew',
    albumArtUrl: 'https://avatar-nct.nixcdn.com/song/2019/02/13/7/c/9/3/1550063179723.jpg',
    audioUrl: 'https://data.chiasenhac.com/downloads/2005/1/2004406-0a888aeb/128/Ex%20Hate%20Me%20-%20Bray_Masew.mp3',
  },
];

export const PLAYLIST = {
  name: "TOP 5",
  playlistArtUrl: "https://photo-resize-zmp3.zadn.vn/w240h240_jpeg/cover/d/8/9/a/d89a43bb694a7fde1e3f632cf0866b4c.jpg",
  tracks: TRACKS
}

export default class App extends Component {
  render() {
    return (
      <Player playlist={PLAYLIST}/>
      //<Playlist />
    )
  }
}