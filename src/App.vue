<template>
  <div id="app">
    <topbar></topbar>
    <router-view/>
    <play-bar></play-bar>
  </div>
</template>

<script>
import Topbar from './views/Topbar.vue'
import playBar from './views/btmbar.vue'
export default {
  components: {
    Topbar,
    playBar
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
// #app {
//   display: flex;
//   height: 100vh;
//   flex-direction: column;
//   justify-content: space-between;
//   .idd {
//     flex-grow: 1;
//   }
// }
</style>
