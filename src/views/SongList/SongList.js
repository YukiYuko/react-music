import React from 'react'
import Sing from '../../components/public/sing/Sing'
import PublicHeader from '../../components/public/header/Header'
import {playlistDetail} from '../../request/api';
import {Toast} from "antd-mobile";
import './songList.less'
import {numberFilter} from '../../filters/index'
import BScroll from 'better-scroll'
import ListItem from './listItem'

import ColorThief from 'color-thief'

class SongList extends React.Component {
  componentWillReceiveProps () {
  }
  componentDidMount() {
    this.getDetail();

    this.wrapper = document.querySelector('.wrapper');
    this.top = document.querySelector('.top').clientHeight;
    let h = window.innerHeight;
    this.wrapper.style.top = this.top + 'px';
    this.wrapper.style.bottom = 0 + 'px';
    this.scroll = new BScroll('.wrapper', {
      probeType: 3
    });
    this.watch_scroll();
  }

  state = {
    list: '',
    numberList: []
  };

  // 监听滚动
  watch_scroll() {
    this.scroll.on('scroll', (pos) => {
      let y = pos.y;
      let layer = document.querySelector('.bg-layer');
      let header = document.querySelector('.songList_head');
      let top = document.querySelector('.top');
      let songList_head_text = document.querySelector('.songList_head_text');
      let songList_head_menu = document.querySelector('.songList_head_menu');
      let scale = 1;
      let blur = 0;
      const percent = Math.abs(pos.y / this.top);

      console.log('pos', pos);
      if (pos.y > 0) {
        scale = 1 + percent;
      }else {
        blur = Math.min(20, percent * 20)
      }

      top.style.transform = `scale(${scale})`;

      if (y + this.top - 45 >= 0) {
        layer.style.transform = `translate3d(0,${y}px,0)`;
        header.style.height = 'auto';
        header.style.paddingBottom = 0.4 + 'rem';
        header.style.paddingTop = 1.2 + 'rem';
        top.style.zIndex = 1;
        songList_head_text.style.display = 'flex';
        songList_head_menu.style.display = 'flex';
      } else {
        header.style.height = 45 + 'px';
        header.style.paddingBottom = 0 + 'px';
        header.style.paddingTop = 0 + 'px';
        top.style.zIndex = 101;
        songList_head_text.style.display = 'none';
        songList_head_menu.style.display = 'none';
      }
    })
  }

  // 获取详情数据
  getDetail() {
    if (this.props.list) {
      this.setState({
        list: this.props.list
      });
      return
    }

    if (!this.props.match){
      return
    }

    let {id} = this.props.match.params;
    let params = {
      id: id
    };
    Toast.loading('Loading...');
    playlistDetail(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          list: res.playlist
        });

        // ********获取主题色********
        // let img = new Image();
        // let colors = '';
        // let dom = document.querySelector('.songList_head');
        // console.log(dom);
        // img.onload = function  () {
        //   let colorThief = new ColorThief();
        //   colors = colorThief.getColor(img);
        //   dom.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`
        // };
        // img.crossOrigin = 'Anonymous';
        // img.src = res.playlist.coverImgUrl;
        // ********获取主题色结束********

        setTimeout(() => {
          Toast.hide();
        }, 1000);
      } else {
        Toast.fail('Load failed !!!', 2);
      }
    });
  }

  render() {
    let {list, numberList} = this.state;
    if (this.props.list) {
      list = this.props.list
    }
    return (
        <div className="songList">
          <PublicHeader back={this.props.back} title="歌单"/>
          <div className="top">
            <div className="songList_head">
              <div className="songList_head_bg" style={{backgroundImage: `url(${list.coverImgUrl})`}}></div>
              {/*头部信息*/}
              <div className="songList_head_text flex">
                <div className="left">
                  <img src={list.coverImgUrl} alt={list.name}/>
                  <span className="left-icon">
                    歌单
                  </span>
                  <span className="left-num">
                    <i className="iconfont icon-erji"/>
                    <em>{numberFilter(list.playCount)}</em>
                  </span>
                </div>
                <div className="right box1">
                  <h3>{list.name}</h3>
                  <p>
                    <img src={list.creator && list.creator.avatarUrl} alt={list.creator && list.creator.nickname}/>
                    <span>{list.creator && list.creator.nickname}</span>
                  </p>
                </div>
              </div>

              {/*几个导航 评论 分享 下载 多选*/}
              <div className="songList_head_menu flex">
                <div className="menu-item box1 justify-center">
                  <i className="iconfont icon-liuyan"></i>
                  <p>336</p>
                </div>
                <div className="menu-item box1 justify-center">
                  <i className="iconfont icon-share"></i>
                  <p>829</p>
                </div>
                <div className="menu-item box1 justify-center">
                  <i className="iconfont icon-download"></i>
                  <p>下载</p>
                </div>
                <div className="menu-item box1 justify-center">
                  <i className="iconfont icon-checkbox"></i>
                  <p>多选</p>
                </div>
              </div>
            </div>
          </div>

          {/*专业背景*/}
          <div className="bg-layer"></div>
          {/*专业背景*/}
          <div className="wrapper">
            <div className="wrapper-container">
              {/*播放全部*/}
              <div className="play_all flex">
                <a className="box1 left">
                  <i className="iconfont icon-bofang"></i>
                  <span>播放全部</span>
                  <em>(共 123 首)</em>
                </a>
                <a className="right">+ 收藏(8604)</a>
              </div>

              {/*简介信息*/}
              <div className="songList_intro">
                <div className="songList_intro_tag">
                  <span>标签: </span>
                  {
                    list.tags && list.tags.map((tags_item) => (
                        <a href="" key={tags_item}>{tags_item}</a>
                    ))
                  }
                </div>
                <div className="songList_intro_text" dangerouslySetInnerHTML={{__html: list.description}}>
                </div>
              </div>


              {/*歌曲列表*/}
              <div className="songList_list">
                <ul>
                  {
                    list.tracks && list.tracks.map((item, index) => (
                        <ListItem item={item} key={index} index={index}/>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default SongList
