<template>
    <Tabs type="card" @on-click="tabclick">
      <template v-for="name in data">
        <Tab-pane :label="name.name"></Tab-pane>
      </template>
    </Tabs>
</template>
<script>
export default {
  props:{
    data:{
      type:Array
    }
  },
  methods:{
    tabclick(index){
      this.$router.push(this.data[index].path)
    }
  }
}
</script>
