import React from 'react';
import './footer.less';
import PropTypes from 'prop-types';

class FooterComponent extends React.Component {
  componentDidMount() {
    console.log(this.context.router.route)
  }
  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  go(path) {
    this.context.router.history.push({pathname : path})
  };

  render() {
    const path = this.context.router.route.match.path;
    return (
        <div className="footer flex items-center">
          <div onClick={() => this.go('/')}
               className={`flex items-center justify-center dir-column ${path === '/' ? 'active': ''}`}>
            <i className="iconfont icon-menu-faxian"></i>
            <p>发现</p>
          </div>
          <div onClick={() => this.go('/Video')}
               className={`flex items-center justify-center dir-column ${path === '/Video' ? 'active': ''}`}>
            <i className="iconfont icon-menu-video"></i>
            <p>视频</p>
          </div>
          <div onClick={() => this.go('/Person')}
               className={`flex items-center justify-center dir-column ${path === '/Person' ? 'active': ''}`}>
            <i className="iconfont icon-menu-wode"></i>
            <p>我的</p>
          </div>
          <div onClick={() => this.go('/Friend')}
               className={`flex items-center justify-center dir-column ${path === '/Friend' ? 'active': ''}`}>
            <i className="iconfont icon-menu-pengyou"></i>
            <p>朋友</p>
          </div>
          <div onClick={() => this.go('/Setting')}
               className={`flex items-center justify-center dir-column ${path === '/Setting' ? 'active': ''}`}>
            <i className="iconfont icon-menu-zhanghao"></i>
            <p>账号</p>
          </div>
        </div>
    )
  }
}
export default FooterComponent
