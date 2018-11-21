import React from 'react'
import './Setting.less'
import { inject, observer } from 'mobx-react';
import PublicHeader from "../../components/public/header/Header";
import {getUserInfo} from '../../request/api';
import localforage from "localforage";
import {Toast, List, Switch} from "antd-mobile";
import stores from "../../store";
import FooterComponent from "../../components/common/Footer/footer";

const Item = List.Item;
const Brief = Item.Brief;

@inject('user')
@observer
class Setting extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userInfo: '',
      checked: false
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
        {/*头部*/}
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
          <div className="setting-head-bottom flex items-center">
            <div className="setting-menu">
              <h3>动态</h3>
              <p>0</p>
            </div>
            <div className="setting-menu">
              <h3>关注</h3>
              <p>{userInfo.profile && userInfo.profile.follows}</p>
            </div>
            <div className="setting-menu">
              <h3>粉丝</h3>
              <p>{userInfo.profile && userInfo.profile.followeds}</p>
            </div>
            <div className="setting-menu">
              <span></span>
              <p><i className="iconfont icon-edit"/></p>
              <h3>我的资料</h3>
            </div>
          </div>
        </div>
        {/*设置项*/}
        <div className="setting-item-warp">
          <List>
            <div className="setting-item">
              <Item
                  thumb={<i className="iconfont icon-xiaoxi"/>}
                  arrow="horizontal"
                  onClick={() => {}}
              >我的消息</Item>
            </div>
            <div className="setting-item">
              <Item
                  thumb={<i className="iconfont icon-huanfu"/>}
                  arrow="horizontal"
                  onClick={() => {}}
                  extra={'个性红'}
              >换肤</Item>
              <Item
                  thumb={<i className="iconfont icon-yejian"/>}
                  onClick={() => {}}
                  extra={<Switch
                      checked={this.state.checked}
                      onChange={() => {
                        this.setState({
                          checked: !this.state.checked,
                        });
                      }}
                  />}
              >夜间</Item>
              <Item
                  thumb={<i className="iconfont icon-setting"/>}
                  arrow="horizontal"
                  onClick={() => {}}
              >设置</Item>
              <Item
                  thumb={<i className="iconfont icon-huiyuan"/>}
                  arrow="horizontal"
                  onClick={() => {}}
              >会员中心</Item>
            </div>
          </List>
        </div>

        <FooterComponent/>
      </div>
    )
  }
}
export default Setting
