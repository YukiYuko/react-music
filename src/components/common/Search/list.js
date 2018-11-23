import React from 'react'
import './list.less'
import Navigator from "../../public/Navigator/Navigator";
import Scroll from "../../public/scroll/scroll";
import Swiper from "react-id-swiper";

class SearchList extends React.Component {
  componentDidMount() {}

  // 点击menu
  selectNav = (type, index) => {
    console.log('type', type);
    this.refs.swiper.swiper.slideTo(index-1);
    this.props.getSearch(this.props.keyword, type)
  };

  render() {
    const {tabs, currentTabIndex, selectNav, list, type} = this.props;
    const _key = (type) => {
      let data = {
        1: 'songs',
        10: 'albums',
        100: 'artists',
        1000: 'playlists',
        1002: 'userprofiles',
        1004: 'mvs',
        1006: 'songs',
        1009: 'djRadios',
        1014: 'videos',
      };
      return data[type];
    };
    const params = {
      pagination: {
        clickable: true,
        dynamicBullets: true
      },
      spaceBetween: 30,
      rebuildOnUpdate: true,
      on: {
        slideChangeTransitionEnd: (e) => {
          let index = this.refs.swiper.swiper.activeIndex;
          this.refs.navigator._adjust(index+1);
        }
      }
    };
    return (
        <div className="searchList flex dir-column">
          <div className="searchListType">
            <Navigator currentTabIndex={currentTabIndex} ref="navigator" selectNav={this.selectNav} navList={tabs}/>
          </div>
          <div className="searchContent box1">
            <Swiper ref="swiper" {...params}>
              {
                tabs.map((item, index) => (
                  <div className="slider-item" key={index}>
                    {
                      item.type === type && <Scroll data={list[_key(type)]}>
                        <div className="search-list">
                          {
                            list[_key(type)] && list[_key(type)].map((item, index) => (
                                <div key={index} className="search-list-item flex
                              justify-between items-center wrap-wrap">
                                  <div className="left box1">
                                    <div className="title">{item.name}</div>
                                    <div className="text">
                                      <span>{item.artists[0].name}</span> - <i>{item.album && item.album.name}</i>
                                    </div>
                                  </div>
                                  <div className="right">
                                    <a><i className="iconfont icon-gengduo"/></a>
                                  </div>
                                </div>
                            ))
                          }
                        </div>
                      </Scroll>
                    }
                  </div>
                ))
              }
            </Swiper>
          </div>
        </div>
    )
  }
}
export default SearchList
