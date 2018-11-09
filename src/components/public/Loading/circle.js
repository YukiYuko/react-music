import React from 'react'
import './circle.less'
class Circle extends React.Component {
  componentDidMount() {}
  render() {
    return (
        <div className="wrap-preload circle-ball">
          <div className="overlay"></div>
          <div className="wrap-content">
            <div className="wrap-circle-ball">
              <div className="wrap-ball">
                <div className="ball ball-top"></div>
                <div className="ball ball-top"></div>
              </div>
              <div className="wrap-ball">
                <div className="ball ball-bot"></div>
                <div className="ball ball-bot"></div>
              </div>
              <div className="wrap-effect">
                <div className="wrap-circle">
                  <div className="circle-effect left"></div>
                  <div className="circle-effect left"></div>
                </div>
                <div className="wrap-circle">
                  <div className="circle-effect right"></div>
                  <div className="circle-effect right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Circle
