<template>
  <div class="hello">
    <select v-model="$store.state.exchangeRateModule.currentSelect1" >
      <option v-for="item in moneyList" :key='item.id' :value='item.value'>{{item.name}}</option>
    </select>
    <input type="text" v-model="$store.state.exchangeRateModule.iptValue1" @input="firstChange">
    <input type="text" v-model="$store.state.exchangeRateModule.iptValue2" @input="$store.commit('secondChange')">
    <select v-model="$store.state.exchangeRateModule.currentSelect2" @change="$store.commit('secSelectChange')">
      <option v-for="item in moneyList" :key='item.id' :value='item.value'>{{item.name}}</option>
    </select>
    <button @click="$store.dispatch('getMv')">获取最新专辑</button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      moneyList: [
        {id: 0, name: '美元', value: 7},
        {id: 1, name: '英镑', value: 8.7},
        {id: 2, name: '欧元', value: 8},
        {id: 3, name: '人民币', value: 1}
      ],
    }
  },
  methods: {
    ...mapMutations([
      'firstChange',
      'secondChange',
      'firSlectChange',
      'secSelectChange',
      'getAlbum',
      'test'
    ]),
    firstChange() {
      
    },
    ...mapActions({getnew: 'getAlbum'})
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
