<template>
  <div class = "rtable">
    <Table 
      v-show="isShow"
      :columns="columns" 
      :data="result.result"
      ></Table>
    
    <div class="compile-error" v-show="ce !== ''">
      <h3>编译失败:</h3>
      <pre>
      <code>
        {{ ce }}
      </code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rtable',
  data () {
    return {
      columns:[
        {
          title:'#',
          key:'count'
        },
        {
          title:'内存/KB',
          render:function(h,params){
            return h('Tag',params.row.memory)
          }
        },
        {
          title:'时间/MS',
          render:function(h,params){
            return h('Tag',params.row.time)
          }
        },
        {
          title:'结果',
          render:function(h,params){
            return h('Tag',params.row.result)
          }
        },
      ]
    }
  },
  props: {
    result:Object,
    ce:String
  },
  computed:{
    isShow(){
      if(this.result.result == undefined  || this.result.result.length == 0 )
        return false
      return true;
    }
  }
}
</script>

<style>
.pagination{
  margin:20px 0 20px 0;
}

.compile-error{
}

.compile-error pre{
  background:#f6f6f6;
  border:1px solid #ddd;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 15px;
  word-wrap: normal;
  word-break: break-word!important;
  white-space: pre;
  overflow: auto;
  border-radius: 5px;
}
</style>
