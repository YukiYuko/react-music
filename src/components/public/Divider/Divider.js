import React from 'react'
import './style.less'
class Divider extends React.Component {
  render() {
    return (
        <p className="divider">{this.props.children ? this.props.children : '我是有底线的~~~'}</p>
    )
  }
}
export default Divider
