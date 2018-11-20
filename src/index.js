import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import stores from './store/index';
import localforage from "localforage";

configure({ enforceActions: true });

localforage.getItem('userInfo').then((value)=>{
  // 当离线仓库中的值被载入时，此处代码运行
  if (value) {
    stores.user.changeUser(value);
    console.log('如果storage中有信息了直接保存到store中', stores.user.userInfo)
  }
}).catch(function(err) {
  // 当出错时，此处代码运行
  console.log(err);
});

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
