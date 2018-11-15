import React from 'react';
import {observer} from "mobx-react";
import './child.less';
import MyButton from '../../components/public/Button/Button';
import Divider from '../../components/public/Divider/Divider';
import PublicHeader from '../../components/public/header/Header';

@observer
class LoginChild extends React.Component {
  componentDidMount() {}
  render() {
    // 解构从父组件传来的数据
    const {vm} = this.props;

    return (
      <div className="loginBox">
        <PublicHeader title="登录注册"/>
        <div className="logo">
          <img src={require('../../assets/images/logo.png')} alt="考拉音乐"/>
        </div>
        <div className="switchLogin">
          <MyButton name="block">手机号登录</MyButton>
          <MyButton name="block">注册</MyButton>
        </div>
        <div className="wave">
          <Divider/>
        </div>
      </div>
    )
  }
}
export default LoginChild