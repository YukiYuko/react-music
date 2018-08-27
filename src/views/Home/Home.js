import React from 'react'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/less/swiper.less'
import './Home.less'
import {observable, autorun} from 'mobx';
import touxiang from '../../assets/images/touxiang.png';
import Recommend from '../../components/common/Recommend/Recommend'
class Home extends React.Component {

  state = {
    list_recommend: [
      { title: '遇见你，竟花光了所有运气。' },
      { title: '遇见你，竟花光了所有运气。' },
      { title: '遇见你，竟花光了所有运气。' },
      { title: '遇见你，竟花光了所有运气。' },
      { title: '遇见你，竟花光了所有运气。' },
      { title: '遇见你，竟花光了所有运气。' },
    ],
    list_new: [
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
      { title: '遇见你，竟花光了所有运气。' , sub: '很想，删掉时光'},
    ],
    list_anchor: [
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: false},
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: true},
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: false},
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: true},
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: false},
      { title: '我有故事，你又酒吗' , image_text: '删掉时光', is_free: true},
    ]
  };

  componentDidMount() {
    
  }

  render() {

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true
      },
      spaceBetween: 30
    }

    return (
      <div className="home">
        <div className="red-bg"></div>
        <div className="scroll-warp">
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
            <Swiper {...params}>
              <div className="slider-item">
                <div className="slider-item-inner">1</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">2</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">3</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">4</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">5</div> 
              </div>
            </Swiper>
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
              <div className="icon-item box1">
                <div className="icon-item-icon">
                  <i className="iconfont icon-tuijian"></i>
                </div>
                <div className="icon-item-text">
                  每日推荐
                </div>
              </div>
              <div className="icon-item box1">
                <div className="icon-item-icon">
                  <i className="iconfont icon-gedan"></i>
                </div>
                <div className="icon-item-text">
                  歌单
                </div>
              </div>
              <div className="icon-item box1">
                <div className="icon-item-icon">
                  <i className="iconfont icon-top"></i>
                </div>
                <div className="icon-item-text">
                  排行榜
                </div>
              </div>
            </div>
            {/*主体内容*/}
            <div className="inner-warp">
              {/*推荐歌单*/}
              <div className="section-recommend">
                <div className="public-title">
                  推荐歌单 >
                </div>
                <Recommend list={this.state.list_recommend}></Recommend>
              </div>
              {/*最新音乐*/}
              <div className="section-new">
                <div className="public-title">
                  最新音乐 >
                </div>
                <Recommend list={this.state.list_new}></Recommend>
              </div>
              {/*最新电台*/}
              <div className="section-new">
                <div className="public-title">
                  最新电台 >
                </div>
                <Recommend list={this.state.list_anchor}></Recommend>
              </div>
            </div>

          </div>
        </div> 
      </div>
    )
  }
}
export default Home