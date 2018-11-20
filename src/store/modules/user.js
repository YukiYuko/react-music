import {observable, computed, action} from 'mobx';
import { Toast } from 'antd-mobile';
// 将获取数据部分分离出去
import {getUserInfo} from '../../request/api'



class UserStore {
  // 将需要观察的属性设置为可观察的
  @observable userInfo;

  // 在这里给可观察的属性设置初始值
  constructor() {
    this.userInfo = {
      nickname: '橙瓜瓜'
    };
  }

  // 动作，代码专注于更新可观察属性，额外的操作分离出去
  @action
  changeUser = userInfo => {
    this.userInfo = userInfo
  };

  /*
   一些函数，包含更新可观察属性的部分已经被分离为 action
   在 action 中使用异步函数或者 promise 都比较麻烦，所以尽可能的分离，
   据文档指出，不但 异步函数需要被 @action
   await 后的代码如果更改了可观察属性，需要使用 runInAction 包裹
  */
  getUser = (params) => {
    getUserInfo(params).then((res) => {
      if (res.code === 200) {
        this.changeUser(res.profile);
      } else {
        Toast.fail(res.msg)
      }
    }).catch(() => {
      Toast.fail('服务器错误，请重试')
    });
  }

}

export default new UserStore();