import React from 'react'

class ListItem extends React.Component {
  componentDidMount() {
  }

  render() {
    const item = this.props.item;
    const index = this.props.index;
    return (
        <li className="flex songList_list_item items-center" index={index + 1}>
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
