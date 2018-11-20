import React from 'react'
import './Setting.less'
import { inject, observer } from 'mobx-react';
import PublicHeader from "../../components/public/header/Header";

@inject('user')
@observer
class Setting extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const {userInfo} = this.props.user;
    return (
      <div className="setting inner-warp">
        <PublicHeader showLeft={false} title="账号"/>
        <div className="setting-head">
          <div className="setting-head-top flex justify-between">
            <div className="left flex items-center">
              <div className="avatar">
                <img src={userInfo.avatarUrl} alt={userInfo.nickname}/>
              </div>
              <div className="nickname">
                <p>{userInfo.nickname}</p>
                <a className="border-radius">Lv.7</a>
              </div>
            </div>
            <div className="right flex items-center">
              <a className="border-radius">已签到 ></a>
            </div>
          </div>
          <div className="setting-head-bottom">

          </div>
        </div>
      </div>
    )
  }
}
export default Setting
