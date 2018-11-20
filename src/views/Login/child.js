import React from 'react';
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import './child.less';
import MyButton from '../../components/public/Button/Button';
import Divider from '../../components/public/Divider/Divider';
import PublicHeader from '../../components/public/header/Header';
import HighComponent from "../Highquality/high";
import {Modal, Toast} from "antd-mobile";
import {phone, stringCheck} from '../../until/validate';
import {tips} from '../../until/action';
import {loginPhone} from '../../request/api';
import localforage from 'localforage'

const JParticles = require('jparticles');
const prompt = Modal.prompt;
const alert = Modal.alert;

@observer
class LoginChild extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show_login: false,
      show_reg: false
    };
  }
  // 这一步是重点  我们需要这样做 才能得到 history 这个东西
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount() {
    localforage.getItem('userInfo').then((value)=>{
      // 当离线仓库中的值被载入时，此处代码运行
      if (value) {
        this.context.router.history.push('/');
      }
    }).catch(function(err) {
      // 当出错时，此处代码运行
      console.log(err);
    });
  }
  componentDidMount() {
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

  show = (key, value = true) => () => {
    this.setState({
      [key]: value
    })
  };

  loginFun = (login, password) => {
    if (!phone(login)) {
      tips('请输入正确的手机号');
      return false
    }
    if (!stringCheck(password)){
      tips('密码  4到16位（字母，数字，下划线，减号）');
      return false
    }
    let params = {
      phone: login,
      password: password
    };
    Toast.loading('登录中...');
    loginPhone(params).then((res) => {
      if (res.code === 200) {
        const _this = this;
        localforage.setItem('userInfo', res.profile).then((value) => {
          // 当值被存储后，可执行其他操作
          setTimeout(() => {
            _this.context.router.history.push('/');
            console.log(value);
            Toast.hide();
          }, 1000);
        }).catch(function(err) {
          // 当出错时，此处代码运行
          console.log(err);
        });
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  };

  // 公共提示窗

  render() {
    // 解构从父组件传来的数据
    const {vm} = this.props;
    const {show_login} = this.state;

    return (
      <div className="loginBox">
        <PublicHeader title="登录注册"/>
        <div className="logo">
          <img src={require('../../assets/images/logo.png')} alt="考拉音乐"/>
        </div>
        <div className="switchLogin">
          <MyButton name="block" click={() => prompt(
              '手机号登陆',
              '请输入手机号和密码',
              this.loginFun,
              'login-password',
              null,
              ['请输入手机号', '请输入密码'],
          )}>手机号登录</MyButton>
          <MyButton name="block">注册</MyButton>
        </div>
        <div className="wave" id="wave">
          <Divider/>
        </div>
        <Modal
            popup
            visible={show_login}
            onClose={this.show('show_login', false)}
            // animationType="slide-up"
            transitionName="am-slide-right"
        >
          login
        </Modal>
      </div>
    )
  }
}
export default LoginChild