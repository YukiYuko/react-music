import React from 'react'
import './button.less'
class MyButton extends React.Component {
  componentDidMount() {
    this.addClick()
  }
  
  addClick () {
  }
  
  render() {
    const name = this.props.name && `bubbly-button ${this.props.name}`;
    return (
        <a className={name} onClick={this.props.click}>{this.props.children}</a>
    )
  }
}
export default MyButton
