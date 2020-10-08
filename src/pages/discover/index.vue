<template>
  <div id="main-wrap">
    <div class="banner-wrap" :style="bigBG">
      <div class="banner">
        <div class="btn-r c-p" @click="nextImg"></div>
        <div class="btn-l c-p" @click="preImg"></div>
        <el-carousel arrow="never"  trigger="click" height="285px" @change="urlChange" ref="element">
          <el-carousel-item v-for="(item, index) in imgList" :key="index">
            <router-link to="/">
              <img :src="item.imageUrl" alt />
            </router-link>
          </el-carousel-item>
        </el-carousel>
        <div class="download">
          <router-link to="/download" @click.native="download"></router-link>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content">
        <div class="content-l">
          <red-top-nav>
            <router-link to="/" class="title">热门推荐</router-link>
            <div class="tab">
              <router-link to="/" v-for="(item, index) in tabList" :key='index' class="u-line">
              {{item.name}}
              <span>|</span>
              </router-link>
            </div>
          </red-top-nav>
          <ul class="hot-wrap">
            <li class="hot-item" :key="index" v-for="(item, index) in hotList">
              <div class="li-t">
                <img :src="item.picUrl" alt="">
                <router-link to="/" :title="item.name" class="li-a"></router-link>
                <div class="bottom">
                  <router-link to="/" class="bot-a"></router-link>
                  <span class="icon"></span>
                  <span class="nb">{{playCount(item.playCount)}}</span>
                </div>
              </div>
              <p class="dec">
                <router-link to="/" :title="item.name" class="u-line">{{item.name}}</router-link>
              </p>
            </li>
          </ul>
          <red-top-nav>
            <router-link to="/" class="title">新碟上架</router-link>
          </red-top-nav>
          <div class="new-album">
            <div class="inner">
              <div class="album-l c-p" @click="aPreImg"></div>
              <div class="album-r c-p" @click="aNextImg"></div>
              <div class="roll">
                <el-carousel :autoplay="false" arrow="never" height="150px" indicator-position="none" ref="banner">
                  <el-carousel-item v-for="(item, index) in albumList" :key="index">
                    <div v-for="(el, index) in item" :key="index">
                      <div class="album">
                        <img :src="el.picUrl">
                        <router-link to="/" class="album-mask" :title="el.name"></router-link>
                        <router-link to="/" class="album-play" title="播放"></router-link>
                      </div>
                      <p class="album-name">
                        <router-link to="/" :title="el.name" class="u-line">{{el.name}}</router-link>
                      </p>
                      <p class="album-title">
                        <router-link to="/" :title="el.artist.name" class="u-line">{{el.artist.name}}</router-link>
                      </p>
                    </div>
                  </el-carousel-item>
               </el-carousel>
              </div>
            </div>
          </div>
        <red-top-nav>
          <router-link to="/" class="title">榜单</router-link>
        </red-top-nav>
        <div class="blist">
          <div class="blk" v-for="(item, index) in topRankingList" :key="index">
            <div class="b-top">
              <div class="b-img">
                <img :src="item.playlist.coverImgUrl" alt="">
                <router-link to="/" :title="item.playlist.name"></router-link>
              </div>
              <div class="b-tit">
                <router-link to="/" :title="item.playlist.name" class="u-line"><span>{{item.playlist.name}}</span></router-link>
                <div class="btn">
                  <router-link to="/" class="btn-p" title="播放"></router-link>
                  <router-link to="/" class="btn-a" title="收藏"></router-link>
                </div>
              </div>
            </div>
            <div class="b-btm">
              <ol>
                <li v-for="(el, elindex) in item.playlist.tracks.filter((ele, index) => index < 10)" :key="elindex">
                  <span class="list-rank">{{elindex + 1}}</span>
                  <router-link to="/" :title="el.name" class="s-name u-line">{{el.name}}</router-link>
                  <div class="oper">
                    <router-link to="/" title="播放" class="o-p" @click.native="play(el)"></router-link>
                    <router-link to="/" title="添加到播放列表" class="o-a" @click.native="add(el)"></router-link>
                    <router-link to="/" title="收藏" class="o-s"></router-link>
                  </div>
                </li>
              </ol>
              <div class="btm-more">
                <router-link to="/" class="c-p u-line">查看全部></router-link>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="content-r">
          <div class="r-user-profile">
            <div class="r-myinfo">
              <p class="note">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
              <router-link to="/" class="r-btn">用户登录</router-link>
            </div>
          </div>
          <div class="r-singer">
            <div class="hd3">
              <span class="f-s-12">入驻歌手</span>
              <router-link to="/" class="singer-more f-s-12 u-line">查看全部 ></router-link>
            </div>
            <ul class="singer-list">
              <li></li>
            </ul>
          </div>
          <div class="r-dj"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanners, personalized, getAlbum, oneToTowArr, getAllTopList, getRankingList } from '../../api/allApi';
