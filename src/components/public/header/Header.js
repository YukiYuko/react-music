import React from 'react';
import './header.less';

class PublicHeader extends React.Component {
  componentDidMount() {
  }

  render() {
    const {title} = this.props;
    return (
        <div className="public-header flex items-center">
          <div className="left">
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="center box1">
            {title}
          </div>
          <div className="right">
            {this.props.children}
          </div>
        </div>
    )
  }
}

export default PublicHeader
