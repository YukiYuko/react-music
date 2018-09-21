import './styles.less'
import React from 'react'
import reactDom from 'react-dom'
import touxiang from "../../../assets/images/touxiang.png";

class Recommend extends React.Component {
  componentDidMount() {}
  render() {
    const {list} = this.props;
    return (
      <div className="recommend flex justify-between wrap-wrap">
        {
          list.map((item, index) => {
            return (
              <div className="recommend-item" key={index}>
                <div className="recommend-item-img">
                  <img src={item.picUrl} alt="touxiang"/>
                  {
                    !item.image_text ? '' : (
                      <p>{item.image_text}</p>
                    )
                  }
                  {
                    item.is_free ? '' : (
                      <p>付费精品</p>
                    )
                  }
                </div>
                <div className="recommend-item-text">
                  {item.title}
                </div>
                {
                  !item.sub ? '' : (
                    <div className="recommend-item-sub">
                      {item.sub}
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Recommend
