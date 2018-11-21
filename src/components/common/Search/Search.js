import React from 'react'
import './search.less'
import {SearchBar, Toast} from 'antd-mobile';
import {searchHot, search} from '../../../request/api';
import localforage from "localforage";
import {CSSTransition} from "react-transition-group";

class Search extends React.Component {
  componentDidMount() {
    // this.getHot();
    // this.getSearch();
  }
  state = {
    value: '许嵩',
    hot: '',
    show: false,
    type: 1,
    offset: 0,
    list: []
  };
  onChange = (value) => {
    this.setState({ value });
  };
  onShow = (key, value = true) => () =>{
    this.setState({ [key]: value });
  };
  // 获取热门
  getHot () {
    searchHot().then((res) => {
      if (res.code === 200) {
        this.setState({
          hot: res.result
        })
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  // 搜索
  getSearch () {
    let params = {
      keywords: this.state.value,
      type: this.state.type,
      offset: this.state.offset
    };
    search(params).then((res) => {
      if (res.code === 200) {
        // this.setState({
        //   hot: res.result
        // })
        console.log(res)
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }

  render() {
    const {hot, show} = this.state;
    return (
      <div className="search">
        <SearchBar placeholder="Search" maxLength={8}
                   value={this.state.value}
                   onSubmit={value => console.log(value, 'onSubmit')}
                   onClear={this.onShow('show', false)}
                   onFocus={this.onShow('show')}
                   onChange={this.onChange}/>
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
          <div className="searchBox">
            {/*搜索相关*/}
            <div className="searchMess">
              <div className="singer-cat">
                <i className="iconfont icon-geshou"/>
                <span>歌手分类 ></span>
              </div>
              <div className="search-hot">
                <div className="search-hot-title">热门搜索</div>
                <div className="search-hot-list flex wrap-wrap">
                  {
                    hot && hot.hots.map((item, index) => (
                        <a key={index}>{item.first}</a>
                    ))
                  }
                </div>
              </div>
            </div>

            {/*搜索结果*/}
            <div className="searchList">
              <div className="searchListType">

              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}
export default Search
