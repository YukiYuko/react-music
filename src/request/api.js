import api from './fetch'

const BASE_URL = 'http://192.168.199.175:4000';

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
/*
* 热门歌单分类
* 接口地址 : /playlist/hot
* 调用例子 : /playlist/hot
* */
export const playlistHot = () => api.get(`${BASE_URL}/playlist/hot`);
/*
* 每日推荐歌曲
* 接口地址 : /recommend/songs
* 调用例子 : /recommend/songs
* */
export const recommendSongs = () => api.get(`${BASE_URL}/recommend/songs`);
/*
* 最新mv
* 可选参数 : limit: 取出数量 , 默认为 30
* 接口地址 : /mv/first
* 调用例子 : /mv/first
* */
export const mvFirst = (params) => api.get(`${BASE_URL}/mv/first`, params);
/*
* 获取 mv 数据
* 必选参数 : mvid: mv 的 id
* 接口地址 : /mv/detail
* 调用例子 : /mv/detail?mvid=5436712
* */
export const mvDetail = (params) => api.get(`${BASE_URL}/mv/detail`, params);
/*
* mv 地址
* 必选参数 : mvid: mv 的 id
* 接口地址 : /mv/url
* 调用例子 : /mv/url?id=5436712
* */
export const mvUrl = (params) => api.get(`${BASE_URL}/mv/url`, params);
/*
* 获取相似音乐
* 必选参数 : mvid: mv 的 id
* 接口地址 : /simi/mv
* 调用例子 : /simi/mv?mvid=5436712
* */
export const simiMv = (params) => api.get(`${BASE_URL}/simi/mv`, params);
/*
* mv评论
* 必选参数 : id: mv id
* 可选参数 : limit: 取出评论数量 , 默认为 20
* offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* 接口地址 : /comment/mv
* 调用例子 : /comment/mv?id=5436712
* */
export const commentMv = (params) => api.get(`${BASE_URL}/comment/mv`, params);
/*
* 手机登录
* 必选参数 : phone: 手机号码 password: 密码
* 接口地址 : /login/cellphone
* 调用例子 : /login/cellphone?phone=xxx&password=yyy
* */
export const loginPhone = (params) => api.get(`${BASE_URL}/login/cellphone`, params);
/*
* 获取用户详情
* 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
* 必选参数 : uid : 用户 id
* 接口地址 : /user/detail
* 调用例子 : /user/detail?uid=32953014
* */
export const getUserInfo = (params) => api.get(`${BASE_URL}/user/detail`, params);

/*
* 热搜
* 说明 : 调用此接口,可获取热门搜索列表
* 接口地址 : /search/hot
* 调用例子 : /search/hot
* */
export const searchHot = (params) => api.get(`${BASE_URL}/search/hot`, params);
/*
* 搜索
* 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 ,
* 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ),
* 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id
* 获取具体的播放链接
*
* 必选参数 : keywords : 关键词
* 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 ,
* 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
* type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑,
* 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
* 1006: 歌词, 1009: 电台, 1014: 视频

* 接口地址 : /search
* 调用例子 : /search?keywords= 海阔天空
* */
export const search = (params) => api.get(`${BASE_URL}/search`, params);
/*
* 搜索建议
* 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
* 必选参数 : keywords : 关键词
* 可选参数 :
* limit : 返回数量 , 默认为 30
* offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
* type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
* 接口地址 : /search/suggest
* 调用例子 : /search/suggest?keywords= 海阔天空
* */
export const searchSuggest = (params) => api.get(`${BASE_URL}/search/suggest`, params);
