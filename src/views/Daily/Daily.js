import React from 'react'
import PublicHeader from '../../components/public/header/Header';
import {recommendSongs} from "../../request/api";
import {Toast} from "antd-mobile";
class Daily extends React.Component {
  componentDidMount() {
    this.getRecomend();
  }

  // 获取热门分类
  getRecomend () {
    recommendSongs().then((res) => {
      if (res.code === 200) {
        // this.setState({
        //   cat: res.tags
        // });
        console.log(res)
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }

  render() {
    return (
        <div className="daily">
          <PublicHeader title="每日推荐"/>
        </div>
    )
  }
}
export default Daily
