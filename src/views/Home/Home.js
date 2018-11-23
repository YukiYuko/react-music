import React from 'react'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/less/swiper.less'
import './Home.less'
import Recommend from '../../components/common/Recommend/Recommend';
import FooterComponent from '../../components/common/Footer/footer';
import Scroll from '../../components/public/scroll/scroll';
import {getBanner, personalized} from '../../request/api';
import { Toast } from 'antd-mobile';
import HighqualityComponent from '../Highquality/Highquality';
import { inject, observer } from 'mobx-react';
import SearchComponent from '../../components/common/Search/Search';




const VelocityComponent = require('velocity-react/src/velocity-component');

@inject('user')
@observer
class Home extends React.Component {

  componentWillMount() {
  }
  state = {
    list_recommend: [],
    newsong: [],
    djprogram: [],
    banners: [],
    showHigh: false,
    highList: []
  };
  // 获取banner数据

  get_banner () {
    getBanner().then((res) => {
      if (res.code === 200) {
        this.setState({
          banners: res.banners
        });
        setTimeout(() => {
          Toast.hide();
        }, 1000);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取推荐歌单数据
  get_personalized (type) {
    personalized(type).then((res) => {
      if (res.code === 200) {
        let json = {};
        let data = res.result.slice(0,6);
        type ? json[type] = data : json['list_recommend'] = data;
        this.setState(json);
        setTimeout(() => {
          Toast.hide();
        }, 1000);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  go(path) {
    this.props.history.push({pathname : path})
  }

  show = (key, value = true) => () => {
    this.setState({
      [key]: value,
    });
  };

  componentDidMount() {
    Toast.loading('Loading...');
    this.get_banner();
    this.get_personalized();
    this.get_personalized('newsong');
    this.get_personalized('djprogram');
    console.log('首页', this.props)
  }

  render() {

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true
      },
      spaceBetween: 30,
      rebuildOnUpdate: true
    };
    const {showHigh, highList} = this.state;

    return (
      <div className="home">
        <SearchComponent/>
        <div className="home-warp">
          <Scroll>
            <div className="scroll-warp">
              <div className="red-bg"></div>
              <div className="tab-nav flex justify-between">
                <div className="box1">
                  <a className="active" href="">个性推荐</a>
                </div>
                <div className="box1">
                  <a href="">主播电台</a>
                </div>
              </div>
              <div className="tab-warp">
                {/*banner*/}
                <div className="banner">
                  <Swiper {...params}>
                    {
                      this.state.banners.map((item, index) => (
                          <div className="slider-item" key={index}>
                            <div className="slider-item-inner">
                              <img src={item.imageUrl} alt=""/>
                            </div>
                          </div>
                      ))
                    }
                  </Swiper>
                </div>
                {/*几个分类*/}
                <div className="icon-menu flex justify-between">
                  <div className="icon-item box1">
                    <div className="icon-item-icon">
                      <i className="iconfont icon-fm"></i>
                    </div>
                    <div className="icon-item-text">
                      私人FM
                    </div>
                  </div>
                  <div onClick={() => this.go('Daily')} className="icon-item box1">
                    <div className="icon-item-icon">
                      <i className="iconfont icon-tuijian"></i>
                    </div>
                    <div className="icon-item-text">
                      每日推荐
                    </div>
                  </div>
                  <div onClick={() => this.go('High')} className="icon-item box1">
                    <div className="icon-item-icon">
                      <i className="iconfont icon-gedan"></i>
                    </div>
                    <div className="icon-item-text">
                      歌单
                    </div>
                  </div>
                  <div onClick={() => this.go('Top')} className="icon-item box1">
                    <div className="icon-item-icon">
                      <i className="iconfont icon-top"></i>
                    </div>
                    <div className="icon-item-text">
                      排行榜
                    </div>
                  </div>
                </div>
                {/*主体内容*/}
                <div className="home-inner-warp">
                  {/*推荐歌单*/}
                  <div className="section-recommend">
                    <div className="public-title">
                      推荐歌单 >
                    </div>
                    <Recommend list={this.state.list_recommend}/>
                  </div>
                  {/*最新音乐*/}
                  <div className="section-new">
                    <div className="public-title">
                      最新音乐 >
                    </div>
                    <Recommend list={this.state.newsong}></Recommend>
                  </div>
                  {/*最新电台*/}
                  <div className="section-new">
                    <div className="public-title">
                      最新电台 >
                    </div>
                    <Recommend list={this.state.djprogram}></Recommend>
                  </div>
                </div>

              </div>
            </div>
          </Scroll>
        </div>

        {/*footer*/}
        <FooterComponent/>

        {/*歌单*/}
        <VelocityComponent animation={{
          opacity: showHigh ? 1 : 0,
          translateX: showHigh ? 0 : '100%',
          display: 'block',
          style: {
            display: 'none'
          }
        }} duration={400}>
          <HighqualityComponent show={showHigh} back={this.show('showHigh', false)}/>
        </VelocityComponent>
      </div>
    )
  }
}
export default Home