import React from 'react'
import './high.less'
import PublicHeader from '../../components/public/header/Header';
import {highquality, playlistHot} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import Lazy from '../../components/public/Lazy/lazy'
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

class High extends React.Component {
  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
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
  goDetail (item, e) {
    // console.log('每条数据',item);
    // console.log('事件对象e要放在最后',e);
    this.context.router.history.push({pathname : `/SongList/${item.id}`})
  }
  getHighPlayList () {
    Toast.loading('加载中...');
    let params = {
      limit: 20,
      cat: this.state.catName
    };
    this.setState({
      list: []
    });
    highquality(params).then((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          Toast.hide();
          this.setState({
            list: res.playlists
          });
        }, 1000);
        console.log(res)
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取热门分类
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
  // 选择分类
  switchTag (tag) {
    this.setState({
      catName: tag,
      showFilter: false
    }, () => {
      this.getHighPlayList();
    });
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
          <div className="pop-box">
            <CSSTransition
                in={showFilter}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
              <div className="pop-mask" onClick={this.show('showFilter',false)}/>
            </CSSTransition>
            <CSSTransition
                in={showFilter}
                timeout={300}
                classNames="star"
                unmountOnExit
            >
              <div className="pop-wrap">
                <div className="filter-all filter-tag">
                  <a className={catName === '全部' ? 'active':''} onClick={this.switchTag.bind(this,'全部')}>
                    全部
                    <i className="iconfont icon-xuanzhong"/>
                  </a>
                </div>
                <div className="filter-tag">
                  {
                    cat && cat.map((item,index) => (
                        <a className={catName === item.name ? 'active':''}
                           key={index}
                           onClick={this.switchTag.bind(this,item.name)}>
                          {item.name}
                          <i className="iconfont icon-xuanzhong"/>
                        </a>
                    ))
                  }
                </div>
              </div>
            </CSSTransition>
          </div>

          <div className="filter flex justify-between">
            <div className="left">{catName}</div>
            <div className="right" onClick={this.show('showFilter')}>
              <i className="iconfont icon-shaixuan"/>
              <span>筛选</span>
            </div>
          </div>


          <div className="highScroll box1">
            <Scroll>
              <div>
                {
                  list.length ? list.map((item, index) => (
                    <div onClick={this.goDetail.bind(this, item)} className="highItem flex items-center" key={index}>
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
                  )) : <div className="nothing">没有更多数据</div>
                }
              </div>
            </Scroll>
          </div>
        </div>
    )
  }
}
export default High
