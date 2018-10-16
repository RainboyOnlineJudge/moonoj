<template>
  <div class="hello">
    <button v-on:click="login">getUserInfo</button>
    <button v-on:click="login2">islogined</button>
  </div>
</template>

<script>
import api from "../services/user/index.js"
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    login:function(){
      api.login({"username":"rainboylvx","secret":"123456"})
        .then(function(data){
          console.log(data)
        })
    },
    login2:function(){
      this.$router.push({name:"Login"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
