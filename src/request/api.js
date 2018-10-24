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