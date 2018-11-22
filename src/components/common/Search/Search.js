import React from 'react'
import './search.less'
import {SearchBar, Toast} from 'antd-mobile';
import {searchHot, search, searchSuggest} from '../../../request/api';
import localforage from "localforage";
import {CSSTransition} from "react-transition-group";
import until from '../../../until/index'
import Suggest from './suggest'
import Message from './message'
import SearchList from './list'

class Search extends React.Component {
  componentDidMount() {
    // this.getHot();
    // this.getSearch();
  }
  state = {
    value: '',
    hot: '',
    show: false,
    type: 1,
    offset: 0,
    list: '',
    currentTabIndex: 0,
    suggestList: ''
  };
  onChange = (value) => {
    this.setState(
      { value },
      () => {
        until.throttle(this.getSearchSuggest, null, 500, value, 1000);
      }
    );
  };
  onShow = (key, value = true) => {
    this.setState({ [key]: value });
  };
  // 获取焦点
  focus = () => {
    if (!this.state.show) {
      this.onShow('show');
      this.getHot();
    }
  };
  // 点取消
  clear = () => {
    this.onShow('show', false);
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
  // 获取搜索建议
  getSearchSuggest = () => {
    if (!this.state.value) {
      return
    }
    let params = {
      keywords: this.state.value,
    };
    searchSuggest(params).then((res) => {
      if (res.code === 200) {
        this.setState({
          suggestList: res.result
        });
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  };

  render() {
    const {hot, show, currentTabIndex, suggestList, list, value} = this.state;
    const tabs = [
      { name: '单曲', type: 0 ,id: 1},
      { name: '专辑', type: 10 ,id: 2},
      { name: '歌手', type: 100 ,id: 3},
      { name: '歌单', type: 1000 ,id: 4},
      { name: '用户', type: 1002 ,id: 5},
      { name: 'MV', type: 1004 ,id: 6},
      { name: '歌词', type: 1006 ,id: 7},
      { name: '电台', type: 1009 ,id: 8},
      { name: '视频', type: 1014 ,id: 9},
    ];
    return (
      <div className="search">
        <SearchBar placeholder="Search" maxLength={8}
                   value={this.state.value}
                   onSubmit={value => console.log(value, 'onSubmit')}
                   onClear={this.clear}
                   onFocus={this.focus}
                   onChange={this.onChange}/>
        <CSSTransition
            in={show}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
          <div className="searchBox">
            {/*搜索相关*/}
            {
              !value && <Message hot={hot}/>
            }

            {/*热搜建议*/}
            {
              suggestList && <Suggest suggestList={suggestList} keyword={value}/>
            }

            {/*搜索结果*/}
            {
              list && <SearchList tabs={tabs} currentTabIndex={currentTabIndex}/>
            }
          </div>
        </CSSTransition>
      </div>
    )
  }
}
export default Search
