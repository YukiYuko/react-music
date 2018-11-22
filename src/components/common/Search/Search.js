import React from 'react'
import './search.less'
import {SearchBar, Toast} from 'antd-mobile';
import {searchHot, search} from '../../../request/api';
import localforage from "localforage";
import {CSSTransition} from "react-transition-group";
import Navigator from '../../../components/public/Navigator/Navigator'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/less/swiper.less'

class Search extends React.Component {
  componentDidMount() {
    // this.getHot();
    // this.getSearch();
  }
  state = {
    value: '许嵩',
    hot: '',
    show: false,
    type: 1,
    offset: 0,
    list: [],
    currentTabIndex: 0
  };
  onChange = (value) => {
    this.setState({ value });
  };
  onShow = (key, value = true) => () =>{
    this.setState({ [key]: value });
  };
  // 获取热门
  getHot () {
    searchHot().then((res) => {
      if (res.code === 200) {
        this.setState({
          hot: res.result
        })
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  // 搜索
  getSearch () {
    let params = {
      keywords: this.state.value,
      type: this.state.type,
      offset: this.state.offset
    };
    search(params).then((res) => {
      if (res.code === 200) {
        // this.setState({
        //   hot: res.result
        // })
        console.log(res)
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }

  // 点击menu
  selectNav = (type, index) => {
    console.log('type', type);
    this.refs.swiper.swiper.slideTo(index-1)
  };

  render() {
    const {hot, show, currentTabIndex} = this.state;
    const tabs = [
      { name: '单曲', type: 0 ,id: 1},
      { name: '专辑', type: 10 ,id: 2},
      { name: '歌手', type: 100 ,id: 3},
      { name: '歌单', type: 1000 ,id: 4},
      { name: '用户', type: 1002 ,id: 5},
      { name: 'MV', type: 1004 ,id: 6},
      { name: '歌词', type: 1006 ,id: 7},
      { name: '电台', type: 1009 ,id: 8},
      { name: '视频', type: 1014 ,id: 9},
    ];
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
      <div className="search">
        <SearchBar placeholder="Search" maxLength={8}
                   value={this.state.value}
                   onSubmit={value => console.log(value, 'onSubmit')}
                   onClear={this.onShow('show', false)}
                   onFocus={this.onShow('show')}
                   onChange={this.onChange}/>
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
          <div className="searchBox">
            {/*搜索相关*/}
            <div className="searchMess">
              <div className="singer-cat">
                <i className="iconfont icon-geshou"/>
                <span>歌手分类 ></span>
              </div>
              <div className="search-hot">
                <div className="search-hot-title">热门搜索</div>
                <div className="search-hot-list flex wrap-wrap">
                  {
                    hot && hot.hots.map((item, index) => (
                        <a key={index}>{item.first}</a>
                    ))
                  }
                </div>
              </div>
            </div>

            {/*搜索结果*/}
            <div className="searchList flex dir-column">
              <div className="searchListType">
                <Navigator currentTabIndex={currentTabIndex} ref="navigator" selectNav={this.selectNav} navList={tabs}/>
              </div>
              <div className="searchContent box1">
                <Swiper ref="swiper" {...params}>
                  {
                    tabs.map((item, index) => (
                      <div className="slider-item" key={index}>
                        <div className="slider-item-inner">
                          {item.name}
                        </div>
                      </div>
                    ))
                  }
                </Swiper>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}
export default Search
