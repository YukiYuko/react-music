import React from 'react'
import Sing from '../../components/public/sing/Sing'
import PublicHeader from '../../components/public/header/Header'
import {playlistDetail} from '../../request/api';
import {Toast} from "antd-mobile";
import './songList.less'
import {numberFilter} from '../../filters/index'
import BScroll from 'better-scroll'

import ColorThief from 'color-thief'

class SongList extends React.Component {
  componentDidMount() {
    this.getDetail();

    let wrapper = document.querySelector('.wrapper');
    let scroll = new BScroll(wrapper);
  }
  state = {
    list: '',
    numberList: []
  };
  getDetail() {
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
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    });
  }

  render() {
    const {list,numberList} = this.state;
    return (
      <div className="songList">
        <PublicHeader title="歌单">
        </PublicHeader>
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
            <div className="right">
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

        {/*简介信息*/}
        <div className="songList_intro">
          <div className="songList_intro_tag">
            <span>标签: </span>
            {
              list.tags && list.tags.map((tags_item) => (
                  <a href="">{tags_item}</a>
              ))
            }
          </div>
          <div className="songList_intro_text" dangerouslySetInnerHTML={{__html: list.description}}>
          </div>
        </div>

        {/*歌曲列表*/}
        <div className="wrapper songList_list">
          <ul>
            {
              list.tracks && list.tracks.map((item, index) => (
                  <li key={index} className="flex songList_list_item">
                    <div className="left">
                      <h3>{item.name}</h3>
                      <p>{item.ar && item.ar[0].name}</p>
                    </div>
                    <div className="right">

                    </div>
                  </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default SongList
