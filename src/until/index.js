let until = {
  // 合并相同type值
  getResult (arr, categories) {
    let map = {};
    let dest = [];
    for (let i = 0; i < arr.length; i++) {
      let ai = arr[i];
      if (!map[ai.category]) {
        dest.push({
          category: ai.category,
          data: [ai],
          name: categories[ai.category]
        });
        map[ai.category] = ai;
      } else {
        for(let j = 0; j < dest.length; j++){
          let dj = dest[j];
          if(dj.category === ai.category){
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    dest.sort(function (a, b) {
      return a.category-b.category;
    });
    return dest;
  },
  // 格式化时间
  formatTime (time) {
    if (!time) {
      return
    }
    let nowyear = new Date().getFullYear();
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    if (nowyear === year) {
      return `${month}月${day}日`
    } else {
      return `${year}年${month}月${day}日`
    }
  },
  // 函数节流
  throttle (fn,context,delay,text,mustApplyTime) {
    clearTimeout(fn.timer);
    fn._cur=Date.now();  //记录当前时间

    if(!fn._start){      //若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
      fn._start=fn._cur;
    }
    if(fn._cur-fn._start>mustApplyTime){
      //当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
      fn.call(context,text);
      fn._start=fn._cur;
    }else{
      fn.timer=setTimeout(function(){
        fn.call(context,text);
      },delay);
    }
  }
};
export default until