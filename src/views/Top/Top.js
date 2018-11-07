import React from 'react'
import './top.less'
import {toplistDetail} from '../../request/api';
import PublicHeader from '../../components/public/header/Header';
import FooterComponent from '../../components/common/Footer/footer';
import {Toast} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';

class Top extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: ''
    }
  }
  componentDidMount() {
    this.getToplistDetail();
  }

  getToplistDetail () {
    toplistDetail({ids: this.id}).then((res) => {
      if (res.code === 200) {
        this.setState({
          list: res.list
        }, () => {
          console.log(this.state.list)
        });
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  render() {
    const {list} = this.state;
    return (
        <div className="topWrap">
          <PublicHeader title="排行榜" background="#d94036"/>
          <div className="topCont box1">
            <Scroll data={list} scrollbar={true}>
              <ul className="topList">
                {
                  list && list.map((item, index) => (
                      <li className="topListItem flex" key={index}>
                        <div className="left">
                          <img src={item.coverImgUrl} alt={item.name}/>
                          <span>{item.updateFrequency}</span>
                        </div>
                        <div className="right box1 flex justify-center dir-column">
                          {
                            item.tracks && item.tracks.map((tracks, tracksindex) => (
                                <p key={tracksindex}>{`${tracksindex+1}. ${tracks.first} - ${tracks.second}`}</p>
                            ))
                          }
                        </div>
                      </li>
                  ))
                }
              </ul>
            </Scroll>
          </div>
          <FooterComponent/>
        </div>
    )
  }
}
export default Top
