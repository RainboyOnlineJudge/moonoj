<template>
  <div>
    <problem modal="fix">
    </problem>
  </div>
</template>

<script>

import problem from '@/components/problem.vue'
export default {
  data(){
    return {
    }
  },
  components:{
    problem
  },
  methods:{
    submit(){
      console.log(this.problem)
    }
  }
}
</script>

<style>
</style>
