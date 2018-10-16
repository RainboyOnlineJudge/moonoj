<template>
  <div id="app">
    <router-view name="background"></router-view>
    <myheader></myheader>
    <div class="layout-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from './views/header.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    myheader:header
  }
}
</script>

<style>
</style>
