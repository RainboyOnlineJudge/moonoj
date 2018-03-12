<template>
  <div>
    <Modal
        v-model="modal1"
        title="确认提交?"
        @on-ok="submit" >
        <p>提交之前请仔细检查!!</p>
          <p>现在提交吗?</p>
    </Modal>

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
    <h3>上传进度</h3>
    <Progress :percent="45" status="active"></Progress>
      <Upload
        type="drag"
        accept=".zip"
        :format=fileFormat
        :max-size="1048576"
        :on-format-error="onFormatError"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag datafile(*.zip) here to upload</p>
        </div>
      </Upload>
    </div>

    <div class="markdownE">
      <h1>题目内容</h1>
      <br>
      <markdown-editor
        v-model="input"
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
      fileFormat:['.zip'],
      input:'',
      modal1:false,
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
    console.log(this.modal)
  },
  methods:{
    submit(){
      let self = this
      if( this.modal == 'create')
        problem.create(this.problem).then(function(res){
          if( res.status == 0)
            this.$Notice.info({
              title:'创建题目成功',
              desc:'请上传题目的数据'
            });
        })

    },
    onFormatError(file,fileList){
      this.$Notice.error({
          title:'不能持的文件类型:'+file.name,
          desc:'只能上传*.zip文件'
      })
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
</style>
