<template>
  <div class="btmbar-wrap">
    <div class="mplaybar">
      <div class="updn">
        <div class="left">
          <div class="btn"></div>
        </div>
        <div class="right"></div>
      </div>
      <div class="bg"></div>
      <div class="hand"></div>
      <div class="wrap">
        <audio :src="curSongData.url" ref="audio"></audio>
        <div class="w-btns">
          <router-link to="/" class="prv"></router-link>
          <a href="JavaScript:;" class="ply" :class="{pause: curState}" @click="playClick()"></a>
          <router-link to="/" class="nxt"></router-link>
        </div>
        <div class="head">
          <a v-if="JSON.stringify(curSongInfo) === '{}'" href="javascript:;" class="mask"></a>
          <img v-else :src="curSongInfo.al.picUrl" alt="歌手图片" class="img">
        </div>
        <div class="play">
          <div class="words">
            <div v-if="JSON.stringify(curSongInfo) !== '{}'">
              <!-- <router-link to="/" v-if="JSON.stringify(curSongInfo) === '{}'" ></router-link> -->
              <router-link to="/" class="name f-s-12 u-line">{{curSongInfo.name}}</router-link>
              <span class="by">
                <span>
                  <!-- <router-link to="/" v-if="JSON.stringify(curSongInfo) === '{}'" ></router-link> -->
                  <router-link to="/" class="f-s-12 u-line">{{curSongInfo.ar[0].name}}</router-link>
                </span>
              </span>
              <router-link to="/" class="src" title="来自歌单"></router-link>
            </div>
          </div>
          <div class="m-pbar">
            <div class="barbg">
              <div class="rdy"></div>
              <el-progress class="cur" percentage="60">
                <span class="p-btn">
                  <i></i>
                </span>
              </el-progress>
            </div>
            <span class="time f-s-12">
              <em>00:06</em>
              / {{min}}:{{sec}}
            </span>
          </div>
        </div>
        <div class="oper">
          <router-link to="/" title="收藏" class="i-add"></router-link>
          <router-link to="/" title="分享" class="i-share"></router-link>
        </div>
        <div class="ctrl">
          <div class="m-vol" style="visibility:hidden"></div>
          <router-link to="/" class="icn i-vol"></router-link>
          <router-link to="/" class="icn i-loop" title="循环"></router-link>
          <span class="m-add">
            <span class="tip" style="display:none">已添加到播放列表</span>
            <a href="JavaScript:;" class="i-list icn" @click="open"></a>
          </span>
          <div class="tip-1"></div>
        </div>
      </div>
      <div class="list" v-if="curClose">
        <div class="list-hd">
          <div class="list-hdc">
            <span class="list-hdc-tit">播放列表(<span></span>)</span>
            <a href="javascript:;" class="addall f-s-12">
              <span class="ico-add"></span>
              <span class="add-a u-line">收藏全部</span>
            </a>
            <span class="line"></span>
            <a href="javascript:;" class="clear f-s-12">
              <span class="ico-clear"></span>
              <span class="clear-c u-line">清除</span>
            </a>
            <p class="list-tit s-l"></p>
            <span class="close ico c-p" @click="close">关闭</span>
          </div>
        </div>
        <div class="list-bd">
          <img :src="curSongData.picUrl" alt="">
          <div class="msk"></div>
          <div class="list-bdc">
            <ul class="tabs f-s-12">
              <li :class="{cursong:  $store.state.banner.curSongIndex == index}" v-for="(item, index) in els" :key="index" @click="play(item,  index)" >
                <div class="col col-1">
                  <div v-if=" $store.state.banner.curSongIndex == index" class="playico"></div>
                </div>
                <div class="col col-2">{{item.name}}</div>
                <div class="col col-3">
                  <div class="icos">
                    <i class="ico ico-del"></i>
                    <i class="ico ico-dl"></i>
                    <i class="ico ico-share"></i>
                    <i class="ico ico-add"></i>
                  </div>
                </div>
                <div class="col col-4">
                  <span :title="item.ar[0].name">
                    <router-link to="/" class="u-line">{{item.ar[0].name}}</router-link>
                  </span>
                </div>
                <div class="col col-5">{{}}</div>
                <div class="col col-6">
                  <a href="" title="来自榜单"></a>
                </div>
              </li>
            </ul>
          </div>
          <div class="bline">
            <span scrol></span>
          </div>
          <div class="ask">
            <a class="ico"></a>
          </div>
          <div class="upload" style="display:none">
            <a href=""></a>
          </div>
          <div class="msk2"></div>
          <div class="list-lyric"></div>
          <div class="bline">
            <span class="scrol"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>>

