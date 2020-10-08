import { getSongInfo, getSongUrl } from '../api/allApi.js'

export default {
  namespaced: true,
  state: {
    curIndex: 0,
    curSong: {},
    curSongInfo: {},
    curSongIndex: 0,
    curSongList: JSON.parse(localStorage.getItem('track-queue'))
  },
  mutations: {
    changeIndex(state, i) {
      state.curIndex = i
    },
    getSong(state, Url) {
      state.curSong = Url
    },
    getSongInfo(state, info) {
      state.curSongInfo = info
    },
    pushSong(state, el) {
      if (state.curSongList === null) {
        state.curSongList = [el]
      } else if (state.curSongList.some(cur => cur.name === el.name)) {
        return state.curSongList
      } else {
        state.curSongList.push(el)
      }
      const elsStr = JSON.stringify(state.curSongList)
      localStorage.setItem('track-queue', elsStr)
    }
  },
  actions: {
    async getSong({ commit }, n) {
      const Url = await getSongUrl(n.id)
      commit('getSong', Url.data[0])
      const Info = await getSongInfo(n.id)
      commit('getSongInfo', Info.songs[0])
    }
  },
  modules: {
  }
}
