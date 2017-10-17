<template>
  <div class="layout-container">
    <tabs :data="mydata"></tabs>
    <!--<problem :id="id" :force="true"> </problem>-->
    <router-view></router-view>
  </div>
</template>

<script>
import tabs from '../../components/tabs.vue'
export default {
  data(){
    return {
      id:1000,
    }
  },
  computed:{
    mydata(){
      let id = this.$route.params.id
      let ret = [
        {
          name:'题目信息',
          path:{name:'cproblemInfo',params:{id:id}}
        },
        {
          name:'提交信息',
          path:{name:'cproblemSub',params:{id:id}}
        }
      ]
      return ret
    }
  },
  components:{
    tabs
  }
}
</script>
