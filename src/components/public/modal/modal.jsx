import React, { Component } from 'react';
import NewPortal from '../newPortal/newPortal'
import './modal.css';
class Modal extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
    this.maskClick = this.maskClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      visible: false
    }
  }

  // 首次渲染使用父组件的状态更新modal中的visible状态，只调用一次
  componentDidMount() {
    this.setState({ visible: this.props.visible })
  }

  // 每次接收props就根据父组件的状态更新modal中的visible状态，首次渲染不会调用
  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible })
  }

  // 点击取消更新modal中的visible状态
  closeModal() {
    console.log('大家好，我叫取消，听说你们想点我？傲娇脸👸')
    const { onClose } = this.props
    onClose && onClose()
    this.setState({ visible: false })
  }

  confirm() {
    console.log('大家好，我叫确认，楼上的取消是我儿子，脑子有点那个~')
    const { confirm } = this.props
    confirm && confirm()
    this.setState({ visible: false })
  }

  maskClick() {
    console.log('大家好，我是蒙层，我被点击了')
    this.setState({ visible: false})
  }

  render() {
    // 使用modal中维护的visible状态来控制显隐
    const { visible } = this.state;
    const { title, children } = this.props;
    return <NewPortal visible={visible}>
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-title">{title}</div>
            <div className="modal-content">{children}</div>
            <div className="modal-operator">
              <button
                onClick={this.closeModal}
                className="modal-operator-close"
              >取消</button>
              <button
                onClick={this.confirm}
                className="modal-operator-confirm"
              >确认</button>
            </div>
          </div>
          <div className="mask" onClick={this.maskClick}/>
        </div>
      </NewPortal>
  }
}
export default Modal;
