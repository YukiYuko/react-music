import React from 'react';
import './play.less';
import PublicHeader from '../../components/public/header/Header';
import {songDetail, songUrl, lyric} from '../../request/api';
import {Toast, Modal, ActionSheet} from "antd-mobile";
import Lyric from 'lyric-parser';
import Scroll from '../../components/public/scroll/scroll'


class Play extends React.Component {

  state = {
    isPlay: false,
    currentTime: 0,
    currentTotalTime: '',
    left: 0,
    startX: 0,
    moveX: 0,
    // 播放类型 random: 0，single: 1, order: 2
    playType: 2,
    song: '',
    url: '',
    showPlayList: false,
    clicked2: false,
    lyrics: '',
    currentLineNum: 0,
    data: [1,1,1,2,2,2,2,3,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    showlyrics: false
  };

  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));

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
    // 初始化canvas
    this.initCanvas();
    // 获取音乐ID
    this.id = this.props.match.params.id;
    // 获取音乐链接
    this.getSongUrl();
    // 获取音乐详情
    this.getSongDetail();
    // 获取歌词
    this.getLyric();

    console.log(this.refs.scroll)
  }

  // 获取音乐链接
  getSongUrl ()  {
    songUrl({id: this.id}).then((res) => {
      if (res.code === 200) {
        this.setState({
          url: res.data[0].url
        }, () => {
          console.log(this.state.url)
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取音乐详情
  getSongDetail () {
    songDetail({ids: this.id}).then((res) => {
      if (res.code === 200) {
        this.setState({
          song: res.songs[0]
        }, () => {
          console.log(this.state.song)
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }
  // 获取歌词
  getLyric () {
    lyric({id: this.id}).then((res) => {
      if (res.code === 200) {
        this.setState({
          lyrics: new Lyric(res.lrc.lyric, this.handleLyric)
        }, () => {
          console.log(this.state.lyrics)
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  // 播放与暂停
  play () {
    this.setState({
      isPlay: !this.state.isPlay
    }, () => {
      if (this.state.isPlay) {
        this.x.play();
        this.state.lyrics.play();
      } else {
        this.x.pause();
        this.state.lyrics.stop();
      }
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
  // 构建canvas
  initCanvas () {
    this.myCanvas = document.getElementById('myCanvas');
    this.ctx = this.myCanvas.getContext('2d');
    this.myCanvas.width = window.innerWidth;
    this.myCanvas.height = this.myCanvas.width;
    //获取API
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    //实例化AudioContext对象
    this.context = new AudioContext();
    //加载媒体  this.x

    //创建节点
    this.source = this.context.createMediaElementSource(this.x);
    this.analyser = this.context.createAnalyser();

    //连接：source → analyser → destination
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);

    this.output = new Uint8Array(361);

    // 开始绘制
    this.drawSpectrum();

  }

  // 绘制
  drawSpectrum () {
    //创建数据
    let R = this.myCanvas.width / 2;
    this.analyser.getByteFrequencyData(this.output);//获取频域数据
    this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    //画线条
    for (let i = 0; i < this.output.length; i+=1.5) {
      let value = this.output[i] / 8;//<===获取数据

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(R, R);
      //R * cos (PI/180*一次旋转的角度数) ,-R * sin (PI/180*一次旋转的角度数)
      this.ctx.lineTo(Math.cos( (i*0.5 + 90)*Math.PI / 180) * (150 + value) + R, Math.sin( (i*0.5 + 90)*Math.PI / 180) * (150 + value) + R);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(R, R);
      //R * cos (PI/180*一次旋转的角度数) ,-R * sin (PI/180*一次旋转的角度数)
      this.ctx.lineTo(Math.sin( (i*0.5)*Math.PI / 180) * (150 + value) + R, Math.cos( (i*0.5)*Math.PI / 180) * (150 + value) + R);
      this.ctx.stroke();

    }
    //画一个小圆，将线条覆盖
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.arc(R, R, 140, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "#fff";
    this.ctx.stroke();
    this.ctx.fill();
    //请求下一帧
    requestAnimationFrame(() => {this.drawSpectrum()})
  }

  // 打开弹窗
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  // 关闭弹窗
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  // 分享相关
  showShareActionSheetMulpitleLine = () => {
    const data = [[...this.dataList, this.dataList[2]], [this.dataList[3], this.dataList[4]]];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: '分享到',
    },
    (buttonIndex, rowIndex) => {
      this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
    });
  };

  // 滚动歌词相关

  handleLyric = ({lineNum, txt}) => {
    this.setState({
      currentLineNum: lineNum
    }, () => {
      console.log(this.state.currentLineNum);
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 5) {
        let dom = document.querySelectorAll('.text');
        console.log(dom);
        let lineEl = dom[lineNum - 5];
        // 结合better-scroll，滚动歌词
        this.refs.scroll.scrollToElement(lineEl, 1000)
      } else {
        this.refs.scroll.scrollToElement(0, 0, 1000)
      }
    });
  };

  render() {
    const {isPlay,
      currentTime,
      currentTotalTime,
      left,
      playType,
      song,
      url, lyrics, currentLineNum, showlyrics
    } = this.state;
    const playTypeClass = ['icon-suijibofang01', 'icon-danquxunhuan', 'icon-liebiaoxunhuan'][playType];

    return (
        <div className="play">
          <div className="playBg" style={{backgroundImage: `url(${song.al && song.al.picUrl})`}}>
          </div>
          <div className="playBox">
            <PublicHeader title={song.name} color="#444">
              <i onClick={this.showShareActionSheetMulpitleLine} className="iconfont icon-fenxiang"></i>
            </PublicHeader>
            {/*歌曲相关信息*/}
            <div className="song_intro">
              <div className="author">{song.ar && song.ar[0].name}</div>
              <div className="edit flex justify-between">
                <div><p>作曲</p> <br/> <p>骆集益</p></div>
                <div><p>作词</p> <br/> <p>鸾凤鸣</p></div>
                <div><p>编曲</p> <br/> <p>恒涳</p></div>
              </div>
            </div>

            {/*歌词等*/}
            <div className="play_box" style={{display: `${!showlyrics ? 'block':'none'}`}}>
              <audio id="myAudio" src={url}
                     crossOrigin="anonymous"
                     onTimeUpdate={() => this.handleTimeUpdate()}
                     onCanPlay={() => this.handleAudioCanplay()}
              >
                您的浏览器不支持 audio 标签。
              </audio>
              <canvas id="myCanvas"/>
              <div onClick={this.showModal('showlyrics')}
                   className={`playImg ${this.state.isPlay ? 'rotate':'rotate pause'}`} style={{backgroundImage: `url(${song.al && song.al.picUrl})`}}/>
            </div>

            {/*歌词部分*/}
            <div className="lyric" style={{display: `${showlyrics ? 'block':'none'}`}}>
              <Scroll ref="scroll" data={lyrics.lines} >
                <div className="lyric-wrap" onClick={this.onClose('showlyrics')}>
                  {
                    lyrics.lines && lyrics.lines.map((line, index) => (
                        <p className={`text ${currentLineNum===index ? 'current':''}`}
                           key={index}
                           ref="lyricLine"
                        >{line.txt}</p>
                    ))
                  }
                </div>
              </Scroll>
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
                  <a onClick={this.showModal('showPlayList')}><i className="iconfont icon-liebiao"></i></a>
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

          {/*播放列表弹出框*/}
          <Modal
              popup
              visible={this.state.showPlayList}
              onClose={this.onClose('showPlayList')}
              animationType="slide-up"
          >
            <div className="modal-wrap">
              <div className="playList flex dir-column">
                <div className="playListHead flex justify-between">
                  <div className="left flex items-center">
                    <i className={`iconfont ${playTypeClass}`}></i>
                    <span>单曲循环</span>
                  </div>
                  <div className="right flex items-center">
                    <div>
                      <i className="iconfont icon-shoucang"></i>
                      <span>收藏全部</span>
                    </div>
                    <div>
                      <i className="iconfont icon-shanchu"></i>
                    </div>
                  </div>
                </div>
                <div className="playListCont box1">
                  <ul>
                    <li className="playListItem flex items-center playing">
                      <div className="left box1">
                        <i className="iconfont icon-playing"></i>
                        <span className="name">斗罗大陆 - 动画网络剧《斗罗大陆》 主题曲</span>
                        <span className="author">萧敬腾</span>
                      </div>
                      <div className="right">
                        <i className="iconfont icon-guanbi"></i>
                      </div>
                    </li>
                  </ul>
                </div>
                <div onClick={this.onClose('showPlayList')} className="playListFoot">
                  关闭
                </div>
              </div>
            </div>
          </Modal>

          {/*分享弹出框*/}


        </div>
    )
  }
}

export default Play
