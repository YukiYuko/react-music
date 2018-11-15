import React from 'react';
import Child from './child';
// 引入 mobx
import {observable, computed, action} from "mobx";

class VM {
  @observable firstName = '';
  @observable lastName = '';

  @computed
  get fullName () {
    const {firstName, lastName} = this;
    if (!firstName && !lastName) {
      return "Please input your name!";
    } else {
      return firstName + " " + lastName;
    }
  }

  @action.bound
  setValue(key, event) {
    this[key] = event.target.value;
  }
  @action.bound
  doReset() {
    this.firstName = "";
    this.lastName = "";
  }
}

const vm = new VM();


class Login extends React.Component {
  componentDidMount() {}
  render() {
    return (
        <div className="login">
          <Child vm={vm}/>
        </div>
    )
  }
}
export default Login
