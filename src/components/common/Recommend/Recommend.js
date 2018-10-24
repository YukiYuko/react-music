import './styles.less'
import React from 'react'
import PropTypes from 'prop-types';
import {numberFilter} from '../../../filters/index'

class Recommend extends React.Component {
  constructor (props) {
    super(props);
  }
  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {

  }
  goDetail (item, e) {
    // console.log('每条数据',item);
    // console.log('事件对象e要放在最后',e);
    this.context.router.history.push({pathname : `/SongList/${item.id}`})
  }
  render() {
    const {list} = this.props;
    return (
      <div className="recommend flex justify-between wrap-wrap">
        {
          list.map((item, index) => {
            const _item = item.song ? item.song.album : item;
            return (
              <div className="recommend-item" key={index} onClick={this.goDetail.bind(this, _item)}>
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
