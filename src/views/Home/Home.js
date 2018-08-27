import React from 'react'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/less/swiper.less'
import './Home.less'
import {observable, autorun} from 'mobx';
import touxiang from '../../assets/images/touxiang.png';
class Home extends React.Component {

  state = {
    
  }

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
            {/*推荐歌单*/}
            <div className="inner-warp">
              <div className="public-title">
                推荐歌单 >
              </div>
              <div className="recommend flex justify-between wrap-wrap">
                {
                  [1,2,3,4,5,6].map((item) => {
                    return (
                      <div className="recommend-item" key={item}>
                        <div className="recommend-item-img">
                          <img src={touxiang} alt="touxiang"/>
                        </div>
                        <div className="recommend-item-text">
                          ︿(￣︶￣)︿ 愿你一生温柔相许
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
export default Home