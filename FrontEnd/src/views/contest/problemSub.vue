<template>
  <div>
    <div>
      列表
    </div>
    <span> <Icon type="refresh"></Icon> 自动更新: </span>
    <Radio-group v-model="times">
      <Radio :label="0">不自动更新</Radio>
      <Radio :label="5">5s</Radio>
      <Radio :label="10">10s</Radio>
      <Radio :label="30">30s</Radio>
    </Radio-group>
  </div>
</template>

<script>
export default {
  data(){
    return {
      times:0,
      recordTime:0,
    }
  },
  mounted(){
    this.autoupdate()
  },
  methods:{
    autoupdate(){
      setInterval(this.update,100)
    },
    update(){
      if(this.times == 0 ) return;
      this.recordTime+=100;
      if(this.recordTime >= this.times*1000){
        console.log("update")
        this.recordTime = 0;
      }
    }

  }
}
</script>
