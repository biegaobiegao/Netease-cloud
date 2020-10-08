<template>
  <div class="g-Topbar">
    <div class="m-top .clearfix:after">
      <div class="wrap-t">
        <div class="logo icon-topbar">
          <router-link to='/'></router-link>
        </div>
        <ul class="m-nav d-f j-c a-c">
          <li :key="index" v-for="(item, index) in topBarList" @click="topBarClick(index)" :class="{ curtopbar: index == $store.state.banner.curIndex }">
            <router-link v-if="index == 3 || index == 4" target='_blank' to="/">{{item.name}}</router-link>
            <router-link v-else :to="item.to">{{item.name}}</router-link>
            <sup class="hot icon-topbar" v-if="index === 5"></sup>
          </li>
        </ul>
        <div class="right-bar">
          <input type="text" :placeholder="iptValue">
          <div class="a-c">
            <router-link to="/">创作者中心</router-link>
          </div>
          <div class="log-in u-line">
            <router-link to="/">登录</router-link>
          </div>
        </div>
      </div>
      <div class="wrap-b" v-if="$store.state.banner.curIndex == 0">
        <ul class="wrap-b-nav">
          <li :key="index" v-for="(item, index) in navList" @click="topBarClick2(index)" :class="{ curtopbarb: index == currentindex2 }">
            <router-link :to="item.to">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div v-else class="curnav" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  components: {
  },
  data() {
    return {
      topBarList: [
        { name: '发现音乐', to: '/' },
        { name: '我的音乐', to: '/my' },
        { name: '朋友', to: '/friend' },
        { name: '商城', to: '/' },
        { name: '音乐人', to: '/' },
        { name: '下载客户端', to: '/download' }
      ],
      navList: [
        { name: '推荐', to: '/discover' },
        { name: '排行榜', to: '/discover/toplist' },
        { name: '歌单', to: '/' },
        { name: '主播电台', to: '/' },
        { name: '歌手', to: '/' },
        { name: '新碟上架', to: '/' }
      ],
      iptValue: '音乐/视频/电台/用户',
      currentindex2: 0
    }
  },
  methods: {
    topBarClick(i) {
      this.$store.commit('banner/changeIndex', i)
    },
    topBarClick2(i) {
      this.currentindex2 = i
    }
  }
}
</script>

<style lang="scss" scoped>
.g-Topbar {
  .m-top {
    display: flex;
    background: #242424;
    flex-direction: column;
    .wrap-t {
      display: flex;
      height: 70px;
      width: 1100px;
      margin: 0 auto;
      .logo {
        width: 176px;
        height: 69px;
        background-position: 0 0;
        background-color: #242424;
        a {
          display: block;
          height: 100%;
          width: 177px;
        }
      }
      .m-nav {
        li {
          display: flex;
          justify-content: center;
          &:hover {
            background-color: #000;
          }
          a {
            font-size: 14px;
            text-align: center;
            color: #ccc;
            height: 70px;
            width: 100%;
            padding: 0 19px;
            line-height: 70px;
            &:hover {
              color: #fff;
            }
          }
        }
        li:last-child {
          position: relative;
        }
        .hot {
          top: 21px;
          left: 100px;
          width: 28px;
          height: 19px;
          position: absolute;
          background-position: -190px 0;
        }
      }
      .right-bar {
        display: flex;
        height: 70px;
        margin-left: auto;
        align-items: center;
        justify-content: center;
        .a-c {
          a {
            display: block;
            width: 90px;
            line-height: 32px;
            border: 1px solid #4F4F4F;
            border-radius: 20px;
            color: #ccc;
            font-size: 12px;
            text-align: center;
            margin-left: 12px;
          }
        }
        .log-in {
          margin-left: 20px;
          a {
            color: #787878;
            font-size: 12px;
          }
        }
      }
    }
    .wrap-b {
      height: 34px;
      border-bottom: 1px solid #a40011;
      background-color: #C20C0C;
      .wrap-b-nav {
        display: flex;
        width: 775px;
        margin-left: 478px;
        justify-content: center;
        li {
          a {
          font-size: 12px;
          height: 20px;
          line-height: 34px;
          color: #fff;
          padding: 0 13px;
          margin: 0 17px;
          &:hover {
            background: #9B0909;
            background-clip: border-box;
            border-radius: 20px;
            }
          }
        }
      }
    }
  }
}
.curnav {
  height: 5px;
  border-bottom: 1px solid #a40011;
  background-color: #C20C0C;
}
</style>
