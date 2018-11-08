import React from 'react'
import './top.less'
import {toplistDetail, topList} from '../../request/api';
import PublicHeader from '../../components/public/header/Header';
import FooterComponent from '../../components/common/Footer/footer';
import {Toast} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import SongList from '../SongList/SongList';
const VelocityComponent = require('velocity-react/src/velocity-component');

class Top extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: '',
      detailList: '',
      showDetail: false
    }
  }
  componentDidMount() {
    this.getToplistDetail();
    this.getIdx();
  }
  // 获取各个榜单简要信息
  getToplistDetail () {
    toplistDetail().then((res) => {
      if (res.code === 200) {
        this.setState({
          list: res.list
        }, () => {
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取各个榜单详情
  getTopList (name) {
    let idx = '';
    let data = this.getIdx();
    for (let key in data) {
      if (data[key] === name){
        idx = key;
        break;
      }
    }

    if (!idx) {
      Toast.info('暂无数据~');
      return
    }

    Toast.loading('Loading...');
    topList({idx: idx, s: 5}).then((res) => {
      if (res.code === 200) {
        this.setState({
          detailList: res.playlist,
          showDetail: true
        }, () => {
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
      setTimeout(() => {Toast.hide()}, 1000)
    }).catch(() => {
      Toast.hide();
    })
  }
  // 获取idx
  getIdx () {
    let arr = [
        '云音乐新歌榜',
        '云音乐热歌榜',
        '网易原创歌曲榜',
        '云音乐飙升榜',
        '云音乐电音榜',
        'UK排行榜周榜',
        '美国Billboard周榜',
        'KTV唛榜',
        'iTunes榜',
        'Hit FM Top榜',
        '日本Oricon周榜',
        '韩国Melon排行榜周榜',
        '韩国Mnet排行榜周榜',
        '韩国Melon原声周榜',
        '中国TOP排行榜（港台榜）',
        '中国TOP排行榜（内地榜）',
        '香港电台中文歌曲龙虎榜',
        '华语金曲榜',
        '中国嘻哈榜',
        '法国 NRJ Vos Hits 周榜',
        '台湾Hito排行榜',
        'Beatport全球电子舞曲榜',
        '云音乐ACG音乐榜',
        '云音乐嘻哈榜'
    ];
    let data = {};
    for (let i = 0; i < arr.length; i++) {
      if (data[i]) {
        continue
      }
      data[i] = arr[i];
    }
    return data;
  }
  // 关闭
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  render() {
    const {list, detailList, showDetail} = this.state;
    const style = {
      opacity: showDetail ? 1 : 0,
      translateX: showDetail ? 0 : '100%'
    };
    return (
        <div className="topWrap">
          <PublicHeader title="排行榜" background="#d94036"/>
          <div className="topCont box1">
            <Scroll data={list} scrollbar={true}>
              <ul className="topList">
                {
                  list && list.map((item, index) => (
                      <li onClick={() => this.getTopList(item.name)} className="topListItem flex" key={index}>
                        <div className="left">
                          <img src={item.coverImgUrl} alt={item.name}/>
                          <span>{item.updateFrequency}</span>
                        </div>
                        <div className="right box1 flex justify-center dir-column">
                          {
                            item.tracks && item.tracks.map((tracks, tracksindex) => (
                                <p key={tracksindex}>{`${tracksindex+1}. ${tracks.first} - ${tracks.second}`}</p>
                            ))
                          }
                        </div>
                      </li>
                  ))
                }
              </ul>
            </Scroll>
            {/*歌单详情*/}
            <VelocityComponent animation={style} duration={500}>
               <SongList back={this.onClose('showDetail')} list={detailList}/>
            </VelocityComponent>
          </div>
          <FooterComponent/>

        </div>
    )
  }
}
export default Top
