import request from './index';

export function getDjRadioCatelist() {
  return request({
    url: '/dj/catelist'
  })
}

export function getDjRadioRecommend(type) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type
    }
  })
}

export function getDjRadios(cateId, limit, offset) {
  return request({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  })
}
// 轮播图
export function getBanners() {
  return request({
    url: `/banner?type=${0}${new Date().getTime()}`
  })
}
// 热门推荐
export function personalized(limit = 8) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}
// 新碟上架
export function getAlbum(limit = 10) {
  return request({
    url: '/top/album',
    params: {
      limit
    }
  })
}
// 一位数组转成二位数组
export function oneToTowArr(num, arr) {
  const newArr = [];
  for (let i = 0; i < Math.ceil(arr.length / num); i++) {
    const arrtemp = [];
    for (let j = 0; j < num; j++) {
      arrtemp.push(arr[j + (num * i)])
    }
    newArr.push(arrtemp)
  }
  return newArr
}
// 所有榜单
export function getAllTopList() {
  return request({
    url: '/toplist'
  })
}
// 榜单详情
export function getRankingList(id) {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}
// 音乐URL
export function getSongUrl(id) {
  return request({
    url: `/song/url?id=${id}`
  })
}
// 歌曲详情
export function getSongInfo(id) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}
