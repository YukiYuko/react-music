import React from 'react'
import './highquality.less'
import PublicHeader from '../../components/public/header/Header';
import {topPlaylist, highquality} from "../../request/api";
import Recommend from '../../components/common/Recommend/Recommend';
import {Toast} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';

class HighQuality extends React.Component {

  componentWillUpdate (nextProps, nextState) {


  }
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
      limit: 50
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
          <div className="scroll">
            <Scroll ref="scroll" data={list}>
              <div className="head flex items-center">
                <div className="headBg" style={{backgroundImage:`url(${first.coverImgUrl})`}}/>
                <div className="headBox flex items-center">
                  <div className="left">
                    <img src={first.coverImgUrl} alt={first.name}/>
                  </div>
                  <div className="right">
                    <h3>
                      <i className="iconfont icon-huangguan"/>
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
                <Recommend scroll={this.refs.scroll} list={list} width="49%"/>
              </div>
            </Scroll>
          </div>
        </div>
    )
  }
}
export default HighQuality
