<template>
  <div>
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="onSelect">
      <div class="layout-logo-left">
        <span> 管理员:{{uinfo.username}} </span>
      </div>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          题目
        </template>
        <MenuItem name="1-1">题目列表</MenuItem>
        <MenuItem name="1-2">创建题目</MenuItem>
        <MenuItem name="1-3">修改题目</MenuItem>
        <MenuItem name="1-4">题目信息</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          用户管理
        </template>
        <MenuItem name="2-1">用户列表</MenuItem>
        <MenuItem name="2-2">邀请码</MenuItem>
        <MenuItem name="2-3">管理员</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>
          比赛
        </template>
        <MenuItem name="3-1">比赛列表</MenuItem>
        <MenuItem name="3-2">创建比赛</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data () {
    return {
      routeMap:{
        '1-1':'problemList',
        '1-2':'problemCreate',
        '1-3':'problemFix'
      }
    }
  },
  computed:{
    ...mapGetters([
      'uinfo'
    ])
  },
  methods:{
    onSelect(name){
      let self  = this
      if( name in this.routeMap){
        console.log(name)
        this.$router.push({name: this.routeMap[name]})
      }
      else
        this.$router.push({name:'404'})
        
      //this.$router.push({name:name})
    }
  }
}
</script>

<style>
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  padding-top:5px;
  text-align:center;
  color:#eee;
}
</style>
