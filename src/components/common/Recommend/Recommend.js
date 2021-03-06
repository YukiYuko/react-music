import './styles.less'
import React from 'react'
import PropTypes from 'prop-types';
import {numberFilter} from '../../../filters/index'
import Lazy from '../../../components/public/Lazy/lazy'
import PlaceholderComponent from '../../../components/public/placeholder/placeholder'

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
    const {list, width='32%'} = this.props;
    const config = {
      options: {
        error: 'errorPic',
        loading: 'loadingPic'
      },
      src: ''
    };
    return (
      <div className="recommend flex justify-between wrap-wrap">
        {
          list.map((item, index) => {
            const _item = item.song ? item.song.album : item;
            return (
              <div className="recommend-item" style={{width: width}} key={index} onClick={this.goDetail.bind(this, _item)}>
                <div className="recommend-item-img">
                  <Lazy src={_item.picUrl || _item.coverImgUrl} alt="touxiang"/>
                  {
                    !_item.playCount ? '' : (
                        <div className="num">
                          <i className="iconfont icon-erji"></i>
                          <span>{numberFilter(_item.playCount)}</span>
                        </div>
                    )
                  }
                </div>
                {
                  !_item.name ? '' : (
                      <h3>{_item.name}</h3>
                  )
                }
                {/*{*/}
                {/*item.is_free ? '' : (*/}
                {/*<p>付费精品</p>*/}
                {/*)*/}
                {/*}*/}
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
