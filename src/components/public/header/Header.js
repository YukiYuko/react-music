import React from 'react';
import './header.less';
import PropTypes from 'prop-types';

class PublicHeader extends React.Component {
  constructor (props) {
    super(props);
  }
  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
    console.log(this.context)
  }

  render() {
    const {title, color = '#fff'} = this.props;
    return (
        <div className="public-header flex items-center" style={{'color': color }}>
          <div className="left" onClick={this.context.router.history.goBack}>
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
