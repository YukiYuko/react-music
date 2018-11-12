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

  goBack () {
    if (this.props.back) {
      this.props.back();
      return
    }
    this.context.router.history.goBack();
  }

  render() {
    const {title, color = '#fff', background = '#d94036'} = this.props;
    return (
        <div className="public-header flex items-center" style={{'color': color, 'background': background}}>
          <div className="left" onClick={() => this.goBack()}>
            {
              !this.props.left ? <i className="iconfont icon-fanhui"/> : this.props.left
            }
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
