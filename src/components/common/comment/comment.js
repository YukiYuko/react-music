import React from 'react'
import until from "../../../until";
import './comment.less'

class Comment extends React.Component {
  componentDidMount() {}
  render() {
    const {comments} = this.props;
    return (
        <div className="commentList">
          {
            comments && comments.map((item, index) => (
                <div className="commentItem flex" key={index}>
                  <div className="left">
                    <img src={item.user.avatarUrl} alt={item.user.nickname}/>
                  </div>
                  <div className="right box1">
                    <div className="title flex justify-between">
                      <span>{item.user.nickname}</span>
                      <a><i className="iconfont icon-dianzan"></i> {item.likedCount}</a>
                    </div>
                    <p className="time">{until.formatTime(item.time)}</p>
                    <div className="text">
                      <p>{item.content}</p>
                      {
                        item.beReplied.length ? <div className="reply">
                          <a>@{item.beReplied[0].user.nickname}:</a>
                          <span>{item.beReplied[0].content}</span>
                        </div> : ''
                      }
                    </div>
                  </div>
                </div>
            ))
          }
        </div>
    )
  }
}
export default Comment
