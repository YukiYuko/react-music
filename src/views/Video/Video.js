import React from 'react'
import './Video.less'
import SearchComponent from '../../components/common/Search/Search'
import FooterComponent from '../../components/common/Footer/footer';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {}
  render() {
    const {visible} = this.state;
    return (
      <div className="videoComponent">
        <div className="videoHead flex dir-column">
          <SearchComponent/>
          <div className="videoMenu box1"></div>
        </div>
        <FooterComponent/>
      </div>
    )
  }
}
export default Video
