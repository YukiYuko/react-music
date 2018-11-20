import {Modal} from "antd-mobile";
const alert = Modal.alert;


export function tips(text, back) {
  alert('提示', text, [
    { text: '确定', onPress: back },
  ])
}