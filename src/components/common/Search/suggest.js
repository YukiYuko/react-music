import React from 'react'
import './suggest.less'
import Scroll from '../../public/scroll/scroll'

class Suggest extends React.Component {
  componentDidMount() {}

  formatWords (item) {
    let json = {
      'songs': '单曲',
      'albums': '专辑',
      'artists': '歌手',
      'mvs': 'MV',
      'playlists': '歌单'
    };
    return json[item]
  }

  render() {
    const {suggestList, keyword} = this.props;
    return (
      <div className="search-suggest">
        <Scroll>
          <div className="search-suggest-head">
            搜 "<span>{keyword}</span>" 相关用户 >
          </div>
          {
            suggestList && suggestList.order && suggestList.order.map((item, index) => {
              if (suggestList[item]) {
                return (
                    <div className="search-suggest-list" key={index}>
                      <div className="title">{this.formatWords(item)}</div>
                      <div className="list">
                        {
                          suggestList[item].map((suggestList_item, suggestList_index) => (
                              <div className="list-item" key={suggestList_index}>
                                {suggestList_item.name}
                                {
                                  item === 'songs' && `- ${suggestList_item.artists[0].name}`
                                }
                              </div>
                          ))
                        }
                      </div>
                    </div>
                )
              }
            })
          }
        </Scroll>
      </div>
    )
  }
}
export default Suggest
