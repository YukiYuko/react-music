import React from 'react'
import { Tabs, Carousel } from 'antd-mobile';
import './Home.less'
const tabsList = [
  { title: '个性推荐', sub: '1'},
  { title: '主播电台', sub: '2' }
];
class Home extends React.Component {

  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  render() {
    return (
      <div className="home">
        <div className="red-bg"></div>
        <div className="scroll-warp">
          <div className="tab-warp">
            <Tabs tabs={tabsList}
              initialPage={1}
              renderTab={tab => <span>{tab.title}</span>}
              tabBarUnderlineStyle={{ borderColor: '#fff'}}
              tabBarBackgroundColor='transparent'
              tabBarInactiveTextColor='rgba(255,255,255,0.8)'
              tabBarActiveTextColor='rgba(255,255,255,1)'
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Carousel className="space-carousel"
                  frameOverflow="visible"
                  cellSpacing={10}
                  slideWidth={0.9}
                  autoplay
                  infinite
                  beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                  afterChange={index => this.setState({ slideIndex: index })}
                >
                  {this.state.data.map((val, index) => (
                    <a
                      key={val}
                      href="http://www.alipay.com"
                      style={{
                        display: 'block',
                        position: 'relative',
                        height: this.state.imgHeight,
                        boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <img
                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                      />
                    </a>
                  ))}
                </Carousel>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                
              </div>
            </Tabs>
          </div>
        </div> 
      </div>
    )
  }
}
export default Home