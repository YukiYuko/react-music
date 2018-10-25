import React from 'react'
import Sing from '../../components/public/sing/Sing'
import PublicHeader from '../../components/public/header/Header'
import {playlistDetail} from '../../request/api';
import {Toast} from "antd-mobile";
import './songList.less'
import {numberFilter} from '../../filters/index'

import ColorThief from 'color-thief'

class SongList extends React.Component {
  componentDidMount() {
    this.getDetail()
  }
  state = {
    list: '',
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

        // ********获取主题色********
        // let img = new Image();
        // let colors = '';
        // let dom = document.querySelector('.songList_head');
        // console.log(dom);
        // img.onload = function  () {
        //   let colorThief = new ColorThief();
        //   colors = colorThief.getColor(img);
        //   dom.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`
        // };
        // img.crossOrigin = 'Anonymous';
        // img.src = res.playlist.coverImgUrl;
        // ********获取主题色结束********

        setTimeout(() => {
          Toast.hide();
        }, 1000);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    });
  }

  render() {
    const {list} = this.state;
    return (
      <div className="songList">
        <PublicHeader title="歌单">
        </PublicHeader>
        <div className="songList_head">
          <div className="songList_head_bg" style={{backgroundImage: `url(${list.coverImgUrl})`}}></div>
          <div className="songList_head_text flex">
            <div className="left">
              <img src={list.coverImgUrl} alt={list.name}/>
              <span className="left-icon">
                歌单
              </span>
              <span className="left-num">
                <i className="iconfont icon-erji"/>
                <em>{numberFilter(list.playCount)}</em>
              </span>
            </div>
            <div className="right">
              <h3>{list.name}</h3>
              <p>
                <img src={list.creator && list.creator.avatarUrl} alt={list.creator && list.creator.nickname}/>
                <span>{list.creator && list.creator.nickname}</span>
              </p>
            </div>
          </div>
          <div className="songList_head_menu">

          </div>
        </div>
      </div>
    )
  }
}

export default SongList
