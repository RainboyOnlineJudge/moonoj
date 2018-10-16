<template>
  <div>
    <vtable
      ref="vtable"
      size="default"
      :columns="columns"
      :count="count"
      :page="page"
      url="problem/list"
      >
    </vtable>
    <Button @click="refresh">刷新</Button>
  </div>
</template>

<script>
import vtable from '../../components/vtable.vue'
import {timeFormat} from '../../utils/index.js'
import capi from '../../services/contest.js'
export default {
  data(){
    return {
      count:50,
      page:1,
      columns:[
        {
          title:'编号',
          key:'_id'
        },
        {
          title:'标题',
          render:function(h,params){
            return h('router-link',{
              props:{
                to:'/problem/'+params.row._id
              }
            },params.row.title)
          }
        },
        {
          title:'时间限制/MS',
          key:'time'
        },
        {
          title:'内存限制/MB',
          key:'memory'
        },
        {
          title:'提交',
          render:function(h,params){
            return h('p',[
              h('Icon',{
                props:{
                  type:'clock'
                }
              }),
              h('strong',params.row.passed+ '/'+ params.row.posted)
            ]);
          }
        },
      ],
    }
  },
  components:{
    vtable
  },
  mounted(){
    this.refresh()
  },
  methods:{
    refresh(){
      this.$refs.vtable.refresh()
    }
  }
}
</script>
