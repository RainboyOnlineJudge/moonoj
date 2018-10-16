<template>
     <Row>
       <Col span="18">
          <div class="box-border problem-container">
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
            <h2>选择语言:</h2>
            <Radio-group v-model="lang">
              <Radio label="cpp">
                <span>C++</span>
              </Radio>
              <Radio label="c">
                <span>C</span>
              </Radio>
              <Radio label="pas">
                <span>Pascal</span>
              </Radio>
              <Radio label="python3">
                <span>Python3</span>
              </Radio>
            </Radio-group>

            <h2>代码:</h2>
            <div class="problem-button">
              <Button type="primary" @click="submit">
                <span>提交</span>
              </Button>
            </div>

            <code-editor
              v-model="code"
              :options="editorOptions">
            </code-editor>
          </div>
        </div>
       </Col>
       <Col span="6">
        <div class="problem-info-container">
          <Row>
            <Card :bordered="false">
                <p slot="title">题目信息</p>
                <ul class="problem-info-list">
                  <li><strong>提交/通过</strong> <span>{{problem.passed+ '/' +problem.posted}}</span></li>
                  <li><strong>标签</strong> <span>1</span></li>
                  <li><strong>难度</strong> <span>1</span></li>
                  <li><strong>内存</strong> <span>{{problem.memory}} mb</span></li>
                  <li><strong>时限</strong> <span>{{problem.time}} ms</span></li>
                </ul>
            </Card>
          </Row>
          <br>
          <Row>
            <Card :bordered="false">
                <p slot="title">标签列表[隐藏]</p>
            </Card>
          </Row>
        </div>
       </Col>
    </Row>
</template>

<script>
import api from '../services/problem.js'
import sub from '../services/submission.js'
export default {
  data(){
    return {
      code:'',
      lang:'cpp',
      result:{},
      submit_id:null, // 提交的id
      editorOptions:{
        tabSize:8,
        mode: 'text/cpp',
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
      //self.submit_id = null;
      //self.loading = true;
      //let route = this.$route
      //let id = route.params.id
      //let cid = route.params.cid
      //let model = 'contest'
      //if( cid == null || cid == undefined)
      //{
      //  cid = null
      //  model= 'normal'
      //}
      //// set 0
      //self.result = { result:[]}
      self.ce = ''
      if(self.code.length == 0){
        console.log('代码为空')
        this.$Message.info('代码不能为空');
        return 
      }

      //设定
      this.$store.dispatch('set_post_judge_data',{
        code:this.code,
        cmp:this.problem.spj || 'fcmp2',
        lang:this.lang,
        memory:this.problem.memory || 128,
        time: this.problem.time /1000 || 1,
        stack: this.problem.stack || 128,
        judge_id: this.problem._id,
        output_size:128,
        revert:{
        }
      })
      this.$store.dispatch('set_pre_problem_path',this.$route.path)
      console.log('跳转到judge页面')
      this.$router.push('/Judge')
    },
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
  margin-top:10px;
  margin-bottom:20px;
  border:1px solid #ddd;
  border-radius:5px;
}

.box-border {
  //border:1px solid #d4d4d5;
  border-radius:5px;
}

.problem-container {
  background:#fff;
  padding:5px 10px;
}
.problem-info-container{
  padding:0 10px;
}

.problem-editor{
  padding-top:25px;
  margin-top:25px;
  //padding:50px;
  border-top:1px solid #ddd;
}

.problem-editor>.ivu-radio-group{
  margin:5px 15px;
}
.problem-button {
  //text-align:center;
  margin-top:10px;
  padding-left:15px;
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

ul.problem-info-list >li {
}
ul.problem-info-list >li>span {
  display:inline-block;
  float:right;
}
</style>
