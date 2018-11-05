import api from './fetch'

const BASE_URL = 'http://localhost:4000';

/*
* 首页banner
* */
export const getBanner = () => api.get(`${BASE_URL}/banner`);

/*
* 首页推荐歌单 无参数
* @type newsong 推荐新音乐
* @type djprogram 推荐电台
* @type privatecontent 独家放送
* @type mv 获取推荐 mv
* */
export const personalized = (type) => {
    if (type) {
        return api.get(`${BASE_URL}/personalized/${type}`)
    } else {
        return api.get(`${BASE_URL}/personalized`)
    }
};
/*
* 获取歌单详情
* @params 必选参数 : id : 歌单 id
* @params 可选参数 : s : 歌单最近的 s 个收藏者
* */
export const playlistDetail = (params) => api.get(`${BASE_URL}/playlist/detail`, params);
/*
* 获取音乐 url
* @params 必选参数 : id : 音乐 id
* @params 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
* 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
* */
export const songUrl = (params) => api.get(`${BASE_URL}/song/url`, params);
/*
* 获取歌曲详情
* @params 必选参数 : ids: 音乐 id, 如 ids=347230
* 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
* */
export const songDetail = (params) => api.get(`${BASE_URL}/song/detail`, params);