import RedTopNav from '../useful/RedTopNav.vue';
export default {
  name: 'discover',
  data() {
    return {
      imgList: [],
      tabList: [
        { name: '华语' },
        { name: '流行' },
        { name: '摇滚' },
        { name: '民谣' },
        { name: '电子' }
        ],
      hotList: [],
      albumList: [],
      allTopList: [],
      topRankingList: [],
      bannerHeight: 285,
      els: JSON.parse(localStorage.getItem('track-queue')),
      bigBG: {
        background: ''
      }
    }
  },
  created() {
    // 不要再created里面写太多东西
    this.initData()
  },
  computed: {
    playCount() {
      return function (n) {
        const k = 10000
        const res = (n < k ? n : (parseInt(n / k) + '万'))
        return res
      }
    }
  },
  methods: {
    play(el) {
      this.$store.dispatch('banner/getSong', el)
      this.$store.commit('banner/pushSong', el)
      const track = JSON.parse(localStorage.getItem('track-queue'))
      this.$store.state.banner.curSongIndex = track.findIndex(item => item.name === el.name)
    },
    add(el) {
      this.$store.commit('banner/pushSong', el)
    },
    urlChange(u) {
      this.bigBG.background = `url(${this.imgList[u].imageUrl}?imageView&blur=40x20)`
    },
    download() {
      this.$store.state.banner.curindex = 5;
    },
    preImg() {
      this.$refs.element.prev()
    },
    nextImg() {
      this.$refs.element.next()
    },
    aPreImg() {
      this.$refs.banner.prev()
    },
    aNextImg() {
      this.$refs.banner.next()
    },
    // 初始化数据
    async initData() {
      const res = await getBanners()
      this.imgList = res.banners
      this.bigBG.background = `url(${this.imgList[0].imageUrl}?imageView&blur=40x20)`
      const hotres = await personalized()
      this.hotList = hotres.result
      const albumres = await getAlbum()
      this.albumList = oneToTowArr(5, albumres.monthData)
      const topList = await getAllTopList()
      this.allTopList = topList.list.filter((el, index) => index <= 2)
      this.topRankingList = await Promise.all([getRankingList(this.allTopList[0].id), getRankingList(this.allTopList[1].id), getRankingList(this.allTopList[2].id)])
    }
  },
  components: {
    RedTopNav
  }
}
</script>

