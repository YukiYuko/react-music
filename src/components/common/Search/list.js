import React from 'react'
import './list.less'
import Navigator from "../../public/Navigator/Navigator";
import Swiper from "react-id-swiper";

class SearchList extends React.Component {
  componentDidMount() {}

  // 点击menu
  selectNav = (type, index) => {
    console.log('type', type);
    this.refs.swiper.swiper.slideTo(index-1)
  };

  render() {
    const {tabs, currentTabIndex, selectNav} = this.props;
    const params = {
      pagination: {
        clickable: true,
        dynamicBullets: true
      },
      spaceBetween: 30,
      rebuildOnUpdate: true,
      on: {
        slideChangeTransitionEnd: (e) => {
          let index = this.refs.swiper.swiper.activeIndex;
          this.refs.navigator._adjust(index+1);
        }
      }
    };
    return (
        <div className="searchList flex dir-column">
          <div className="searchListType">
            <Navigator currentTabIndex={currentTabIndex} ref="navigator" selectNav={this.selectNav} navList={tabs}/>
          </div>
          <div className="searchContent box1">
            <Swiper ref="swiper" {...params}>
              {
                tabs.map((item, index) => (
                    <div className="slider-item" key={index}>
                      <div className="slider-item-inner">
                        {item.name}
                      </div>
                    </div>
                ))
              }
            </Swiper>
          </div>
        </div>
    )
  }
}
export default SearchList
