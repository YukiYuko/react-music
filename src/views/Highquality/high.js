import React from 'react'
import './high.less'
import PublicHeader from '../../components/public/header/Header';
import {highquality, playlistHot} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import Lazy from '../../components/public/Lazy/lazy'
import until from '../../until/index'
import FilterTypeComponent from "./filterType";
const VelocityComponent = require('velocity-react/src/velocity-component');
class High extends React.Component {
  componentDidMount() {
    this.setState({
      catName: this.props.cat
    });
    this.getHighPlayList();
    this.getPlayListTop();
  }
  state = {
    catName: '全部',
    list: [],
    select: '',
    showFilter: false,
    cat: []
  };
  getHighPlayList () {
    Toast.loading('加载中...');
    let params = {
      limit: 20,
      tag: '全部'
    };
    highquality(params).then((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          Toast.hide();
          this.setState({
            list: res.playlists
          }, () => {
            console.log()
          });
        }, 1000);
        console.log(res)
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  //
  getPlayListTop () {
    playlistHot().then((res) => {
      if (res.code === 200) {
        this.setState({
          cat: res.tags
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
    const {list, select, catName, showFilter, cat} = this.state;
    return (
        <div className="high flex dir-column">
          <PublicHeader back={this.props.back} title="精品歌单"/>
          {/*<VelocityComponent animation={{ opacity: showFilter ? 1 : 0 }} duration={0}>*/}
          {
            showFilter &&
            <VelocityComponent runOnMount animation={{ opacity: showFilter ? 1 : 0 }} duration={0}>
              <div className="pop-box">
                <VelocityComponent runOnMount animation={{ opacity: showFilter ? 1 : 0 }} duration={300}>
                  <div className="pop-mask" onClick={this.show('showFilter',false)}/>
                </VelocityComponent>
                <VelocityComponent runOnMount animation={{ translateY: showFilter ? 0 : '-100%' }} duration={300}>
                  <div className="pop-wrap">
                    <div className="filter-all filter-tag">
                      <a className="active">
                        全部
                        <i className="iconfont icon-xuanzhong"/>
                      </a>
                    </div>
                    <div className="filter-tag">
                      {
                        cat && cat.map((item,index) => (
                            <a key={index}>{item.name}</a>
                        ))
                      }
                    </div>
                  </div>
                </VelocityComponent>
              </div>
            </VelocityComponent>
          }

          {/*</VelocityComponent>*/}

          <div className="filter flex justify-between">
            <div className="left">全部</div>
            <div className="right" onClick={this.show('showFilter')}>
              <i className="iconfont icon-shaixuan"/>
              <span>筛选</span>
            </div>
          </div>


          <div className="highScroll box1">
            <Scroll>
              <div>
                {
                  list && list.map((item, index) => (
                    <div className="highItem flex items-center" key={index}>
                      <div className="left">
                        <Lazy src={item.coverImgUrl} alt={item.name}/>
                      </div>
                      <div className="right box1">
                        <div className="title">{item.name}</div>
                        <div className="author">by {item.creator.nickname}</div>
                        <div className="text">
                          <span>{item.tag}</span>
                          {item.copywriter}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Scroll>
          </div>
        </div>
    )
  }
}
export default High
