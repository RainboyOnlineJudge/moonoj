<template>
  <div class="layout-container">
    <vtable
      ref="vtable"
      size="default"
      :columns="columns"
      :count="count"
      :page="page"
      url="contest/list"
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
      count:10,
      page:1,
      columns:[
        {
          title:'编号',
          key:'_id'
        },
        {
          title:'标题',
          key:'title'
        },
        {
          title:'开始时间',
          key:'stime',
          render:function(h,params){
            return h('p',[
              h('Icon',{
                props:{
                  type:'clock'
                }
              }),
              h('strong',timeFormat(params.row.stime))
            ]);
          }
        },
        {
          title:'结束时间',
          key:'ttime',
          render:function(h,params){
            return h('p',[
              h('Icon',{
                props:{
                  type:'clock'
                }
              }),
              h('strong',timeFormat(params.row.ttime))
            ]);
          }
        },
        {
          title:'是否参加',
          key:'isIn',
          render:(h,params)=>{
            let str = params.row.isIn ?'已参加':'未参加'
            let self = this
            return h('Button',{
              props:{
                disabled:params.row.isIn,
                type:'info'
              },
              on:{
                click:()=>{
                  self.addcontest(params.row._id)
                }
              }
            },str)
          }
        }
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
    },
    addcontest(id){
      let self = this
      capi.addcontest(id).then((data)=>{
        if(data.status == -1){
          self.$Notice.error({
            title:"加入比赛失败",
            desc:data.message
          })
        }
        else{
          self.$Notice.info({
            title:"加入比赛成功"
          })
        }
        self.refresh()
      })
    }
  }
}
</script>
