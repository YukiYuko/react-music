import React from 'react'
import Sing from '../../components/public/sing/Sing'
import PublicHeader from '../../components/public/header/Header'
import {playlistDetail} from '../../request/api';
import {Toast} from "antd-mobile";

class SongList extends React.Component {
  componentDidMount() {
    // this.getDetail()
  }
  state = {
    list: [],
  };
  getDetail() {
    let {id} = this.props.match.params;
    let params = {
      id: id
    };
    Toast.loading('Loading...');
    playlistDetail(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          list: res.playlist
        });
        setTimeout(() => {
          Toast.hide();
        }, 1000);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    });
  }

  render() {
    return (
      <div className="songList">
        <PublicHeader title="这里是标题"/>

      </div>
    )
  }
}

export default SongList