<style lang="scss" scoped>
#main-wrap {
  .banner-wrap {
    position: relative;
    height: 285px;
    // background-repeat: no-repeat !important;
    background-size: 100% !important;
    .banner {
      position: absolute;
      width: 984px;
      height: 285px;
      left: 463px;
      ::v-deep .el-carousel {
        width: 730px;
        .el-carousel__container {
          .el-carousel__item {
            a {
              display: inline-block;
              width: 100%;
              height: 100%;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .download {
        display: flex;
        position: absolute;
        left: 730px;
        top: 0px;
        height: 285px;
        width: 254px;
        flex-direction: column;
        background: url('../../assets/imgs/download.png') no-repeat;
        a {
          position: absolute;
          width: 215px;
          height: 56px;
          margin-left: -1px;;
          top: 185px;
          background: url('../../assets/imgs/download.png') no-repeat;
          background-position: 0 290px;
          align-self: center;
        }
        p {
          position: absolute;
          color: #8d8d8d;
          font-size: 12px;
          bottom: 20px;
          align-self: center;
        }
      }
      .btn-l {
        position: absolute;
        width: 37px;
        height: 63px;
        left: -70px;
        top: 115px;
        background: url('../../assets/imgs/banner.png');
        background-position: 0 298px;
        &:hover {
          background-position: 0 228px;
        }
      }
      .btn-r {
        position: absolute;
        width: 37px;
        height: 63px;
        left: 1014px;
        top: 115px;
        background: url('../../assets/imgs/banner.png');
        background-position: 0 150px;
        &:hover {
          background-position: 0 80px;
        }
      }
    }
  }
  .content-wrap {
    background-color: rgb(245, 245, 245);
    .content {
      display: flex;
      position: relative;
      width: 981px;
      left: 463px;
      border: 1px solid #d3d3d3;
      border-width: 0 1px;
      background: #fff;
      .content-l {
        width: 691px;
        padding: 20px 20px 40px;
        .title {
          position: absolute;
          font-size: 20px;
          top: 5px;
          left: 30px;
        }
        .tab {
          position: absolute;
          left: 135px;
          bottom: 8px;
          a {
            font-size: 12px;
            color: #666;
          }
          span {
            margin: 0 10px;
            color: #ccc;
          }
          a:last-child {
            span {
              display: none;
            }
          }
        }
        .hot-wrap {
          display: flex;
          flex-grow: 1;;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 20px;
          margin-bottom: 40px;
          .hot-item {
            width: 140px;
            height: 204px;
            line-height: 1.4;
            .li-t {
              position: relative;
              width: 140px;
              height: 140px;
              img {
                width: 100%;
                height: 100%;
              }
              .li-a {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: url('../../assets/imgs/coverall.png') no-repeat;
                background-position: 0px 0px;
              }
              .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 27px;
                color: #ccc;
                background: url('../../assets/imgs/coverall.png');
                background-position: 0 -537px;
                // z-index: 999;
                .bot-a {
                  position: absolute;
                  right: 10px;
                  bottom: 5px;
                  width: 16px;
                  height: 17px;
                  background: url('../../assets/imgs/iconall.png');
                  background-position: 0 0;
                  &:hover {
                    background-position: 0 -60px;
                  }
                }
                .icon {
                  display: inline-block;
                  width: 14px;
                  height: 11px;
                  margin: 9px 5px 9px 10px;
                  background: url('../../assets/imgs/iconall.png');
                  background-position: 0 -24px;
                }
                .nb {
                  position: absolute;
                  font-size: 12px;
                  top: 6px;
                  left: 30px;
                }
              }
            }
            .dec {
              width: 100%;
              a {
                display: inline-block;
                font-size: 14px;
                width: 140px;
              }
            }
          }
        }
        .new-album {
          position: relative;
          margin: 20px 0 37px;
          border: 1px solid #d3d3d3;
          .inner {
            padding-left: 16px;
            background: #f5f5f5;
            border: 1px solid #fff;
            .album-l {
              position: absolute;
              width: 17px;
              height: 17px;
              left: 4px;
              top: 71px;
              background: url('../../assets/imgs/index.png');
              background-position: -260px -75px;
              &:hover {
                background-position: -280px -75px;
              }
            }
            .album-r {
              position: absolute;
              top: 71px;
              right: 12px;
              width: 17px;
              height: 17px;
              background: url('../../assets/imgs/index.png');
              background-position: -300px -75px;
              &:hover {
                background-position: -320px -75px;
              }
            }
            .roll {
              width: 645px;
              margin-top: 28px;
              ::v-deep .el-carousel {
                .el-carousel__item {
                  display: flex;
                  justify-content: space-between;
                  margin-left: 11px;
                  .album {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    &:hover {
                      .album-play {
                        display: block;
                        background-position: 0px -85px;
                      }
                    }
                    img {
                      display: block;
                      width: 100%;
                      height: 100%;
                    }
                    .album-mask {
                      position: absolute;
                      top: 0px;
                      width: 100px;
                      height: 100px;
                    }
                    .album-play {
                      position: absolute;
                      display: none;
                      left: 72px;
                      top: 72px;
                      width: 22px;
                      height: 22px;
                      background: url('../../assets/imgs/iconall.png');
                      &:hover {
                        background-position: 0px -110px;
                      }
                    }
                  }
                  .album-name {
                    a {
                      display: inline-block;
                      width: 100px;
                      font-size: 12px;
                      line-height: 18px;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                    }
                  }
                  .album-title {
                    a {
                      display: inline-block;
                      width: 100px;
                      color: #666;
                      font-size: 12px;
                      line-height: 18px;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .blist {
          display: flex;
          height: 472px;
          margin-top: 20px;
          padding-left: 1px;
          background: url('../../assets/imgs/index_bill.png') no-repeat;
          .blk {
            width: 230px;
            .b-top {
              position: relative;
              display: flex;
              height: 100px;
              padding: 20px 0 0 19px;
              .b-img {
                width: 80px;
                height: 80px;
                a {
                  position: absolute;
                  width: 80px;
                  height: 80px;
                  left: 19px;
                }
                img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }
              .b-tit {
                width: 116px;
                color: #333;
                margin: 6px 0 0 10px;
                a {
                  font-size: 14px;
                  font-weight:bold
                }
                .btn {
                  margin-top: 10px;
                  .btn-p {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                    background: url('../../assets/imgs/index.png');
                    background-position: -267px -205px;
                    &:hover {
                      background-position: -267px -235px;
                    }
                  }
                  .btn-a {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                    background: url('../../assets/imgs/index.png');
                    background-position: -300px -205px;
                    &:hover {
                      background-position: -300px -235px;
                    }
                  }
                }
              }
            }
            .b-btm {
              ol {
                height: 319px;
                margin-left: 50px;
                line-height: 32px;
                li:nth-child(-n+3) span {
                  color: #c10d0c;
                }
                li {
                  display: flex;
                  position: relative;
                  height: 32px;
                  &:hover {
                    .oper {
                      display: flex;
                    }
                    .s-name {
                      width: 98px;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                    }
                  }
                  .oper {
                    position: absolute;
                    width: 82px;
                    top: 7px;
                    right: 0;
                    display: none;
                    .o-p {
                      width: 17px;
                      height: 17px;
                      margin-right: 10px;
                      background: url('../../assets/imgs/index.png');
                      background-position: -267px -268px;
                      &:hover {
                        background-position: -267px -288px;
                      }
                    }
                    .o-a {
                      width: 17px;
                      height: 17px;
                      margin-right: 10px;
                      background: url('../../assets/imgs/icon.png');
                      background-position: 0px -700px;
                      &:hover {
                        background-position: -22px -700px;
                      }
                    }
                    .o-s {
                      width: 17px;
                      height: 17px;
                      margin-right: 10px;
                      background: url('../../assets/imgs/index.png');
                      background-position: -296px -269px;
                      &:hover {
                        background-position: -296px -289px;
                      }
                    }
                  }
                  .list-rank {
                    display: inline-block;
                    width: 35px;
                    height: 32px;
                    margin-left: -35px;
                    text-align: center;
                    font-size: 16px;
                    }
                  .s-name {
                    width: 170px;
                    height: 32px;
                    font-size: 12px;
                    overflow: hidden;
                  }
                }
              }
              .btm-more {
                height: 32px;
                margin-right: 32px;
                text-align: right;
                line-height: 32px;
                font-size: 12px;
              }
            }
          }
        }
      }
      .content-r {
        width: 250px;
        border-left: 1px solid #d3d3d3;
        border-width: 0 1px;
        .r-user-profile {
          .r-myinfo {
            height: 126px;
            background: url('../../assets/imgs/index.png');
            background-position: 0 0;
            .note {
              width: 205px;
              font-size: 12px;
              margin: 0 auto;
              padding: 16px 0;
              line-height: 22px;
              color: #666;
            } 
            .r-btn {
              display: block;
              width: 100px;
              height: 31px;
              margin: 0 auto;
              line-height: 31px;
              text-align: center;
              color: #fff;
              text-shadow: 0 1px 0 #8a060b;
              background: url('../../assets/imgs/index.png');
              background-position: 0 -195px;
            }
          }
        }
        .r-singer {
          margin-top: 15px;
          .hd3 {
            display: flex;
            height: 23px;
            margin: 0 20px;
            border-bottom: 1px solid #ccc;
            color: #333;
            justify-content: space-between;
            .singer-more {
              color: #666;
            }
            span {
              font-weight: bold;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>
