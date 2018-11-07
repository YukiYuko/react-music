import styles from './Video.css'

import React from 'react'
import reactDom from 'react-dom'
import Modal from '../../components/public/modal/modal'
import FooterComponent from '../../components/common/Footer/footer';

class Video extends React.Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      visible: false
    }
  }

  showModal() {
    this.setState({ visible: true })
  }

  closeModal () {
    console.log('我是onClose回调')
  }

  confirm () {
    console.log('我是confirm回调')
  }
  componentDidMount() {}
  render() {
    const {visible} = this.state;
    return (
      <div>
        <button onClick={this.showModal}>click here</button>
        <Modal
          visible={visible}
          title="这是自定义title"
          confirm={this.confirm}
          onClose={this.closeModal}
        >
          这是自定义content
        </Modal>
        <FooterComponent></FooterComponent>
      </div>
    )
  }
}
export default Video
