<template>
  <div class="user-input-content">
    <Input v-model="username" icon="ios-lightbulb-outline" placeholder="用户名:字母,数字和下划线组成,长度4-10">
      <span slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;用户名:</span>
    </Input>

    <Input v-model="realname" icon="ios-lightbulb-outline" placeholder="真实姓名:长度2-5">
      <span slot="prepend">真实姓名:</span>
    </Input>

    <Input v-model="secret" type="password" icon="ios-locked-outline" placeholder="密码:字母和数字组成,长度8-16">
      <span slot="prepend">你的密码:</span>
    </Input>

    <Input v-model="re_secret" type="password" icon="ios-locked-outline" placeholder="密码:字母和数字组成,长度8-16">
      <span slot="prepend">重复密码:</span>
    </Input>

    <Input v-model="email" icon="email" placeholder="邮箱,这个和头像有关">
      <span slot="prepend">重复密码:</span>
    </Input>

    <Input v-model="sex" icon="ios-person-outline" readonly placeholder="性别">
      <Select v-model="sex" slot="prepend" style="width:65px">
        <Option value="男">男</Option>
        <Option value="女">女</Option>
      </Select>
    </Input>

    <Input v-model="inviteCode"  icon="ios-barcode-outline" placeholder="邀请码">
      <span slot="prepend">&nbsp;&nbsp;&nbsp;&nbsp;邀请码:</span>
    </Input>

    <Button type="primary" icon="ios-compose-outline" @click="register">注册</Button>
    <Modal
        v-model="modal"
        title="注册成功"
        :loading="loading"
        @on-ok="asyncOK">
        <p>点击确定后，对话框将在 2秒 后跳转到登录页。</p>
    </Modal>
  </div>
</template>

<script>
import {md5} from '../../utils/index.js'
import api from '../../services/user/index.js'
export default {
  name: 'login',
  data () {
    return {
      username:'',
      secret:'',
      realname:'',
      re_secret:'',
      email:'',
      sex:'男',
      inviteCode:'',
      modal:false,
      loading:true,
    }
  },
  methods:{
    asyncOK(){
      setTimeout(() => {
        this.modal = false;
        this.$router.push({name:'Login'});
      }, 2000);
    },
    register(){
      let self =this
            self.modal = true;
      //检查是否有空的
      if( self.username == '' || self.secret == '' || self.re_secret == '' || self.inviteCode ==''){
        self.$Notice.warning({
          title: '请填写完整!',
          desc: '' });
        return ;
      }

      if( self.secret != self.re_secret){
        self.$Notice.info({
          title: '两次密码填写不一样!',
          desc: '' });
        return ;
      }

      let username_reg = /[a-zA-Z0-9_]{4,10}/;
      if(!username_reg.test(self.username)){

        self.$Notice.warning({
          title: '用户名格式不对!',
          desc: '格式:字母,数字和下划线组成,长度4-10' });
        return ;
      }

      if((self.realname.length >5)){

        self.$Notice.warning({
          title: '真实姓名格式不对!',
          desc: '格式:长度2-5' });
        return ;
      }

      let  secret_reg= /[a-zA-Z0-9]{8,16}/;
      if(!secret_reg.test(self.secret)){

        self.$Notice.warning({
          title: '密码格式不正确!',
          desc: '格式:字母和数字组成,长度8-16' });
        return ;
      }

      let data = {
        username:self.username,
        realname:self.realname,
        secret:md5(self.secret),
        invite_code:self.inviteCode,
        email:self.email
      }

      api.reg(data)
        .then((_res)=>{
          if(_res.status === -1)
            self.$Notice.error({
              title: _res.message,
            })
          else{
            self.modal = true;
          }
        })
    }
  }
}
</script>

