<template>
  <div id="app">
    <div class="layout">
      <router-view name="background"></router-view>
      <Row type="flex">
        <Col span="5" class="layout-menu-left">
          <myheader></myheader>
        </Col>
        <Col span="19">
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view>
            </router-view>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import myheader from './views/header.vue'
export default {
  name:'app',
  data(){
    return {
    }
  },
  mounted(){
    this.$store.dispatch('updateUserInfo')
  },
  components:{
    myheader:myheader
  }
}
</script>

<style>
html,body {
  height:100%;
  margin:0px;
  padding:0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0;
  height:100%;
  border:0px;
}
.layout{
  position:relative;
  background: #f5f7f9;
  position: relative;
  height:100%;
}
.layout-breadcrumb{
  padding: 10px 15px 0;
}
.layout-content{
  height:100%;
  margin:0;
  background: #fff;
  border-radius: 4px;
  overflow-y:scroll;
}
.layout-content-main{
  padding: 10px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
}
.layout-header{
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout >div.ivu-row-flex {
  height:100%;
}
</style>
