import React from 'react'
import './message.less'

class Message extends React.Component {
  componentDidMount() {}
  render() {
    const {hot, localSearchList, getSearch} = this.props;
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
                  <a key={index} onClick={() => this.props.getSearch(item.first)}>{item.first}</a>
              ))
            }
          </div>
        </div>
        <div className="search-history">
          {
            localSearchList && localSearchList.map((item, index) => (
              <div onClick={() => this.props.getSearch(item)} className="search-history-item flex justify-between" key={index}>
                {item}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
export default Message
