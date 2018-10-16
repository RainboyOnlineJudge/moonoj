<template>
  <div>
    <Modal
        v-model="modal1"
        title="确认提交?"
        @on-ok="submit" >
        <p>提交之前请仔细检查!!</p>
          <p>现在提交吗?</p>
    </Modal>

    <Row v-show="modal == 'fix'">
    <div style="display:inline-block">
      <Input v-model="id">
        <span slot="prepend">题目编号</span>
      </Input>
    </div>
      <Button @click="jumpTo">跳转题目</Button>
    </Row>

    <div class="problem-config-items">
      <h1> 题目设定 </h1>
      <br>
      <ul>
        <li> 
          <Input v-model="problem.title">
          <span slot="prepend">标题</span>
          </Input>
        </li>

        <li> 
          <Input v-model="problem.time" number>
            <span slot="prepend">时间限制</span>
            <span slot="append">ms</span>
          </Input>
        </li>

        <li> 
          <Input v-model="problem.memory" number>
            <span slot="prepend">内存限制</span>
            <span slot="append">mb</span>
          </Input>
        </li>

        <li> 
          <Input v-model="problem.stack" number>
            <span slot="prepend">栈大小限制</span>
            <span slot="append">mb</span>
          </Input>
        </li>
        <li> 
          <Input v-model="problem.spj">
            <span slot="prepend">评测器</span>
          </Input>
        </li>
        <li class="problem-tags-li"> 
          <span style="font-size:1.2em;margin-right:10px;">难度:</span>
          <Rate  allow-half show-text v-model="problem.level"></Rate>
        </li>
        <li> 
          <Input v-model="problem.source">
            <span slot="prepend">题目来源</span>
          </Input>
        </li>
        <li class="problem-tags-li"> 
          <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend">
            <div class="ivu-input-group-prepend" style="">
              <span>标签</span></div>
            <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
            <input-tag :tags="problem.tag"></input-tag>
          </div>
        </li>
      </ul>
    </div>

    <div class="uploadData" v-show="modal == 'fix'">
    <h1> 数据目录文件列表 </h1>
    <h1> 数据上传 </h1>

    <div style="display:inline-block;margin:10px;">
      <strong><span>强制上传</span></strong>
      <i-switch v-model="force">
        <span slot="open">是</span>
        <span slot="close">否</span>
      </i-switch>
    </div>
    <h3>上传进度</h3>
    <Upload
        type="drag"
        accept="application/zip"
        name="data"
        :format=fileFormat
        :max-size="1048576"
        :on-format-error="onFormatError"
        :on-error="onError"
        :on-success="onSuccess"
        :action=uploadPath>
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag datafile(*.zip) here to upload</p>
        </div> 
    </Upload>
      <div class="upload_data_files_list">
        <h3>上传的数据文件列表(上传完后检查,不对重新上传)</h3>
        <ul>
          <li v-for="f in upload_data_files">{{f}}</li>
        </ul>
      </div>
    </div>

    <div class="markdownE">
      <h1>题目内容</h1>
      <br>
      <markdown-editor
        v-model="problem.content"
        :configs="configs"
        >
      </markdown-editor>
    </div>
    
    <Button type="primary" long @click="modal1 = true">提交</Button>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag'
import problem from '@/services/problem/index.js'

export default {
  data(){
    return {
      force:false,
      id:1000,
      fileFormat:['zip'],
      modal1:false,
      upload_data_files:[],
      configs:{
      },
      problem:{
        title:'标题',
        time:1000,
        memory:128,
        stack:128,
        spj:'fcmp2',
        level:1,
        source:'原创',
        tag:[],
        content:'',
        score:100
      }
    }
  },
  components:{
    InputTag
  },
  props:{
    modal:{   //两有模式 create fix
      type:String,
      default(){
        return 'create'
      }
    }
  },
  mounted(){
    this.id = this.$route.params.id
    //得到题目具体的信息
    if( this.modal == 'fix'){
      console.log('开始获取题目的信息')
      this.getProblem();
    }
  },
  computed:{
    uploadPath(){
      let pid = this.$route.params.id || '1000'
      let force = ''
      if(this.force){
        force+="?force=true"
      }

      return process.env.api +'problem/'+pid+'/upload/'+force

    }
  },
  methods:{
    submit(){
      let self = this
      if( this.modal == 'create') //创建题目的模式
        problem.create(this.problem).then(function(res){
          console.log(res)
          if( res.status == 0)
            self.$Notice.info({
              title:'创建题目成功',
              desc:'请上传题目的数据'
            });
        })
      else if(this.modal == 'fix'){
        let pid = this.$route.params.id
        if(pid == undefined){
          alert("pid 错误")
          return
        }
        pid = parseInt(pid)
        let data = this.problem
        data.pid = pid

        problem.upload(data).then(function(res){
          console.log(res)
          if( res.status == 0)
            self.$Notice.success({
              title:'更新题目成功',
              desc:''
            });
        })

      }
    },
    getProblem(){
      let self = this
      problem.get(this.id).then(function(info){
        console.log(info)
        self.problem = info.problem
      })
    },
    onFormatError(file,fileList){
      this.$Notice.error({
          title:'不能持的文件类型:'+file.name,
          desc:'只能上传*.zip文件'
      })
    },
    onError(err,file,fileList){
      console.log(err)
      console.log(type(err))
      this.$Notice.error({
        title:'上传文件失败',
        desc:'未知原因'
      })
    },
    onSuccess(res,file,fileList){
      if(res.status != 0){
        this.$Notice.error({
          title:'上传失败',
          desc:res.message
        })
      }
      else{
        this.upload_data_files = res.files
        this.$Notice.success({
          title:'上传成功',
          desc:res.message
        })
      }
    },
    jumpTo(){
      this.$router.push('/problem/fix/'+this.id)
      if( this.modal == 'fix'){
        console.log('开始获取题目的信息')
        this.getProblem();
      }
    }
  }
}
</script>

<style>
.problem-config-items>ul {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
}
.problem-config-items>ul>li{
  display:inline-block;
  margin:10px 50px 10px 0px;
  width:400px;
}
.markdownE {
  text-align:left;
  z-index:9;
  position: relative;
}
.problem-tags-li input {
  display: table-cell;
  width: 100%;
  height: 20px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}

.ivu-modal {
  //z-index:9999999999;
}
.upload_data_files_list {
  margin:20px 50px;
}
</style>
