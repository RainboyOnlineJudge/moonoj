<template>
  <div>
    <div class="problem-header">
      <h1>{{problem.title}}</h1>
        <div class="info">
          <Tag type="dot">内存: {{problem.memory}}MB</Tag>
          <Tag type='dot'>时间: {{problem.time}}MS</Tag>
          <Tag type= "dot">提交/通过: {{problem.passed+ '/' +problem.posted}}</Tag>
        </div>
    </div>
    <div class="markdown-body" v-html="rawhtml">
    </div>
  <div class="problem-editor">
    <h1>代码提交:</h1>
    <span>选择语言:</span>
    <Radio-group v-model="lang">
      <Radio label="cpp">
        <span>C++</span>
      </Radio>
      <Radio label="c">
        <span>C</span>
      </Radio>
      <!--<Radio label="pas">-->
        <!--<span>Pascal</span>-->
      <!--</Radio>-->
    </Radio-group>
    <codemirror
      ref="myEditor"
      v-model:code="code"
      :options="editorOptions"
      >
    </codemirror>
    <div class="problem-button">
      <Button type="primary" :loading="loading" @click="submit">
        <span v-if="!loading">提交</span>
        <span v-else>提交评测中...</span>
      </Button>
    </div>
  </div>
  <div class="problem-result">
    <rtable :result="result" :ce="ce"></rtable>
  </div>
</div>
</template>

<script>
import api from '../services/problem.js'
import rtable from '../components/rtbale.vue'
import sub from '../services/submission.js'
export default {
  data(){
    return {
      code:'',
      ce:'',
      lang:'cpp',
      result:{},
      submit_id:null, // 提交的id
      loading:false,
      editorOptions:{
        tabSize:4,
        mode: 'text/javascript',
        lineNumbers:true,
        line:true,
        styleSelectedText:true
      },
      problem:{},
      columns:{
      }
    }
  },
  components:{
    rtable
  },
  computed:{
    rawhtml(){
      return this.markdown(this.problem.content)
    }
  },
  mounted(){
    let self = this
    api.problem(this.id,true)
      .then((data)=>{
        if(data.status !== -1){
          self.problem = data.problem
        }
        else {
          self.$Notice.error({
            title:"获取题目失败",
            desc:data.message
          })
        }
      })
  },
  methods:{
    submit(){
      let self = this
      self.submit_id = null;
      self.loading = true;
      let route = this.$route
      let id = route.params.id
      let cid = route.params.cid
      let model = 'contest'
      if( cid == null || cid == undefined)
      {
        cid = null
        model= 'normal'
      }
      // 
      //console.log(id,cid,self.code,self.lang)
      console.log('start submit problem')

      // set 0
      self.result = { result:[]}
      self.ce = ''
      api.submit(id,cid,self.code,self.lang,model)
        .then(function(data){
          if( data._id)
          {
            self.submit_id = data._id;
            self.polling() // 轮询
          }
        })
    },
    polling(isContest){  //轮询
      let self = this
      if( self.submit_id == null ||  self.submit_id == '') // 没有_id
        return ;
      let idx = 0;
      let Interval = setInterval(function(){
        idx++;
        if(idx > 30){
          self.loading = false;
          clearInterval(Interval);
          self.$Notice.error({
            title:'获取代码评测失败!'
          })
          return;
        }
        sub.getOne(self.submit_id,isContest).then(function(data){
          if( data.status == 'judging') return;

          if( data.result.verdict == 6 ) // 编译失败
          {
            console.log('编译失败')
            console.log(data)
            self.loading = false;
            clearInterval(Interval);
            self.ce = data.result.result[0]
            return ;
          }
          self.result = data.result
          //console.log(data)
          self.loading = false;
          clearInterval(Interval);
        })

      },1000)

    }
  },
  props:{
    id:{
      type:Number,
      default(){
        return 1000;
      }
    },
    cid:{
      type:Number,
      default(){
        return -1;
      }
    },
    force:{
      type:Boolean,
      default(){
        return false;
      }
    }
  }
}
</script>
<style>

.CodeMirror{
  width:100%;
  margin-top:20px;
  margin-bottom:20px;
  border:1px solid #ddd;
  border-radius:5px;
}

.problem-editor{
  padding-top:25px;
  margin-top:25px;
  //padding:50px;
  border-top:1px solid #ddd;
}
.problem-button {
  text-align:center;
}
.problem-header h1{
  text-align:center;
  font-size:35px;
}
.problem-header .info {
  margin:0 auto;
  text-align:center;
}

.problem-header .info .ivu-tag{
  margin:10px;
}
.problem-result {
  margin:20px auto;
  width:70%;
}
</style>
