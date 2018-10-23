import './styles.less'
import React from 'react'
import {numberFilter} from '../../../filters/index'

class Recommend extends React.Component {
  componentDidMount() {}
  render() {
    const {list} = this.props;
    return (
      <div className="recommend flex justify-between wrap-wrap">
        {
          list.map((item, index) => {
            const _item = item.song ? item.song.album : item;
            return (
              <div className="recommend-item" key={index}>
                <div className="recommend-item-img">
                  <img src={_item.picUrl} alt="touxiang"/>
                  {
                    !_item.name ? '' : (
                      <h3>{_item.name}</h3>
                    )
                  }
                  {
                    !_item.playCount ? '' : (
                        <div className="num">
                            <i className="iconfont icon-erji"></i>
                            <span>{numberFilter(_item.playCount)}</span>
                        </div>
                    )
                  }
                  {/*{*/}
                    {/*item.is_free ? '' : (*/}
                      {/*<p>付费精品</p>*/}
                    {/*)*/}
                  {/*}*/}
                </div>
                <div className="recommend-item-text">
                  {_item.title}
                </div>
                {
                  !_item.sub ? '' : (
                    <div className="recommend-item-sub">
                      {_item.sub}
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
