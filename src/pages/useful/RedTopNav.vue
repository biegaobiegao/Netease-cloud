<template>
  <div class="top-nav">
    <div class="red"></div>
    <slot></slot>
    <span class="more">
      <router-link to="/" class="u-line">更多</router-link>
      <i></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'RedTopNav',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .top-nav {
    position: relative;
    height: 33px;
    width: 689px;
    box-sizing: border-box;
    border-bottom: 2px solid #C10D0C;
    .red {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 7px;
      left: 10px;
      background: url('../../assets/imgs/index.png') no-repeat;
      background-position: -234px -162px;;
    }
    .more {
      a {
        color: #666;
        position: absolute;
        right: 25px;
        bottom: 9px;
        font-size: 12px;
      }
      i {
        position: absolute;
        width: 12px;
        height: 12px;
        right: 10px;
        bottom: 8px;
        background: url('../../assets/imgs/index.png') no-repeat;
        background-position: 0 -240px;
      }
    }
  }
</style>
