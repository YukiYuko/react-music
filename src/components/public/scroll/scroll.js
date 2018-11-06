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
      freeScroll: this.props.freeScroll || false
    };
    this.scroll = new BScroll(this.refs.wrapper, options);
  };

  render() {

    const {data} = this.props;

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
          </div>
        </div>
    )
  }
}
Scroll.defaultProps = {
  direction: DIRECTION_V
};
export default Scroll
