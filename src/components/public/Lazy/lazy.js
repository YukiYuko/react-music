// Lazy.jsx
import React, { Component } from 'react';
import Lazyload from 'r-img-lazyload';

const pic = require('../../../assets/images/default.png');

export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const config = {
      options: {
        error: pic,
        loading: pic
      },
      ...this.props
    };
    return <Lazyload {...config} />;
  }
}