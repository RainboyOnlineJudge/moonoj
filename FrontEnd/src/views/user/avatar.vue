<template>
  <div class="avatar_upload">
    <my-upload field="avatar"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="200"
        :height="200"
        :url="url"
        :headers="headers"
        img-format="png"></my-upload>
    <Row>
      <div class="avatar_preview_item">
        <img :src="imgDataUrl">
      </div>
      <div class="avatar_preview_item" >
        <img :src="imgDataUrl" style="border-radius:100%">
      </div>
    </Row>
    <p>如果发现头像没有改变,F5刷新一个浏览器</p>
    <div style="margin:50px;">
    <Button type="primary" shape="circle" icon="upload" @click="toggleShow">上传头像</Button>
    </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
  data(){
    return {
      show: false,
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  mounted(){
    let imgDataUrl = process.env.api+'avatar/'+this.$store.state.user.uinfo.avatar;
    this.imgDataUrl = imgDataUrl
    console.log('dddd')
  },
  computed:{
    url:function(){
      return process.env.api+'user/avatar/upload'
    },
    headers:function(){
        let headers = {}
        headers.token = this.$store.getters.token
        return headers;
    }
  },
  components:{
    myUpload
  },
  methods:{
    toggleShow() {
            this.show = !this.show;
        },
        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
  }
}
</script>

<style>
.avatar_upload {
  margin-left:20px;
}

.avatar_upload .avatar_preview_item{
  position:relative;
  height:200px;
  width:200px;
  margin-right:20px;
  float:left;
}

.avatar_upload .avatar_preview_item img {
  padding:3px;
  height:200px;
  width:200px;
  border:1px solid rgba(0, 0, 0, 0.15);
}
</style>
