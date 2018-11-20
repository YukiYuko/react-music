import React from 'react';
import Child from './child';
// 引入 mobx
import { inject, observer } from 'mobx-react';

// 给组件注入其需要的 store，指定对应的子 store 名称
@inject('user')
// 将组件转化为响应式组件
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { user } = this.props;
    return (
        <div className="login">
          <Child user={user}/>
        </div>
    )
  }
}
export default Login
