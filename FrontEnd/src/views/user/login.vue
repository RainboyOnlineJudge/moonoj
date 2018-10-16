<template>
  <div class="user-input-content">
      <Input v-model="username" icon="person" placeholder="请输入..." @on-enter="postlogin">
    <span slot="prepend">用户名</span>
      </Input>

      <Input v-model="secret" icon="ios-keypad" placeholder="请输入..." type="password" @on-enter="postlogin">
    <span slot="prepend">&nbsp;&nbsp;&nbsp;密码</span>
      </Input>

      <Button type="primary" size="large" icon="key" @click="postlogin">登录</Button>

  </div>
</template>

<script>
import {md5} from '../../utils/index.js'
import api from '../../services/user/index.js'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:'',
      secret:''
    }
  },
  methods:{
    postlogin(){
      let data = {
        'username':this.username,
        'secret':md5(this.secret)
      }
    
      if( this.username == '' || this.secret == ''){
        this.$Notice.warning({
          title: '用户名或者密码为空!',
          desc: ''
        });
        return;
      }
  
      let self = this;
      api.login(data)
        .then((_res)=>{
          console.log(_res)
          if( _res.status != 0)
            self.$Notice.error({
              title: '登录失败!',
              desc: _res.message
            })
          else{
            window.localStorage.setItem('token',_res.token);
            console.log('登录成功,马上跳转到主页')
            self.$router.push({name:'Index'})
          }
        })
    }
  }
}
</script>

