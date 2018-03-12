<template>
  <div class="judge-result-info">
    <!-- 进度条 -->
    <ButtonGroup size="large">
        <Button type="primary" @click="gotoPre">返回</Button>
        <Button type="success" @click="showCode">显示代码</Button>
    </ButtonGroup>
    <Modal
        v-model="modal1"
        title="代码">
        <div class="markdown-body" v-html="Hightcode">
        </div>
    </Modal>
    <br><br>
    <h2> 评测进度</h2>
    <Progress :percent="percent" :status="status"></Progress>
    <div class="judge-info">
      <p>{{ info}}</p>
    </div>
  
    <!-- 显示失败的信息 -->
    <div class="wrong" :style="{display: detail.length == 0?'none':'block'}">
      <pre><code>{{ detail}}</code></pre>
    </div>
    <!-- 结果card -->

    <!--<button @click="post_judge">sart </button>-->

    <div class="judge-result-home">
      <result-card v-for="item in result"
        :resultCode=item.result
        :memory=item.memory
        :time=item.time
        :detail=item.details
        >
      </result-card>
    </div>

  </div>
</template>
<script>
import resultCard from '../../components/resultCard.vue'
import post_judge from '../../services/post_judge.js'
import {judge_config} from '../../config.js'  //引入全局变量
export default {
  data(){
    return {
      modal1:false,
      percent:0,
      status:'active',
      info:'开始评测',
      data_length:0,
      result:[],
      detail:'',
      post_data:{},
    }
  },
  components:{
    resultCard,
  },
  mounted(){
    this.post_data = this.$store.getters.post_judge_data
    //console.log(this.$store.getters.post_judge_data)
    //console.log(this.$store.getters.pre_problem_path)
    this.post_judge()
  },
  computed:{
    Hightcode(){
      let lang ='c'
      if(this.post_data.lang == 'pas')
        lang = 'pascal'
      else if(this.post_data.lang == 'python3')
        lang = 'python'

      return this.markdown('```'+lang+'\n' + this.post_data.code+'\n```')
    }
  },
  methods:{
    showCode(){
      this.modal1  =true;
    },
    gotoPre(){
      this.$router.push(this.$store.getters.pre_problem_path)
    },
    init_result(length,val){
      let i;
      this.result = []
      for(i=0;i<length;i++)
        this.result.push({
          memory:0,
          time:0,
          details:'',
          result:val
        })
    },
    set_result(idx,val){
      this.result.splice(idx,1,val)
    },
    post_judge(){
      this.percent = 0
      post_judge(this,this.post_data)
    },
    deal_function(status,val){
      //处理
      switch(status){
        case 'normal':
          switch( val.mid){
                case judge_config['WEBSERVER_JUDGERSER']:
                  this.info = val.message
                  this.status = 'wrong'
                  this.$Notice.error({
                        title: val.message,
                      })
                  break;
                case judge_config['PREPARE_JUDGE']:
                    this.percent += 10;
                    if( val.status == 0){
                      this.init_result(val.data.length || 0,-2)
                    }
                    else
                      this.$Notice.error({
                        title: '检查评测数据时失败',
                        desc:val.details +'\n[' + val.raw_file_list.toString() +']'
                      });
                  break;
                case judge_config['START_JUDGE']:
                    if( val.status == 0){
                      this.info = '开始评测'
                    }
                  break;
                case judge_config['COMPILE']:
                    this.percent += 10;
                    if( val.status == 0)
                      this.info = '代码编译成功'
                  else{
                    this.detail = val.details
                    this.status = "wrong"
                    this.$Notice.error({
                        title: '代码编译失败',
                        desc:val.details
                    });
                  }
                  break;
                case judge_config['JUDGING']:
                  if( val.status == 0 ){
                          this.info = '第' + val.count +'个测评点结束!'
                          this.percent +=  70 / this.data_length
                          this.result.splice(val.count-1,1,val)
                  }
                  break;
                case judge_config['END_JUDGE']:
                  if(val.status == 0){
                    this.info = "评测结束!"
                    this.percent = 100
                    this.status = 'success'
                  }
                  break;
                default:
                  break;
          }
          break;
        case "error":
          break;
        case 'connected':
          this.info = "连接评测机成功"
          this.percent+=10;
          break;
        case 'connect-failed':
          break;
        default:
          ;
      }
    }
  }
}
</script>

<style>
.judge-result-info {
  min-height:200px;
}
.judge-result-info>.judge-info {
  text-align:center;
  
}
.judge-result-home {
  margin-top:50px;
}
</style>
