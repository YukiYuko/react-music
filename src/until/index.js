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
  }
};
export default until