import React from 'react'
import './search.less'
import { SearchBar } from 'antd-mobile';

class Search extends React.Component {
  componentDidMount() {}
  state = {
    value: '美食',
  };
  onChange = (value) => {
    this.setState({ value });
  };
  render() {
    return (
        <div className="search">
          <SearchBar placeholder="Search" maxLength={8}
                     value={this.state.value}
                     onSubmit={value => console.log(value, 'onSubmit')}
                     onClear={value => console.log(value, 'onClear')}
                     onChange={this.onChange}/>
        </div>
    )
  }
}
export default Search
