// 万 亿单位
const numberFilter = (num) => {
    let len = num && num.toString().split('.')[0].length;
    if (len > 8) {
        return (num / 10000 / 10000).toFixed(1) + '亿'
    } else if (len > 5 && len <=8 ) {
        return parseInt(num / 10000) + '万'
    } else {
        return num
    }
};
export {
    numberFilter
}