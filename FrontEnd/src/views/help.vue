<template>
  <div class="help">
    <div class="markdown-body" v-html="rawhtml">
    </div>
  </div>
</template>

<script>
import {help} from '../services/help.js'
export default {
  name: 'help',
  data () {
    return {
      content:''
    }
  },
  mounted(){
    let self = this
    help().then(function(data){
      self.content = data.help
    })
  },
  computed:{
    rawhtml(){
      return this.markdown(this.content)
    }
  },
}
</script>

<style>
.help {
  background:#fff;
  padding:20px;
}
</style>
