import React from 'react'
import './message.less'

class Message extends React.Component {
  componentDidMount() {}
  render() {
    const {hot} = this.props;
    return (
      <div className="searchMess">
        <div className="singer-cat">
          <i className="iconfont icon-geshou"/>
          <span>歌手分类 ></span>
        </div>
        <div className="search-hot">
          <div className="search-hot-title">热门搜索</div>
          <div className="search-hot-list flex wrap-wrap">
            {
              hot && hot.hots.map((item, index) => (
                  <a key={index}>{item.first}</a>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Message
