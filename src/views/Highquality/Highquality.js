import React from 'react'
import './highquality.less'
import PublicHeader from '../../components/public/header/Header';
import {topPlaylist, highquality} from "../../request/api";
import Recommend from '../../components/common/Recommend/Recommend';
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import CircleComponent from '../../components/public/Loading/circle';
import FilterTypeComponent from './filterType';
import HighComponent from './high';
// import MyModal from '../../components/public/modal/modal'

class HighQuality extends React.Component {

  componentDidMount() {
    this.getTopPlayList();
    this.getFirstPlayList();
  }

  state = {
    list: [],
    updateTime: 1541599210074,
    first: '',
    showType: false,
    cat: '全部',
    visible: true,
    showHigh: false
  };

  // 获取榜单
  getTopPlayList (cat = '全部') {
    let params = {
      limit: 10,
      cat: cat
    };
    Toast.loading('加载中...');
    this.setState({
      cat: cat,
      list: []
    });
    topPlaylist(params).then((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          Toast.hide();
          this.setState({
            list: res.playlists
          }, () => {
          });
        }, 1000);
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
  show = (key, value = true) => (e) => {
    // e.preventDefault();
    this.setState({
      [key]: value,
    });
  };

  render() {
    const {first, list, showType, cat, visible, showHigh} = this.state;
    return (
        <div className="HighQuality">
          <PublicHeader title="歌单"/>

          {/*{*/}
            {/*!list.length ?*/}
                {/*<CircleComponent/>:*/}
                {/**/}

          {/*}*/}
          <div className="scroll">
            <Scroll ref="scroll" data={list}>
              <div className="head flex items-center">
                <div className="headBg" style={{backgroundImage:`url(${first.coverImgUrl})`}}/>
                <div className="headBox flex items-center" onClick={this.show('showHigh')}>
                  <div className="left">
                    <img src={first.coverImgUrl} alt={first.name}/>
                  </div>
                  <div className="right box1">
                    <h3>
                      <i className="iconfont icon-huangguan"/>
                      <span>精品歌单 ></span>
                    </h3>
                    <div className="text">
                      <p>{first.name}</p>
                      <p>{first.copywriter}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="select flex justify-between">
                <div onClick={this.show('showType')} className="left">
                  <a>{cat} ></a>
                </div>
                <div className="right">
                  <a onClick={this.getTopPlayList.bind(this,'华语')} className={cat==='华语' ? 'active' : ''}>华语</a>
                  <a onClick={this.getTopPlayList.bind(this,'古风')} className={cat==='古风' ? 'active' : ''}>古风</a>
                  <a onClick={this.getTopPlayList.bind(this,'民谣')} className={cat==='民谣' ? 'active' : ''}>民谣</a>
                </div>
              </div>
              <div className="HighQualityList">
                <Recommend scroll={this.refs.scroll} list={list} width="49%"/>
              </div>
            </Scroll>
          </div>
          {/*筛选歌单*/}
          <Modal
              popup
              visible={showType}
              onClose={this.show('showType', false)}
              animationType="slide-up"
              // transitionName="am-slide-right"
          >
            <FilterTypeComponent cat={cat} getTopPlayList={this.getTopPlayList.bind(this)} back={this.show('showType', false)}/>
          </Modal>
          <Modal
              popup
              visible={showHigh}
              onClose={this.show('showHigh', false)}
              // animationType="slide-up"
              transitionName="am-slide-right"
          >
            <HighComponent back={this.show('showHigh', false)}/>
          </Modal>
          {/*<MyModal*/}
              {/*visible={visible}*/}
              {/*title="这是自定义title"*/}
              {/*anime="slide-right"*/}
          {/*>*/}
            {/*这是自定义content*/}
          {/*</MyModal>*/}
        </div>
    )
  }
}
export default HighQuality
