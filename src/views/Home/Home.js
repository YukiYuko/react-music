import React from 'react'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/less/swiper.less'
import './Home.less'
class Home extends React.Component {

  state = {
    
  }

  componentDidMount() {
    
  }

  render() {

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true
      },
      spaceBetween: 30
    }

    return (
      <div className="home">
        <div className="red-bg"></div>
        <div className="scroll-warp">
          <div className="tab-warp">
            <Swiper {...params}>
              <div className="slider-item">
                <div className="slider-item-inner">1</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">2</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">3</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">4</div> 
              </div>
              <div className="slider-item">
                <div className="slider-item-inner">5</div> 
              </div>
            </Swiper>
          </div>
        </div> 
      </div>
    )
  }
}
export default Home