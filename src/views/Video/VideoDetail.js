import React from 'react'
import './videoDetail.less'
import {mvDetail, mvUrl, simiMv, commentMv} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import PublicHeader from '../../components/public/header/Header';
import Comment from '../../components/common/comment/comment';
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
      comments: '',
      hotComments: '',
      limit: 20,
      page: 0
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
      id: this.props.match.params.id,
      limit: this.state.limit,
      offset: this.state.page * this.state.limit
    };
    if (this.state.page < 3)  {
      commentMv(params).then((res) => {
        if (res.code === 200) {
          this.setState({
            hotComments: !this.state.hotComments ? res.hotComments : this.state.hotComments,
            comments: [...this.state.comments,...res.comments],
            page: this.state.page + 1
          });
        }else {
          Toast.fail('Load failed !!!', 2);
        }
      })
    } else {
      this.refs.scroll.forceUpdate();
    }
  }
  // 上拉加载
  pullingUp () {
    this.getCommentMv();
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
                preload={false}
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
            <Scroll data={comments} ref="scroll" pullUpLoad={true} pullingUp={this.pullingUp.bind(this)}>
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
                    <p>{numberFilter(detail.likeCount)}</p>
                  </div>
                  <div>
                    <i className="iconfont icon-shoucang"></i>
                    <p>{numberFilter(detail.subCount)}</p>
                  </div>
                  <div>
                    <i className="iconfont icon-liuyan"></i>
                    <p>{numberFilter(detail.commentCount)}</p>
                  </div>
                  <div>
                    <i className="iconfont icon-share"></i>
                    <p>{numberFilter(detail.shareCount)}</p>
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
              {
                hotComments && <div className="hotComment">
                  <div className="section-title">
                    精彩评论
                  </div>
                  <Comment comments={hotComments}></Comment>
                </div>
              }
              {/*最新评论*/}
              <div className="hotComment">
                <div className="section-title">
                  最新评论
                </div>
                <Comment comments={comments}></Comment>
              </div>
            </Scroll>
          </div>
        </div>
    )
  }
}
export default VideoDetail
