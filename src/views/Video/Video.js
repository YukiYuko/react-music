import React from 'react'
import './Video.less'
import SearchComponent from '../../components/common/Search/Search';
import FooterComponent from '../../components/common/Footer/footer';
import {mvFirst} from "../../request/api";
import {Toast, Modal} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import {Link} from 'react-router-dom'


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
        console.log(res);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }


  render() {
    const {visible, first} = this.state;
    return (
      <div className="videoComponent flex dir-column">
        <div className="videoHead flex dir-column">
          <SearchComponent/>
          <div className="videoMenu box1"/>
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
