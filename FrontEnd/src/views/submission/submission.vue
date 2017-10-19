<template>
  <div>
    <div class="toolbar">
      <Row>
        <Col span="12">
        <Button icon="loop" :loading="refresh_button" type="primary" :disabled="auto_request" @click="refresh_button_click">
          <span v-if="!refresh_button">刷新</span>
          <span v-else>Loading</span>
        </Button>
        </Col>
        <Col span="12">
          <span>
            自动刷新/10s:
          </span>
          <i-switch size="large" :value="auto_request" @on-change="switch_change">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </Col>
      </Row>
    </div>

    <vtable
      ref="vtable"
      size="default"
      :columns="columns"
      :count="count"
      :page="page"
      url="sub/normal"
      >
    </vtable>
  </div>
</template>

<script>
import vtable from '../../components/vtable.vue'
import { mapGetters,mapActions } from 'vuex'

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
      count:30,
      page:1,
      refresh_button:false,
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
    setInterval(this.auto_get_sub,10000)
  },
  methods:{
    refresh(){
      this.$refs.vtable.refresh()
    },
    switch_change(){
      this.auto_request_toggle()
    },
    auto_get_sub(){
      if( this.auto_request){
        console.log('auto_get_sub')
        this.refresh()
      }
    },
    refresh_button_click(){
      let self = this
      self.refresh_button = true
      setTimeout(function(){self.refresh_button = false},5000)
      self.refresh()
    },
    ...mapActions(['auto_request_toggle'])
  },
  computed:{
    ...mapGetters(['auto_request'])
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

.toolbar {
  margin-bottom:20px;
}
</style>
