import React from 'react';
import './play.less';
import PublicHeader from '../../components/public/header/Header';
import mp3 from '../../assets/mp3/daojiangxing.mp3'

class Play extends React.Component {

  state = {
    isPlay: false,
    currentTime: 0,
    currentTotalTime: '',
    left: 0,
    startX: 0,
    moveX: 0,
    // 播放类型 random: 0，single: 1, order: 2
    playType: 2
  };

  componentDidMount() {
    // 获取音乐对象
    this.x = document.getElementById('myAudio');
    // 获取滚动条的长度
    this.xWithd = document.querySelector('.progressBar').clientWidth;
    // 获取小圆点
    this.audioPoint = document.querySelector('.circle');
    // 获取滚动条距离屏幕左边的距离
    this.offsetWindowLeft = document.querySelector('.progressBar').offsetLeft;
    // 初始化拖动
    this.initListenTouch();
  }

  // 播放与暂停
  play () {
    this.setState({
      isPlay: !this.state.isPlay
    }, function () {
      this.state.isPlay ? this.x.play() : this.x.pause()
    });
  }
  // 监听当前播放时间
  handleTimeUpdate (e) {
    if (this.state.currentTime < (this.state.currentTotalTime - 1)) {
      this.setState({
        currentTime: this.x.currentTime
      }, function () {
      });
    } else {
      // 此情况为音频已播放至最后

      if (this.state.playType === 1) {
      // 单曲循环
      // currentTime归零，并且手动将audio的currentTime设为0，并手动执行play()
        this.setState({
          currentTime: 0
        }, () => {
          this.x.currentTime = this.state.currentTime;
          this.x.play();
        })

      } else if (this.state.playType === 0) {
      // 随机播放

      } else {
      // 列表循环

      }
    }
  }
  // 准备好播放的时候
  handleAudioCanplay () {
    this.setState({
      currentTotalTime: this.x.duration,
      moveX: this.x.duration / this.xWithd
    });
  }
  // 格式化时间
  /**
   * 将秒转换为 分:秒
   * s int 秒数
   */
  s_to_hs(s){
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h  =   Math.floor(s/60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s  =   Math.floor(s%60);
    //将变量转换为字符串
    h    +=    '';
    s    +=    '';
    //如果只有一位数，前面增加一个0
    h  =   (h.length===1)?'0'+h:h;
    s  =   (s.length===1)?'0'+s:s;
    return h+':'+s;
  }
  // 初始化拖动
  initListenTouch() {
    this.audioPoint.addEventListener('touchstart', (e) => this.pointStart(e), false);
    this.audioPoint.addEventListener('touchmove', (e) => this.pointMove(e), false);
    this.audioPoint.addEventListener('touchend', (e) => this.pointEnd(e), false);
  }
  // 开始拖动
  pointStart (e) {
    console.log('拖动开始');
    e.preventDefault();
    let touch = e.touches[0];
    console.log('初始pagex', touch.pageX);
    // 拖动的时候暂停
    this.x.pause();
    this.setState({
      isPlay: false,
      startX: touch.pageX
    })
  }
  // 拖动中
  pointMove (e) {
    console.log('拖动中');
    e.preventDefault();
    let touch = e.touches[0];
    let x = touch.pageX - this.state.startX;
    let left = x + this.state.startX - this.offsetWindowLeft;
    if (x >= 0) {
      // 如果 距离 大于了进度条的宽度
      if (left >= this.xWithd) {
        this.setState({
          currentTime: this.state.currentTotalTime
        }, () => {
          this.x.currentTime = this.state.currentTime
        });
      } else {
        this.setState({
          currentTime: left * this.state.moveX
        }, () => {
          this.x.currentTime = this.state.currentTime;
        });
      }
    } else {
      if (-x <= this.state.startX - this.offsetWindowLeft) {
        this.setState({
          currentTime: (this.state.startX + x - this.offsetWindowLeft) * this.state.moveX,
        }, () => {
          this.x.currentTime = this.state.currentTime;
        })
      } else {
        this.setState({
          currentTime: 0
        }, () => {
          this.x.currentTime = this.state.currentTime;
        })
      }
    }
  }
  // 结束拖动
  pointEnd (e) {
    console.log('拖动结束');
    e.preventDefault();
    //关于300ms的setTimeout，一是为了体验的良好，大家在做的时候可以试试不要300ms的延迟，会发现收听体验不好，音频的播放十分仓促。
    //另外还有一点是，audio的pause与play间隔过短会出现报错，导致audio无法准确的执行相应的动作。
    if (this.state.currentTime < this.state.currentTotalTime) {
      setTimeout(() =>{
        this.play();
      }, 300)
    }
  }
  // 切换播放类型
  switchType () {
    if (this.state.playType >= 2) {
      this.state.playType = 0;
      this.setState({
        playType: this.state.playType
      })
    } else {
      this.state.playType++;
      this.setState({
        playType: this.state.playType
      })
    }
  }


  render() {
    const {isPlay, currentTime, currentTotalTime, left, playType} = this.state;
    const playTypeClass = ['icon-suijibofang01', 'icon-danquxunhuan', 'icon-liebiaoxunhuan'][playType];
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

          {/*歌词等*/}
          <div className="play_box">
            <audio id="myAudio" src={mp3}
                   onTimeUpdate={() => this.handleTimeUpdate()}
                   onCanPlay={() => this.handleAudioCanplay()}
            >
              您的浏览器不支持 audio 标签。
            </audio>
          </div>

          {/*播放相关操作*/}
          <div className="play_group">
            <div className="play_btn flex items-center">
              <div className="left">
                <a onClick={() => this.switchType()}><i className={`iconfont ${playTypeClass}`}></i></a>
              </div>
              <div className="center flex justify-between box1">
                <a><i className="iconfont icon-shangyiqu"></i></a>
                <a onClick={this.play.bind(this)}><i className={`iconfont ${this.state.isPlay ? 'icon-zanting' : 'icon-bofang1'}`}></i></a>
                <a><i className="iconfont icon-xiayiqu"></i></a>
              </div>
              <div className="right">
                <a><i className="iconfont icon-liebiao"></i></a>
              </div>
            </div>
            <div className="play_progress flex items-center justify-between">
              <div className="left">
                {this.s_to_hs(currentTime)}
              </div>
              <div className="center progressBar">
                <div className="line1"></div>
                <div className="line2" style={{'width': `${currentTime/currentTotalTime * this.xWithd}px`}}></div>
                <div className="circle" style={{'left': `${currentTime/currentTotalTime * this.xWithd}px`}}></div>
              </div>
              <div className="right">
                {this.s_to_hs(currentTotalTime)}
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
