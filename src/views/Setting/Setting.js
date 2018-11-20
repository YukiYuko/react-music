import React from 'react'
import './Setting.less'
import { inject, observer } from 'mobx-react';
import PublicHeader from "../../components/public/header/Header";
import {getUserInfo} from '../../request/api';
import localforage from "localforage";
import {Toast} from "antd-mobile";
import stores from "../../store";

@inject('user')
@observer
class Setting extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userInfo: ''
    }
  }
  componentDidMount() {
    localforage.getItem('userInfo').then((value)=>{
      // 当离线仓库中的值被载入时，此处代码运行
      if (value) {
        stores.user.changeUser(value);
        this._getUserInfo();
      }
    }).catch(function(err) {
      // 当出错时，此处代码运行
      console.log(err);
    });
  }
  _getUserInfo () {
    if (!this.props.user.userInfo.userId) {
      return
    }
    getUserInfo({uid: this.props.user.userInfo.userId}).then((res) => {
      if (res.code === 200) {
        delete res.code;
        this.setState({
          userInfo: res
        })
      }else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  render() {
    const {userInfo} = this.state;
    return (
      <div className="setting inner-warp">
        <PublicHeader showLeft={false} title="账号"/>
        <div className="setting-head">
          <div className="setting-head-top flex justify-between">
            <div className="left flex items-center">
              <div className="avatar">
                <img src={userInfo.profile && userInfo.profile.avatarUrl} alt={userInfo.profile && userInfo.profile.nickname}/>
              </div>
              <div className="nickname">
                <p>{userInfo.profile && userInfo.profile.nickname}</p>
                <div className="signature">{userInfo.profile && userInfo.profile.signature}</div>
                <a className="border-radius">Lv.{userInfo.level}</a>
              </div>
            </div>
            <div className="right flex items-center">
              {
                userInfo.mobileSign ?
                    <a className="border-radius">已签到 ></a> :
                    <a className="border-radius noSign">签到 ></a>
              }
            </div>
          </div>
          <div className="setting-head-bottom flex">
            <div className="setting-menu"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Setting
