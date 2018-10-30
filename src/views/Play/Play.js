import React from 'react';
import './play.less';
import PublicHeader from '../../components/public/header/Header';

class Play extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
        <div className="play">
          <PublicHeader title="流月人间" color="#444"/>
          <div className="song_intro">
            <div className="author">河图</div>
            <div className="edit flex justify-between">
              <div><p>作曲</p> <br/> <p>骆集益</p></div>
              <div><p>作词</p> <br/> <p>鸾凤鸣</p></div>
              <div><p>编曲</p> <br/> <p>恒涳</p></div>
            </div>
          </div>
          <div className="play_group">
            <div className="play_btn flex items-center">
              <div className="left">
                <a><i className="iconfont icon-danquxunhuan"></i></a>
              </div>
              <div className="center flex justify-between box1">
                <a><i className="iconfont icon-shangyiqu"></i></a>
                <a><i className="iconfont icon-zanting"></i></a>
                <a><i className="iconfont icon-xiayiqu"></i></a>
              </div>
              <div className="right">
                <a><i className="iconfont icon-liebiao"></i></a>
              </div>
            </div>
            <div className="play_progress flex items-center justify-between">
              <div className="left">
                0:00
              </div>
              <div className="center">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="circle"></div>
              </div>
              <div className="right">
                4:37
              </div>
            </div>
            <div className="play_share flex items-center justify-between">
              <a><i className="iconfont icon-xihuan1 icon_suki"></i></a>
              <a><i className="iconfont icon-download"></i></a>
              <a><i className="iconfont icon-share"></i></a>
              <a><i className="iconfont icon-liuyan"></i></a>
            </div>
          </div>
        </div>
    )
  }
}

export default Play
