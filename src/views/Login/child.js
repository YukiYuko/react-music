import React from 'react';
import {observer} from "mobx-react";
import './child.less';
import MyButton from '../../components/public/Button/Button';
import Divider from '../../components/public/Divider/Divider';
import PublicHeader from '../../components/public/header/Header';
const JParticles = require('jparticles');
// const wave = require('jparticles/dev/wave');

@observer
class LoginChild extends React.Component {
  componentDidMount() {
    // this.initWave();
  }

  initWave () {
    new JParticles.wave('#wave', {
      num: 2,
      // 不绘制边框
      line: false,
      // 填充
      fill: true,
      // 填充颜色
      fillColor: ['#27C9E5','#88e0e5'],
      offsetTop: [0.5, 0.6],
      crestHeight: [12, 9],
      rippleNum: [3, 4],
      speed: [0.07, 0.06]
    });
  }

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
        <div className="wave" id="wave">
          <Divider/>
        </div>
      </div>
    )
  }
}
export default LoginChild