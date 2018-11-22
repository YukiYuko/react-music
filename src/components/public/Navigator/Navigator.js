import React from 'react'
import './navigator.less'
import Scroll from '../../public/scroll/scroll'

class Navigator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTab: 1,
      current: 1
    }
  }
  componentDidMount() {
    this._initTabListWidth();
    this.setState({
      current: this.props.currentTabIndex ? this.props.currentTabIndex : this.state.currentTab
    }, () => {
      this._adjust(this.state.current)
    });
  }


  selectNav = (item) => {
    this.setState({
      current: item.id
    }, () => {
      this._adjust(item.id);
    });
    this.props.selectNav(item.type, item.id)
  };

  _initTabListWidth() {
    const tabList = this.refs.tabList;
    const items = tabList.children;
    let width = 0;
    for (let i = 0; i < items.length; i++) {
      width += items[i].clientWidth
    }
    tabList.style.width = (width + 1) + 'px';
  }
  
  _adjust = (tabId) => {
    this.setState({
      current: tabId
    });
    const viewportWidth = this.refs.viewport.clientWidth;
    const tabListWidth = this.refs.tabList.clientWidth;
    const minTranslate = Math.min(0, viewportWidth - tabListWidth);
    const middleTranslate = viewportWidth / 2;
    const items = this.refs.tabList.children;
    let width = 0;
    this.props.navList.every((item, index) => {
      if (item.id === tabId) {
        return false
      }
      width += items[index].clientWidth;
      return true
    });
    let translate = middleTranslate - width;
    translate = Math.max(minTranslate, Math.min(0, translate));
    this.refs.scroll.scrollTo(translate, 0, 300)
  };

  render() {
    const {navList} = this.props;
    return (
      <div ref="viewport" className="navigator-component">
        <Scroll ref="scroll" direction="horizontal">
          <ul className="tab-list" ref="tabList">
            {
              navList.map((item, index) => (
                <li className="tab-item" onClick={() => this.selectNav(item)} key={index}>
                  <slot name="item" text={item.name} index={item.id}>
                    <span className={`tab-name ${this.state.current === item.id ? 'link-active' : ''}`}>{item.name}</span>
                  </slot>
                </li>
              ))
            }
          </ul>
        </Scroll>
      </div>
    )
  }
}
export default Navigator
