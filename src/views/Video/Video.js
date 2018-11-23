import React from 'react'
import './Video.less'
import SearchComponent from '../../components/common/Search/Search';
import FooterComponent from '../../components/common/Footer/footer';
import {mvFirst} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import {Link} from 'react-router-dom'
import Navigator from "../../components/public/Navigator/Navigator";


class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      first: []
    }
  }
  componentDidMount() {
    this.getMvFirst();
  }

  // 获取最新mv
  getMvFirst () {
    let params = {
      limit: 10
    };
    mvFirst(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          first: res.data
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }


  render() {
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
    const {visible, first} = this.state;
    return (
      <div className="videoComponent flex dir-column">
        <div className="videoHead flex dir-column">
          <SearchComponent/>
          {/*<div className="videoMenu box1">*/}
            {/*<Navigator ref="navigator"  navList={tabs}/>*/}
          {/*</div>*/}
        </div>
        <div className="wrap videoWrap box1">
          <Scroll>
            <div className="videoList">
              {
                first && first.map((item, index) => (
                  <Link to={`/Video/${item.id}`} className="videoItem" key={index}>
                    <div className="videoBg">
                      <img className="cover" src={item.cover} alt=""/>
                      <i className="iconfont icon-bofang"></i>
                    </div>
                    <div className="title">{item.briefDesc}</div>
                    <div className="text flex justify-between items-center">
                      <div className="author">
                        {item.name}
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </Scroll>
        </div>
        <FooterComponent/>
      </div>
    )
  }
}
export default Video
