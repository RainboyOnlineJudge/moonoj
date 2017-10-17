<template>
  <div>
    <vtable
      ref="vtable"
      size="default"
      :columns="columns"
      :count="count"
      :page="page"
      url="sub/normal"
      >
    </vtable>
    <Button @click="refresh">刷新</Button>
  </div>
</template>

<script>
import vtable from '../../components/vtable.vue'
var RESULT_CODE  = require('../../config.js').RESULT_CODE

var language_color = {
  'cpp':'blue',
  'c':'green',
  'pas':'red'
}

var judge_color =  {
  'judging':'red',
  'judged':'green'
}
export default {
  data(){
    return {
      count:50,
      page:1,
      columns:[
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title:"用户",
          render:function(h,params){
            return h('p',params.row.uid.username)
          },
          width:'150px'
        },
        {
          title:'题目编号',
          render:function(h,params){
           return  h('Tooltip',{
                  props:{
                    content: '点击进入提交细节',
                    placement:'top'
                  }
           },[
             h('router-link',{
              props:{
                to:'/problem/'+params.row.pid._id
              }
             },params.row.pid._id)
           ])
          },
          width:'100px'
        },
        {
          title:'标题',
          render:function(h,params){
            return h('router-link',{
              props:{
                to:'/problem/'+params.row.pid._id
              }
            },params.row.pid.title)
          },
          width:'200px'
        },
        {
          title:'语言',
          render:function(h,params){
            return h('Tag',{
              props:{
                color:language_color[params.row.lang]
              }
            },params.row.lang);
          },
          width:'100px'
        },
        {
          title:"status",
          render:function(h,params){
            return h('Tag',{
              props:{
                color:judge_color[params.row.status]
              }
            },params.row.status);
          },
          width:'100px'
        },
        {
          title:"结果",
          className:'result-cell',
          render:function(h,params){
            if( params.row.verdict == 6)
              return h('Tag',{
                props:{
                  color:'red'
                }
              },'Compile Error');


            if(params.row.result.length === 0)
              return h('p','正在评测')

            let ha = []
            for(let i = 0 ;i < params.row.result.length;i++)
            {
              let k  = params.row.result[i].result
              ha.push(
                h('Tooltip',{
                  props:{
                    content: RESULT_CODE[k].code,
                    placement:'top'
                  }
                },[
                  h('Tag',{
                    props:{
                      color:RESULT_CODE[k].color
                    }
                  },
                    RESULT_CODE[k].short_code
                  )
                ])
              )
            }
            return h('p',ha);
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
    }
  }
}
</script>

<style>
.result-cell {
  text-align:center !important;
}

.result-cell .ivu-tag {
  margin-left:0;
  margin-right:0;
  padding-left:2px;
  padding-right:2px;
  border:1px solid #ddd;
}

.ivu-table td,th{
  text-align:center !important;
}
</style>
