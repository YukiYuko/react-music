import React from 'react';
import './scroll.less';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

const COMPONENT_NAME = 'scroll';
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

class Scroll extends React.Component {
  componentDidMount() {
    this.initScroll();
  }
  componentWillUpdate(nextProps, nextState) {
    setTimeout(() => {
      this.forceUpdate(true)
    }, 20)
  }

  state = {
    isPullUpLoad: false,
    pullUpTxt: '正在加载中'
  };

  clickItem = (item) => {
    console.log('item', item)
  };

  initScroll = () => {
    if (!this.refs.wrapper) {
      return
    }
    let options = {
      probeType: this.props.probeType || 1,
      click: this.props.click || true,
      scrollY: this.props.freeScroll || this.props.direction === DIRECTION_V,
      scrollX: this.props.freeScroll || this.props.direction === DIRECTION_H,
      scrollbar: this.props.scrollbar || false,
      freeScroll: this.props.freeScroll || false,
      pullUpLoad: this.props.pullUpLoad || false
    };
    this.scroll = new BScroll(this.refs.wrapper, options);

    if (this.props.pullUpLoad) {
      this._initPullUpLoad()
    }
  };

  scrollToElement () {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  scrollTo () {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }

  refresh() {
    this.scroll && this.scroll.refresh()
  }
  _initPullUpLoad() {
    this.scroll.on('pullingUp', () => {
      this.setState({
        isPullUpLoad: true
      }, () => {
        this.props.pullingUp();
      });
    })
  }

  forceUpdate (dirty) {
    if (this.props.pullUpLoad && this.state.isPullUpLoad) {
      this.setState({
        isPullUpLoad: false
      },() => {
        this.scroll.finishPullUp();
        this.setState({
          pullUpDirty: dirty
        });
        this.refresh()
      });
    } else {
      this.refresh()
    }
  }

  computedPullUpTxt() {
    return this.state.pullUpDirty ? '正在加载中' : '没有更多数据了'
  }

  render() {

    const {data, pullUpLoad} = this.props;
    const {isPullUpLoad} = this.state;

    const DefaultHtml = () => {
      return (
          <ul className="list-content">
            {
              data && data.map((item, index) => (
                  <li onClick={this.clickItem(item)} className="list-item" key={index}>{item}</li>
              ))
            }
          </ul>
      );
    };
    return (
        <div ref="wrapper" className="list-wrapper">
          <div className="scroll-content">
            {
              this.props.children ? this.props.children : <DefaultHtml></DefaultHtml>
            }
            {/*上啦加载*/}
            {
              pullUpLoad &&
              <div className="pullup-wrapper">
                {
                  !isPullUpLoad ?
                      <div className="before-trigger">
                        <span>{this.computedPullUpTxt()}</span>
                      </div>:
                      <div className="after-trigger">
                        {/*<loading></loading>*/}
                        Loading in...
                      </div>
                }
              </div>
            }
          </div>
        </div>
    )
  }
}
Scroll.defaultProps = {
  direction: DIRECTION_V
};
export default Scroll
