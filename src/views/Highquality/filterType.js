import React from 'react'
import './filterType.less'
import PublicHeader from '../../components/public/header/Header';
import {playlistCatlist} from "../../request/api";
import {Toast} from "antd-mobile";
import Scroll from '../../components/public/scroll/scroll';
import until from '../../until/index'
class FilterType extends React.Component {
  componentDidMount() {
    this.setState({
      catName: this.props.cat
    });
    this.getTopPlayList()
  }
  state = {
    catName: '全部',
    cat: '',
    select: ''
  };
  getTopPlayList () {
    Toast.loading('加载中...');
    playlistCatlist().then((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          Toast.hide();
          this.setState({
            cat: until.getResult(res.sub, res.categories)
          }, () => {
            console.log()
          });
        }, 1000);
      }else {
        Toast.fail('Load failed !!!', 2);
      }
    })
  }

  selectType = (item) => () => {
    this.setState({
      select: item,
      catName: item.name
    });
    this.props.getTopPlayList(item.name);
    this.props.back();
  };

  render() {
    const {cat, select, catName} = this.state;
    return (
        <div className="filterType">
          <PublicHeader back={this.props.back} left="取消" title="筛选歌单"/>
          <Scroll data={cat}>
            <div className="filterTypeHead">
              <a className={!select ? 'active' : ''}>
                <span>全部歌单</span>
                <i className="iconfont icon-xuanzhong" style={{display:  catName === '全部'? 'block' : 'none'}}/>
              </a>
            </div>
            <div className="filterTypeCat">
              {
                cat && cat.map((item, index) => (
                    <div key={index} className="filterTypeCatItem">
                      <div className="type">
                        {item.name}
                      </div>
                      {
                        item.data.map((innerItem, innerIndex) => (
                            <div onClick={this.selectType(innerItem)} className="typeItem" key={innerIndex}>
                              {
                                innerItem.hot && <div className="hot">
                                  <i className="iconfont icon-hot"/>
                                </div>
                              }
                              <span>
                            {innerItem.name}
                          </span>
                              <div className="typeItemBg" style={{display: catName === innerItem.name ? 'block' : 'none'}}>
                                <i className="iconfont icon-xuanzhong"/>
                              </div>
                            </div>
                        ))
                      }
                    </div>
                ))
              }
            </div>
          </Scroll>
        </div>
    )
  }
}
export default FilterType
