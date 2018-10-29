import React from 'react';
import './play.less';
import PublicHeader from '../../components/public/header/Header';

class Play extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
        <div className="play">
          <PublicHeader title="流月人间" color="#444"/>
          <div className="song_intro">
            <div className="author">河图</div>
            <div className="edit flex justify-between">
              <div><p>作曲</p> <br/> <p>骆集益</p></div>
              <div><p>作词</p> <br/> <p>鸾凤鸣</p></div>
              <div><p>编曲</p> <br/> <p>恒涳</p></div>
            </div>
          </div>
        </div>
    )
  }
}

export default Play
