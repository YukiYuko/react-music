import React from 'react'
import './highquality.less'
import PublicHeader from '../../components/public/header/Header';
import {topPlaylist, highquality} from "../../request/api";
import Recommend from '../../components/common/Recommend/Recommend';
import {Toast} from "antd-mobile";

class HighQuality extends React.Component {
  componentDidMount() {
    this.getTopPlayList();
    this.getFirstPlayList();
  }

  state = {
    list: [],
    updateTime: 1541599210074,
    first: ''
  };

  // 获取榜单
  getTopPlayList () {
    let params = {
      limit: 20
    };
    topPlaylist(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          list: res.playlists
        }, () => {
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取精品榜单第一个
  getFirstPlayList () {
    let params = {
      limit: 1
    };
    highquality(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          first: res.playlists[0]
        }, () => {
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  render() {
    const {first, list} = this.state;
    return (
        <div className="HighQuality">
          <PublicHeader title="歌单"/>
          <div className="head flex items-center">
            <div className="headBg" style={{backgroundImage:`url(${first.coverImgUrl})`}}/>
            <div className="headBox flex items-center">
              <div className="left">
                <img src={first.coverImgUrl} alt={first.name}/>
              </div>
              <div className="right">
                <h3>
                  <i className="iconfont icon-huangguan"></i>
                  <span>精品歌单</span>
                </h3>
                <div className="text">
                  <p>{first.name}</p>
                  <p>{first.copywriter}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="select flex justify-between">
            <div className="left">
              <a>全部歌单 ></a>
            </div>
            <div className="right">
              <a>华语</a>
              <a>古风</a>
              <a>民谣</a>
            </div>
          </div>
          <div className="HighQualityList">
            <Recommend list={list} width="49%"/>
          </div>
        </div>
    )
  }
}
export default HighQuality
