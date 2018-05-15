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

//list 的搜索操作


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
        {
          title:'Action',
          render:function(h,params){
            return h('div',[
              h('Button',{
                props:{
                  type:'primary',
                  shape:'circle',
                  icon:"edit"
                },
                style:{
                  marginRight:'5px'
                },
                on:{
                  click:()=>{
                    Vue.$router.push("/problem/fix/"+params.row._id)
                  }
                }
              }),
              h('Button',{
                props:{
                  type:'primary',
                  shape:'circle',
                  icon:"eye"
                },
                style:{
                  marginRight:'5px'
                },
                on:{
                  click:()=>{
                    console.log('view')
                  }
                }
              }),
              h('Button',{
                props:{
                  type:'error',
                  shape:'circle',
                  icon:'trash-a'
                },
                style:{
                  marginRight:'5px'
                },
                on:{
                  click:()=>{
                    console.log('Delete')
                  }
                }
              })
            ])
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
</style>
