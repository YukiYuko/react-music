import React from 'react';
import ReactDom from 'react-dom';

class NewPortal extends React.Component {
  constructor (props) {
    super(props);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  render () {
    const { visible, children } = this.props;
    return visible && ReactDom.createPortal(
      children,
      this.node,
    )
  }
}

export  default NewPortal