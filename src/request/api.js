import api from './fetch'

const BASE_URL = 'http://localhost:4000';

/*
* 首页banner
* */
export const getBanner = () => api.get(`${BASE_URL}/banner`);

/*
* 首页推荐歌单
* */
export const personalized = () => api.get(`${BASE_URL}/personalized`);