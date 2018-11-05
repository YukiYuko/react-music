import React from 'react'
import PropTypes from 'prop-types';
class ListItem extends React.Component {
  componentDidMount() {
  }

  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  toPlay () {
    this.context.router.history.push({pathname : `/Play/${this.props.item.id}`})
  }

  render() {
    const item = this.props.item;
    const index = this.props.index;
    return (
        <li onClick={() => this.toPlay()} className="flex songList_list_item items-center" index={index + 1}>
          <div className="left box1">
            <h3>{item.name}</h3>
            <p>{item.ar && item.ar[0].name}</p>
            <div className="icon">
              <i className="iconfont icon-bofang"></i>
              <i className="iconfont icon-gengduo"></i>
            </div>
          </div>
        </li>
    )
  }
}

export default ListItem
