import React from 'react'
import './videoDetail.less'
import {mvDetail, mvUrl, simiMv, commentMv} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import PublicHeader from '../../components/public/header/Header';
import {numberFilter} from '../../filters/index'
import until from '../../until/index'


class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      id: '',
      url: '',
      simiList: [],
      comments: [],
      hotComments: []
    }
  }
  componentDidMount() {
    this.getDetail();
    this.getUrl();
    this.getSimiMvl();
    this.getCommentMv();
  }

  // 获取详情
  getDetail () {
    let params = {
      mvid: this.props.match.params.id
    };
    mvDetail(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          detail: res.data
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
// 获取url
  getUrl () {
    let params = {
      id: this.props.match.params.id
    };
    mvUrl(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          url: res.data
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取相关mv
  getSimiMvl () {
    let params = {
      mvid: this.props.match.params.id
    };
    simiMv(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          simiList: res.mvs
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取评论
  getCommentMv () {
    let params = {
      id: this.props.match.params.id
    };
    commentMv(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          hotComments: res.hotComments,
          comments: res.comments
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  render() {
    const {detail, url, simiList, comments, hotComments} = this.state;
    return (
        <div className="videoDetail flex dir-column">
          <PublicHeader title="" background="none"/>
          {
            url && <video
                id="my-player"
                className="video-js vjs-big-play-centered"
                controls
                preload="auto"
                poster={detail.cover}
                data-setup='{}'>
              <source src={url.url} type="video/mp4"/>
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
            </video>
          }
          <div className="videoWrap box1">
            <Scroll>
              <div className="mess">
                <div className="title">{detail.briefDesc}</div>
                <div className="intro">
                  <span>简介: {detail.desc}</span>
                </div>
                <div className="time">
                  <span>发布时间: {detail.publishTime}</span>
                  <span>播放: {numberFilter(detail.playCount)}</span>
                </div>
                <div className="share flex items-center">
                  <div>
                    <i className="iconfont icon-dianzan"></i>
                    <p>1212</p>
                  </div>
                  <div>
                    <i className="iconfont icon-shoucang"></i>
                    <p>21</p>
                  </div>
                  <div>
                    <i className="iconfont icon-liuyan"></i>
                    <p>435</p>
                  </div>
                  <div>
                    <i className="iconfont icon-share"></i>
                    <p>56</p>
                  </div>
                </div>
              </div>
              {/*相关推荐*/}
              <div className="about">
                <div className="section-title">
                  相关MV
                </div>
                <div className="mvList">
                  {
                    simiList && simiList.map((item, index) => (
                        <div className="mvItem flex items-center" key={index}>
                          <div className="left">
                            <img src={item.cover} alt={item.name}/>
                          </div>
                          <div className="right box1">
                            <h3>{item.name}</h3>
                            <p>{item.artistName}</p>
                          </div>
                        </div>
                    ))
                  }
                </div>
              </div>
              {/*热门评论*/}
              <div className="hotComment">
                <div className="section-title">
                  精彩评论
                </div>
                <div className="commentList">
                  {
                    hotComments && hotComments.map((item, index) => (
                      <div className="commentItem flex" key={index}>
                        <div className="left">
                          <img src={item.user.avatarUrl} alt={item.user.nickname}/>
                        </div>
                        <div className="right box1">
                          <div className="title flex justify-between">
                            <span>{item.user.nickname}</span>
                            <a><i className="iconfont icon-dianzan"></i> {item.likedCount}</a>
                          </div>
                          <p className="time">{until.formatTime(item.time)}</p>
                          <div className="text">
                            <p>{item.content}</p>
                            {
                              item.beReplied.length ? <div className="reply">
                                <a>@{item.beReplied[0].user.nickname}:</a>
                                <span>{item.beReplied[0].content}</span>
                              </div> : ''
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Scroll>
          </div>
        </div>
    )
  }
}
export default VideoDetail
