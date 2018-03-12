<template>
  <div class = "vtable">
    <Table 
      :columns="columns" 
      :data="data"
      :size="size"
      :with="width"
      :height="height"
      :border="border" 
      :stripe="stripe"
      :showHeader="showHeader"
      :highlightRow="highlightRow"
      :rowClassName="rowClassName"
      :disabledHover="disabledHover"
      :loading="loading"
      ></Table>
    <div class="pagination">
      <Page 
        :total="total" :page-size="count"
        :current="currentPage"
        show-elevator
        @on-change="pagechange"
        ></Page>
    </div>
  </div>
</template>

<script>
import api from '../services/index.js'
export default {
  name: 'vtable',
  data () {
    return {
      loading:true,
      data:[],
      total:100,//数据总数
      totalPage:4,
      currentPage:1
    }
  },
  watch:{
    page:function(){
      let self = this
      api.get(self.url,{page:self.page,count:self.count})
        .then((data)=>{
          console.log(data)
        })
    }
  },
  props: {
    param:{
      type:Object,
      default(){
        return {}
      }
    },
    url:{
      type:String,
      default(){
        return '/';
      }
    },
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    size: {
      type:String,
      default(){
        return 'default'
      }
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return '';
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    page:{
      type:Number,
      default(){
        return 1;
      }
    },
    count:{ //每一页面有多少
      type:Number,
      default(){
        return 10;
      }
    },
    params:{ //额外的参数
      type:Object,
      default(){
        return {};
      }
    }
  },
  methods:{
    refresh(){ //刷新
      let self = this
      self.loading = true;

      let params = self.param
      params.page = self.currentPage
      params.count = self.count
      api.get(self.url,params)
        .then((data)=>{
          //console.log(data)
          self.data = data.data
          self.totalPage= data.totalPage
          self.currentPage = data.currentPage
          self.total = data.total
          self.loading = false;
        })
    },
    pagechange(page){
      let self = this
      self.currentPage = page
      self.refresh()
    }
  }
}
</script>

<style>
.pagination{
  margin:20px 0 20px 0;
}
</style>
