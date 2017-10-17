<template>
  <div class="layout-container">
    <tabs :data="mydata"></tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import tabs from '../../components/tabs.vue'
export default {
  data(){
    return{
    }
  },
  computed:{
    mydata(){
      let id = this.$route.params.id
      let ret = [
        {
          name:'比赛信息',
          path:{name:'contestInfo',params:{id:id}}
        },
        {
          name:'比赛排名',
          path:{name:'contestRank',params:{id:id}}
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