<script>
export default {
  name: 'playBar',
  components: {
  },
  data() {
    return {
      curState: false,
      curClose: true
    }
  },
  computed: {
    els() {
      return this.$store.state.banner.curSongList
    },
    curSongData() {
      return this.$store.state.banner.curSong
    },
    curSongInfo() {
      return this.$store.state.banner.curSongInfo
    },
    min() {
      const m = parseInt(this.$store.state.banner.curSongInfo.dt / 1000 / 60 % 60)
      return '0' + m
    },
    sec() {
      let s = parseInt(this.$store.state.banner.curSongInfo.dt / 1000 % 60)
      s = (s < 10 ? '0' + s : s)
      return s
    }
  },
  methods: {
    play(el, i) {
      this.$store.state.banner.curSongIndex = i
      this.$store.dispatch('banner/getSong', el)
    },
    playClick() {
      const audio = document.querySelector('audio')
      // this.curState = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2
      if (!this.curState) {
          audio.play().then(_ => {
            this.curState = true
          }).catch(_ => {
            this.curState = false
          })
      } else {
          audio.pause()
          this.curState = false
      }
    },
    close() {
      this.curClose = false
    },
    open() {
      this.curClose = true
    }
  },
  watch: {
    curSongData(newV, oldV) {
      // console.log(oldV, newV);
      // const audio = document.querySelector('audio')
      // audio.load()
      // audio.play()
      // this.playClick()
      const audio = document.querySelector('audio')
      // console.log(audio)
      audio.play().then(_ => {
        this.curState = true
      }).catch(_ => {
        this.curState = false
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .btmbar-wrap {
    position: fixed;
    zoom: 1;
    bottom: 0;
    left: 0;
    right: 0;
    height: 53px;
    width: 100%;
    .mplaybar {
      visibility: visible;
      position: absolute;
      zoom: 1;
      top: -7px;
      left: 0;
      width: 100%;
      height: 53px;
      margin: 0 auto;
      .updn {
        position: relative;
        .left {
          position: absolute;
          top: -14px;
          right: 15px;
          width: 52px;
          height: 67px;
          background: url('../assets/imgs/playbar.png');
          background-position: 0 -380px;
          .btn {
            display: block;
            width: 18px;
            height: 18px;
            margin: 6px 0 0 17px;
            background: url('../assets/imgs/playbar.png');
            background-position: -78px -380px;
          }
        }
        .right {
          position: absolute;
          top: -1px;
          right: 0;
          width: 15px;
          height: 54px;
          background: url('../assets/imgs/playbar.png');
          background-position: -52px -393px;
          pointer-events: none;
        }
      }
      .bg {
        height: 53px;
        zoom: 1;
        margin-right: 67px;
        background: url('../assets/imgs/playbar.png');
        background-position: 0 0;
        background-repeat: repeat-x;
      }
      .hand {
        position: absolute;
        top: -10px;
        width: 100%;
        height: 20px;
      }
      .wrap {
        display: flex;
        position: absolute;
        z-index: 15;
        top: 6px;
        width: 980px;
        height: 47px;
        margin-left: 463px;
        align-items: center;
        .w-btns {
          display: flex;
          width: 137px;
          .prv {
            display: block;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            margin-top: 5px;
            background: url('../assets/imgs/playbar.png');
            background-position: 0 -130px;
          }
          .ply {
            width: 36px;
            height: 36px;
            margin-right: 8px;
            background: url('../assets/imgs/playbar.png');
            background-position: 0 -204px;
          }
          .nxt {
            display: block;
            width: 28px;
            height: 28px;
            margin-right: 8px;
            margin-top: 5px;
            background: url('../assets/imgs/playbar.png');
            background-position: -80px -130px;
          }
        }
        .head {
          margin: 0px 15px 0 0;
          .img {
            width: 34px;
            height: 34px;
          }
          .mask {
            display: inline-block;
            width: 34px;
            height: 34px;
            background: url('../assets/imgs/playbar.png');
            background-position: 0px -80px;
          }
        }
        .play {
          position: absolute;
          top: 0;
          left: 180px;
          width: 608px;
          .words {
            height: 28px;
            overflow: hidden;
            color: #e8e8e8;
            text-shadow: 0 1px 0 #171717;
            line-height: 28px;
            .name {
              max-width: 300px;
            }
            .by {
              max-width: 220px;
              margin-left: 15px;
              color: #9b9b9b;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              }
            .src {
                display: inline-block;
                position: absolute;
                top: 3px;
                width: 14px;
                height: 15px;
                margin: 5px 0 0 13px;
                background: url('../assets/imgs/playbar.png');
                background-position: -110px -103px;
            }
          }
          .m-pbar {
            width: 493px;
            .barbg {
              
              .rdy {
                width: 0px;
                height: 9px;
                background: url('../assets/imgs/statbar.png');
                background-position: right -30px;
              }
              .cur {
                
                .p-btn {
                  position: absolute;
                  top: 21px;
                  right: -13px;
                  width: 22px;
                  height: 24px;
                  margin-left: -11px;
                  background: url('../assets/imgs/iconall.png') no-repeat;
                  background-position: 0 -250px;
                  i {
                    visibility: hidden;
                    position: absolute;
                    left: 5px;
                    top: 5px;
                    width: 12px;
                    height: 12px;
                  }
                }
              }
            }
            .time {
              position: absolute;
              top: 24px;
              right: 24px;
              color: #797979;
              text-shadow: 0 1px 0 #121212;
              em {
                color: #a1a1a1;
              }
            }
          }
        }
        .oper {
          position: absolute;
          display: flex;
          right: 126px;
          width: 60px;
          top: 2px;
          .i-add {
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
            background: url('../assets/imgs/playbar.png');
            background-position: -88px -163px;
          }
          .i-share {
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            text-indent: -9999px;
            background: url('../assets/imgs/playbar.png');
            background-position: -114px -163px;
          }
        }
        .ctrl {
          display: flex;
          position: absolute;
          z-index: 10;
          right: 0px;
          top: 2px;
          width: 113px;
          padding-left: 13px;
          background: url('../assets/imgs/playbar.png') no-repeat;
          background-position: -147px -238px;
          .i-vol {
            display: inline-block;
            background: url('../assets/imgs/playbar.png') no-repeat;
            background-position: -2px -248px;
          }
          .i-loop {
            background: url('../assets/imgs/playbar.png') no-repeat;
            background-position: -3px -344px;
          }
          .m-add {
            width: 59px;
            height: 36px;
            .i-list {
              display: inline-block;
              width: 38px;
              padding-left: 21px;
              line-height: 27px;
              text-align: center;
              color: #666;
              text-shadow: 0 1px 0 #080707;
              text-indent: 0;
              background: url('../assets/imgs/playbar.png') no-repeat;
              background-position: -46px -70px;
            }
          }
        }
      }
      .list {
        position: absolute;
        left: 50%;
        bottom: 47px;
        width: 986px;
        height: 301px;
        margin-left: -493px;
        .list-hd {
          height: 41px;
          padding: 0 5px;
          background: url('../assets/imgs/playlist_bg.png') no-repeat;
          background-position: 0 0;
          .list-hdc {
            position: relative;
            height: 40px;
            a {
              color: #ccc;
            }
            .list-hdc-tit {
              position: absolute;
              left: 25px;
              top: 0;
              height: 39px;
              line-height: 39px;
              font-size: 14px;
              color: #e2e2e2;
            }
            .addall {
              position: absolute;
              display: flex;
              left: 398px;
              top: 12px;
              height: 15px;
              line-height: 15px;
              .ico-add {
                height: 16px;
                width: 16px;
                margin: 0px 6px 0 0;
                background: url('../assets/imgs/playlist.png');
                background-position: -24px 0;
              }
            }
            .line {
              position: absolute;
              top: 13px;
              left: 477px;
              height: 15px;
              border-left: 1px solid #000;
              border-right: 1px solid #2c2c2c;
            }
            .clear {
              display: flex;
              position: absolute;
              left: 490px;
              top: 12px;
              height: 15px;
              line-height: 15px;
              .ico-clear {
                height: 16px;
                width: 13px;
                margin: 0px 6px 0 0;
                background: url('../assets/imgs/playlist.png');
                background-position: -51px 0;
              }
            }
            .list-tit {
              position: absolute;
              left: 595px;
              top: 0;
              width: 346px;
              text-align: center;
              height: 39px;
              line-height: 39px;
              color: #fff;
              font-size: 14px;
            }
            .close {
              position: absolute;
              top: 6px;
              right: 8px;
              width: 30px;
              height: 30px;
              overflow: hidden;
              text-indent: -999px;
              background: url('../assets/imgs/playlist.png');
              background-position: -195px 9px;}
          }
        }
         .list-bd {
          position: absolute;
          left: 0;
          top: 41px;
          width: 976px;
          height: 260px;
          padding: 0 5px;
          overflow: hidden;
          background: url('../assets/imgs/playlist_bg.png');
          background-position: -1014px 0;
          background-repeat: repeat-y;
          .msk {
          position: absolute;
          left: 2px;
          top: 0;
          // z-index: 2;
          width: 558px;
          height: 260px;
          background: #121212;
          opacity: .5;
          }
          .list-bdc {
            position: absolute;
            left: 2px;
            top: 0;
            z-index: 4;
            height: 260px;
            width: 553px;
            overflow: auto;
            .tabs {
              display: flex;
              flex-direction: column;
              color: #ccc;
              li {
                display: flex;
                width: 100%;
                .col-1 {
                  width: 10px;
                }
                .col-2 {
                  width: 250px;
                }
                .col-3 {
                  width: 97px;
                  .icos {
                    display: flex;
                    flex-direction: row-reverse;
                    .ico-del {
                    width: 13px;
                    background: url('../assets/imgs/playlist.png') no-repeat;
                    background-position: -51px 0;
                    }
                    .ico-dl {
                      width: 14px;
                      background: url('../assets/imgs/playlist.png') no-repeat;
                      background-position: -57px -50px;
                    }
                    .ico-share {
                      width: 14px;
                      background: url('../assets/imgs/playlist.png') no-repeat;
                      background-position: 0 0;
                    }
                    .ico-add {
                      width: 16px;
                      background: url('../assets/imgs/playlist.png') no-repeat;
                      background-position: -24px 0;
                    }
                  }
                }
                .col-4 {
                  width: 70px;
                }
                .col-5 {
                  width: 35px;
                  color: #666;
                }
                .col-6 {
                  width: 37px;
                  padding-left: 6px;
                  a {
                    float: right;
                    margin: 8px 15px 0 0;
                    height: 16px;
                    width: 14px;
                    margin-left: 0;
                    background: url('../assets/imgs/playlist.png');
                    background-position: -80px 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .playico {
    display: block;
    margin-top: 8px;
    width: 10px;
    height: 13px;
    background: url('../assets/imgs/playlist.png');
    background-position: -182px 0;
  }
  .cursong {
    color: #fff;
    background-color: rgba(0,0,0,0.3);
  }
  .pause {
    background-position: 0 -165px !important; 
  }
  .img-m {
    height: 34px;
    width: 34px;
  }
</style>
