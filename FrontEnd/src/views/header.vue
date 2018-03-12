<template>
  <div class="header" v-show="isShow">
    <Menu mode="horizontal" theme="light" active-name="1" :accordion="true" @on-select="onSelect">
      <div class="header-menu">
        <Menu-item name="Index">
            <Icon type="android-home"></Icon>
            主页
        </Menu-item>
        <Menu-item name="problemList">
            <Icon type="ios-paper"></Icon>
            题库
        </Menu-item>
        <Menu-item name="Submission">
            <Icon type="ios-people"></Icon>
            提交记录
        </Menu-item>
        <Menu-item name="3">
            <Icon type="settings"></Icon>
            标签
        </Menu-item>
        <Menu-item name="contestList">
            <Icon type="trophy"></Icon>
            比赛
        </Menu-item>
        <div style="float:right">
          <Menu-item name="Help">
            <Icon type="ios-help"></Icon>
            帮助/关于
          </Menu-item>
          <Submenu name="10"> <template slot="title">
              <Icon type="person"></Icon>
              {{ uinfo.username}}
            </template>
              <Menu-item name="userDetailInfo">用户信息</Menu-item>
              <Menu-item name="logout">退出登录</Menu-item>
          </Submenu>
        </div>
      </div>
    </Menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
    }
  },
  computed:{
    isShow: function(){
      return !(this.$route.name =='Login' || this.$route.name == 'Reg' || this.$route.name =='Info')
    },
    ...mapGetters([
      'uinfo'
    ])
  },
  methods:{
    onSelect(name){
      let self  = this

      //logout
      if(name === 'logout'){
        
        this.$store.dispatch('logout')
        .then(()=>{
          self.$router.push({name:"Login"})
        })

        return
      }
      this.$router.push({name:name})
    }
  }
}
</script>

<style>
.header-menu {
  padding-left:5%;
  padding-right:5%;
}
</style>

