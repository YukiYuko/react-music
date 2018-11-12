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
/*
* 获取歌曲歌词
* @params 必选参数 : id: 音乐 id
* 调用例子 : /lyric?id=33894312
* */
export const lyric = (params) => api.get(`${BASE_URL}/lyric`, params);
/*
* 所有榜单内容摘要
* 调用例子 : /toplist/detail
* */
export const toplistDetail = () => api.get(`${BASE_URL}/toplist/detail`);
/*
* 所有榜单内容摘要
* 必选参数 : idx: 对象 key, 对应以下排行榜
* "0": 云音乐新歌榜,
"1": 云音乐热歌榜,
"2": 网易原创歌曲榜,
"3": 云音乐飙升榜,
"4": 云音乐电音榜,
"5": UK排行榜周榜,
"6": 美国Billboard周榜
"7": KTV嗨榜,
"8": iTunes榜,
"9": Hit FM Top榜,
"10": 日本Oricon周榜
"11": 韩国Melon排行榜周榜,
"12": 韩国Mnet排行榜周榜,
"13": 韩国Melon原声周榜,
"14": 中国TOP排行榜(港台榜),
"15": 中国TOP排行榜(内地榜)
"16": 香港电台中文歌曲龙虎榜,
"17": 华语金曲榜,
"18": 中国嘻哈榜,
"19": 法国 NRJ EuroHot 30周榜,
"20": 台湾Hito排行榜,
"21": Beatport全球电子舞曲榜,
"22": 云音乐ACG音乐榜,
"23": 云音乐嘻哈榜
* 调用例子 : /top/list
* */
export const topList = (params) => api.get(`${BASE_URL}/top/list`, params);

/*
* 歌单 ( 网友精选碟 )
* 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
* cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
* 接口地址 : /top/playlist
* 调用例子 : /top/playlist?limit=10&order=new
* */
export const topPlaylist = (params) => api.get(`${BASE_URL}/top/playlist`, params);

/*
* 获取精品歌单
* 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
* limit: 取出歌单数量 , 默认为 20
* before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
* 接口地址 : /top/playlist/highquality
* 调用例子 : http://localhost:3000/top/playlist/highquality?before=1503639064232&limit=3
* */
export const highquality = (params) => api.get(`${BASE_URL}/top/playlist/highquality`, params);

/*
* 歌单分类
* 接口地址 : /playlist/catlist
* 调用例子 : /playlist/catlist
* */
export const playlistCatlist = () => api.get(`${BASE_URL}/playlist/catlist`);
