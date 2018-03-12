<template>
  <div class="login-background" v-show="isShow">
    <div class="login-panel">
    <h1> Moon Online Judge Admin </h1>
    <br>
    <div style="max-width:300px;">
    <Input v-model="login.username" >
        <span slot="prepend">用户名</span>
    </Input>
    <br>
    <Input v-model="login.secret" type="password">
        <span slot="prepend">密码</span>
    </Input>
    </div>
    <br>
    <Button type="info" @click="submit">登录</Button>
    </div>
  </div>
</template>

<script>
import api from '@/services/user/index.js'
import md5 from 'md5'
export default {
  data(){
    return {
      login:{
        username:'',
        secret:''
      }
    }
  },
  created(){
    let self = this
    if( self.$store.getters.islogined)
      self.$router.push("/")
  },
  methods:{
    submit(){
      let self = this
      let data = {isAdmin:true}
      data.username = self.login.username
      data.secret = self.login.secret
      if( data.username.length !=0 && data.secret.length !=0){
        data.secret = md5(data.secret)
        api.login(data).then((res)=>{
          if(res.status != 0 ){
            alert(res.message)
            return
          }
          localStorage.setItem('token',res.token)
          return self.$store.dispatch('updateUserInfo')
            .then( ()=>{
              if( self.$store.getters.islogined)
                self.$router.push("/")
            })

        })
      }
      else{
        alert("密码或用户名不能为空!")
      }
    }
  },
  computed:{
    isShow(){
      return !this.$store.getters.islogined
    }
  }
}
</script>

<style>
.login-background {
  display:flex;
  height:100%;
  width:100%;
  background:linear-gradient(to bottom, blue, steelblue);
  z-index:9999;
  position:absolute;
  justify-content: center;
  align-items: center;
}
.login-panel{
  margin:0;
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
}

.login-panel > h1 {
  color:#eee;
  font-size:5em;
}
</style>
